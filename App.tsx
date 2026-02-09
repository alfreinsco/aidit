import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ChatProvider } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import AiditBranding from "./components/AiditBranding";
import ChatView from "./components/ChatView";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen bg-base-300 overflow-hidden">
          {/* Mobile Drawer */}
          <div
            className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div
              className={`absolute inset-y-0 left-0 w-64 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <Sidebar setView={() => setIsSidebarOpen(false)} />
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden relative">
            <header className="lg:hidden p-4 bg-base-200 flex items-center justify-between border-b border-base-content/10">
              <button
                className="btn btn-ghost btn-square"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <AiditBranding logoClassName="h-12 w-auto" />
              </div>
              <div className="w-10" />
            </header>

            <div className="flex-1 overflow-hidden">
              <ChatView />
            </div>
          </main>
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
