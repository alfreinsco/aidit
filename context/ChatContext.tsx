import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { Chat, ChatMessage, ChatMode } from '../types';

const CHAT_STORAGE_KEY = 'aidit-chat-state';

function isChat(c: unknown): c is Chat {
  return (
    typeof c === 'object' &&
    c !== null &&
    'id' in c &&
    'title' in c &&
    'mode' in c &&
    'messages' in c &&
    Array.isArray((c as Chat).messages)
  );
}

function loadFromStorage(): { chats: Record<string, Chat>; activeChatId: string | null } {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(CHAT_STORAGE_KEY) : null;
    if (!raw) return { chats: {}, activeChatId: null };
    const parsed = JSON.parse(raw) as { chats?: Record<string, unknown>; activeChatId?: string | null };
    const chats: Record<string, Chat> = {};
    if (parsed.chats && typeof parsed.chats === 'object') {
      for (const [id, c] of Object.entries(parsed.chats)) {
        if (isChat(c)) chats[id] = c;
      }
    }
    const activeChatId =
      typeof parsed.activeChatId === 'string' && chats[parsed.activeChatId] ? parsed.activeChatId : null;
    return { chats, activeChatId };
  } catch {
    return { chats: {}, activeChatId: null };
  }
}

function getInitialState(): { chats: Record<string, Chat>; activeChatId: string | null } {
  const loaded = loadFromStorage();
  if (Object.keys(loaded.chats).length === 0) {
    const id = crypto.randomUUID();
    return {
      chats: { [id]: { id, title: 'New Chat', mode: 'PRO', messages: [] } },
      activeChatId: id,
    };
  }
  const activeChatId = loaded.activeChatId ?? Object.keys(loaded.chats)[0] ?? null;
  return { chats: loaded.chats, activeChatId };
}

function buildPrompt(basePrompt: string, messages: ChatMessage[], limit = 4): string {
  const history = messages.slice(-limit);
  const parts = [basePrompt];
  for (const m of history) {
    parts.push(`${m.role.toUpperCase()}:\n${m.content}`);
  }
  return parts.join('\n\n');
}

interface ChatContextValue {
  chats: Record<string, Chat>;
  activeChatId: string | null;
  getChat: () => Chat;
  newChat: (title?: string) => void;
  renameChat: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
  toggleMode: () => void;
  setMode: (mode: ChatMode) => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  setActiveChatId: (id: string) => void;
  buildPromptForAgent: (basePrompt: string, limit?: number) => string;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const initial = useMemo(() => getInitialState(), []);
  const [chats, setChats] = useState<Record<string, Chat>>(initial.chats);
  const [activeChatId, setActiveChatIdState] = useState<string | null>(initial.activeChatId);

  useEffect(() => {
    try {
      const payload = JSON.stringify({ chats, activeChatId });
      localStorage.setItem(CHAT_STORAGE_KEY, payload);
    } catch {
      // ignore quota / private mode
    }
  }, [chats, activeChatId]);

  const getChat = useCallback((): Chat => {
    if (!activeChatId || !chats[activeChatId]) {
      const id = crypto.randomUUID();
      const newChat: Chat = {
        id,
        title: 'New Chat',
        mode: 'PRO',
        messages: [],
      };
      setChats((prev) => ({ ...prev, [id]: newChat }));
      setActiveChatIdState(id);
      return newChat;
    }
    return chats[activeChatId];
  }, [activeChatId, chats]);

  const newChat = useCallback((title = 'New Chat') => {
    const id = crypto.randomUUID();
    setChats((prev) => ({
      ...prev,
      [id]: {
        id,
        title,
        mode: 'PRO',
        messages: [],
      },
    }));
    setActiveChatIdState(id);
  }, []);

  const renameChat = useCallback((chatId: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setChats((prev) => {
      if (!prev[chatId]) return prev;
      return {
        ...prev,
        [chatId]: { ...prev[chatId], title: trimmed },
      };
    });
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    const remainingIds = Object.keys(chats).filter((id) => id !== chatId);
    if (remainingIds.length === 0) {
      const id = crypto.randomUUID();
      setChats({ [id]: { id, title: 'New Chat', mode: 'PRO', messages: [] } });
      setActiveChatIdState(id);
      return;
    }
    const newActiveId =
      activeChatId === chatId ? remainingIds[0]! : activeChatId;
    setChats((prev) => {
      const next = { ...prev };
      delete next[chatId];
      return next;
    });
    setActiveChatIdState(newActiveId);
  }, [chats, activeChatId]);

  const toggleMode = useCallback(() => {
    setChats((prev) => {
      if (!activeChatId || !prev[activeChatId]) return prev;
      const chat = prev[activeChatId];
      let nextMode: ChatMode;
      if (chat.mode === 'PRO') {
        nextMode = 'LAB';
      } else if (chat.mode === 'LAB') {
        nextMode = 'LITE';
      } else {
        nextMode = 'PRO';
      }
      return {
        ...prev,
        [activeChatId]: { ...chat, mode: nextMode },
      };
    });
  }, [activeChatId]);

  const setMode = useCallback((mode: ChatMode) => {
    setChats((prev) => {
      if (!activeChatId || !prev[activeChatId]) return prev;
      const chat = prev[activeChatId];
      if (chat.mode === mode) return prev;
      return {
        ...prev,
        [activeChatId]: { ...chat, mode },
      };
    });
  }, [activeChatId]);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    setChats((prev) => {
      if (!activeChatId || !prev[activeChatId]) return prev;
      const chat = prev[activeChatId];
      return {
        ...prev,
        [activeChatId]: {
          ...chat,
          messages: [...chat.messages, { role, content }],
        },
      };
    });
  }, [activeChatId]);

  const setActiveChatId = useCallback((id: string) => {
    if (chats[id]) setActiveChatIdState(id);
  }, [chats]);

  const buildPromptForAgent = useCallback(
    (basePrompt: string, limit = 4) => {
      const chat = getChat();
      return buildPrompt(basePrompt, chat.messages, limit);
    },
    [getChat]
  );

  const value: ChatContextValue = {
    chats,
    activeChatId,
    getChat,
    newChat,
    renameChat,
    deleteChat,
    toggleMode,
    setMode,
    addMessage,
    setActiveChatId,
    buildPromptForAgent,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
