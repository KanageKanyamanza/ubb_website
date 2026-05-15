// src/components/chatbot/ChatWidget.jsx
import React, { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { useChatbot } from "../../hooks/useChatbot";
import ChatWindow from "./ChatWindow";
import { CHATBOT_CONFIG } from "../../data/chatbotConfig";

export default function ChatWidget() {
  const { 
    messages, isLoading, isOpen, hasNewMsg, 
    sendMessage, toggleOpen, clearChat 
  } = useChatbot();

  const [showTease, setShowTease] = useState(false);

  // Auto-open or show tease bubble
  useEffect(() => {
    const teaseTimer = setTimeout(() => {
      if (!isOpen) {
        setShowTease(true);
      }
    }, CHATBOT_CONFIG.teaseDelay);

    return () => clearTimeout(teaseTimer);
  }, [isOpen]);

  // Hide tease bubble after some time
  useEffect(() => {
    if (showTease) {
      const hideTimer = setTimeout(() => {
        setShowTease(false);
      }, 8000);
      return () => clearTimeout(hideTimer);
    }
  }, [showTease]);

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChat = () => {
      if (!isOpen) {
        toggleOpen();
      }
    };
    window.addEventListener("ubb:open-chat", handleOpenChat);
    return () => window.removeEventListener("ubb:open-chat", handleOpenChat);
  }, [isOpen, toggleOpen]);

  return (
    <div className="fixed bottom-7 right-7 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Tease Bubble */}
      {showTease && !isOpen && (
        <div 
          onClick={() => {
            toggleOpen();
            setShowTease(false);
          }}
          className="chat-tease pointer-events-auto bg-bg-card border border-gold/30 p-4 rounded-xl rounded-br-none shadow-2xl max-w-[220px] cursor-pointer group hover:border-gold transition-all duration-300 relative"
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTease(false);
            }}
            className="absolute top-1 right-1 p-1 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-[13px] text-text-primary leading-tight">
            👋 Bonjour ! Des questions sur <span className="text-gold font-bold">UBB</span> ? Je suis là pour vous aider !
          </p>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-0 w-4 h-4 bg-bg-card border-r border-b border-gold/30 rotate-45 transform origin-top-right"></div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSend={sendMessage}
            onClose={toggleOpen}
            onClear={clearChat}
          />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gold-gradient shadow-[0_4px_25px_rgba(201,151,58,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-bg-primary transition-transform duration-300 rotate-0" />
        ) : (
          <MessageSquare className="w-6 h-6 text-bg-primary transition-transform duration-300" />
        )}

        {/* Notification Dot */}
        {hasNewMsg && !isOpen && (
          <span className="notif-dot absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-bg-primary rounded-full shadow-lg" />
        )}
      </button>

    </div>
  );
}
