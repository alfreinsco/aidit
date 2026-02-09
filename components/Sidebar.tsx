import React, { useState, useRef, useEffect } from "react";
import { type Chat } from "../types";
import { useTheme, type ThemeValue } from "../context/ThemeContext";
import { useChat } from "../context/ChatContext";
import AiditBranding from "./AiditBranding";

interface SidebarProps {
  setView?: () => void;
}

const THEME_OPTIONS: { value: ThemeValue; label: string; icon: string }[] = [
  { value: "system", label: "System", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { value: "light", label: "Terang", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
  { value: "dark", label: "Gelap", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" },
];

const MODE_OPTIONS = [
  { value: 'PRO' as const, label: 'PRO Mode' },
  { value: 'LAB' as const, label: 'LAB Mode' },
  { value: 'LITE' as const, label: 'LITE Mode' },
];

const Sidebar: React.FC<SidebarProps> = ({ setView }) => {
  const { theme, setTheme } = useTheme();
  const { chats, activeChatId, newChat, renameChat, deleteChat, setActiveChatId, setMode } = useChat();
  const [open, setOpen] = useState(false);
  const [openMode, setOpenMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const modeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatList = Object.entries(chats);

  const startRename = (cid: string, currentTitle: string) => {
    setEditingId(cid);
    setEditTitle(currentTitle);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const submitRename = (cid: string) => {
    if (editingId !== cid) return;
    renameChat(cid, editTitle.trim() || "New Chat");
    setEditingId(null);
    setEditTitle("");
  };

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) setOpenMode(false);
    };
    if (open || openMode) {
      document.addEventListener("click", onOutside);
      return () => document.removeEventListener("click", onOutside);
    }
  }, [open, openMode]);

  const handleSetMode = (mode: 'PRO' | 'LAB' | 'LITE') => {
    setMode(mode);
    setOpenMode(false);
  };

  const current = THEME_OPTIONS.find((o) => o.value === theme) ?? THEME_OPTIONS[0];

  return (
    <div className="flex flex-col h-full bg-base-200 border-r border-base-content/10 w-64 lg:w-72">
      <div className="p-6 border-b border-base-content/10 flex items-center">
        <AiditBranding logoClassName="h-16 w-auto max-w-[120px]" />
      </div>

      <div className="flex-1 flex flex-col min-h-0 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
          Riwayat chat
        </p>
        <button
          type="button"
          onClick={() => {
            newChat();
            setView?.();
          }}
          className="btn btn-outline btn-sm w-full mb-3 gap-2 border-base-content text-base-content hover:bg-base-content hover:text-base-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New chat
        </button>
        <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
          {chatList.length === 0 ? (
            <p className="text-sm opacity-50">Belum ada chat</p>
          ) : (
            chatList.map(([cid, c]: [string, Chat]) => (
              <div
                key={cid}
                className={`group flex items-center gap-1 w-full px-3 py-2 rounded-lg text-sm transition-colors border ${
                  cid === activeChatId
                    ? "border-base-content text-base-content bg-base-content/10"
                    : "border-transparent hover:bg-base-300"
                }`}
              >
                {editingId === cid ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => submitRename(cid)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitRename(cid);
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditTitle("");
                        inputRef.current?.blur();
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="input input-sm input-ghost flex-1 min-w-0 bg-transparent px-0"
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveChatId(cid);
                        setView?.();
                      }}
                      className="flex-1 text-left truncate min-w-0"
                      title={c.title}
                    >
                      {c.title}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startRename(cid, c.title);
                      }}
                      className="btn btn-ghost btn-xs btn-square opacity-0 group-hover:opacity-100 shrink-0"
                      title="Rename"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.897L6 18l.809-2.685a4.5 4.5 0 011.897-1.897l8.932-8.931zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(cid);
                      }}
                      className="btn btn-ghost btn-xs btn-square opacity-0 group-hover:opacity-100 shrink-0 text-error hover:text-error"
                      title="Hapus"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-base-content/10 space-y-2">
        {activeChatId && chats[activeChatId] && (
          <div className="dropdown dropdown-top dropdown-end w-full" ref={modeRef}>
            <button
              type="button"
              tabIndex={0}
              onClick={() => setOpenMode((o) => !o)}
              className="btn btn-outline btn-sm w-full justify-start gap-2 border-base-content text-base-content hover:bg-base-content hover:text-base-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="flex-1 text-left">
                Mode: {chats[activeChatId]?.mode === "LAB" ? "LAB" : chats[activeChatId]?.mode === "LITE" ? "LITE" : "PRO"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-60">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul tabIndex={0} className={`dropdown-content menu p-2 bg-base-200 rounded-box border border-base-content/10 shadow-lg z-50 w-52 ${openMode ? "" : "hidden"}`}>
              {MODE_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => handleSetMode(opt.value)}
                    className={chats[activeChatId]?.mode === opt.value ? "active" : ""}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="dropdown dropdown-top dropdown-end w-full" ref={ref}>
          <button
            type="button"
            tabIndex={0}
            onClick={() => setOpen((o) => !o)}
            className="btn btn-outline btn-sm w-full justify-start gap-2 border-base-content text-base-content hover:bg-base-content hover:text-base-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d={current.icon} />
            </svg>
            <span className="flex-1 text-left">Tema: {current.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul tabIndex={0} className={`dropdown-content menu p-2 bg-base-200 rounded-box border border-base-content/10 shadow-lg z-50 w-52 ${open ? "" : "hidden"}`}>
            {THEME_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    setTheme(opt.value);
                    setOpen(false);
                  }}
                  className={theme === opt.value ? "active" : ""}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={opt.icon} />
                  </svg>
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
