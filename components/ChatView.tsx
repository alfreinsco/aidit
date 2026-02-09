import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { callAgent } from "../services/agentClient";
import { BASE_PROMPT, LAB_BASE_PROMPT, LITE_BASE_PROMPT } from "../prompts";

const ChatView: React.FC = () => {
  const { getChat, addMessage, buildPromptForAgent } = useChat();
  const chat = getChat();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || isLoading) return;

    addMessage("user", prompt);
    setInput("");
    setIsLoading(true);

    let base: string;
    if (chat.mode === "LAB") {
      base = LAB_BASE_PROMPT;
    } else if (chat.mode === "LITE") {
      base = LITE_BASE_PROMPT;
    } else {
      base = BASE_PROMPT;
    }
    const finalPrompt = buildPromptForAgent(base);

    try {
      const result = await callAgent(finalPrompt);
      addMessage("assistant", result);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      addMessage("assistant", `ERROR: ${errMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getModeColor = () => {
    if (chat.mode === "LAB") return "text-red-400 bg-red-950/30";
    if (chat.mode === "LITE") return "text-blue-400 bg-blue-950/30";
    return "text-green-400 bg-green-950/30";
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {(chat.mode === "LAB" || chat.mode === "LITE") && (
        <p className={`px-4 py-2 text-sm shrink-0 ${getModeColor()}`}>
          {chat.mode === "LAB" 
            ? "⚠ LAB MODE — gunakan hanya di environment terisolasi"
            : "💡 LITE MODE — mode ringan untuk pertanyaan umum dan diskusi sederhana"}
        </p>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {chat.messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 border-l-4 ${
                m.role === "user"
                  ? "border-sky-400 bg-sky-500/10"
                  : "border-green-500 bg-green-500/10"
              }`}
            >
              <strong className="text-xs uppercase opacity-80">{m.role}</strong>
              <pre className="whitespace-pre-wrap font-sans mt-1 text-sm">
                {m.content}
              </pre>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-4 py-3 bg-base-200 rounded-lg">
              <span className="loading loading-dots loading-sm" />
              <span className="text-sm opacity-70">Analisis...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-base-content/10 bg-base-100/50 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <textarea
            placeholder="Prompt analisis keamanan... (⌘+Enter / Ctrl+Enter untuk kirim)"
            className="textarea textarea-bordered flex-1 min-h-[100px] resize-none focus:textarea-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-outline self-end border-base-content text-base-content hover:bg-base-content hover:text-base-100 disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
