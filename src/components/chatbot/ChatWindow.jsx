// src/components/chatbot/ChatWindow.jsx
import React, { useRef, useEffect } from "react";
import { X, Trash2, ShieldCheck } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickReplies from "./QuickReplies";
import { CHATBOT_CONFIG } from "../../data/chatbotConfig";

export default function ChatWindow({ messages, isLoading, onSend, onClose, onClear }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-window fixed bottom-24 right-7 z-[9999] w-[calc(100vw-48px)] sm:w-[380px] h-[580px] max-h-[calc(100vh-120px)] bg-bg-card border border-border-subtle rounded-xl shadow-2xl flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-br from-[#1A1A1A] to-[#131313] border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-bg-primary font-bold text-xs shadow-lg">
            {CHATBOT_CONFIG.avatarInitials}
          </div>
          <div>
            <h3 className="text-[14px] font-medium text-text-primary leading-none mb-1">
              {CHATBOT_CONFIG.botName}
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">En ligne</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onClear}
            className="p-2 text-text-muted hover:text-red-400 transition-colors"
            title="Effacer la conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Zone */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gold/20">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {/* Quick Replies - Visible only at the start */}
          {messages.length === 1 && !isLoading && (
            <QuickReplies onSelect={onSend} />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* SSL Indicator */}
      <div className="px-4 py-1.5 bg-bg-primary/30 flex items-center justify-center gap-2 border-t border-border-subtle/50">
        <ShieldCheck className="w-3 h-3 text-gold/50" />
        <span className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-medium">Conversations Sécurisées</span>
      </div>

      {/* Input Zone */}
      <ChatInput onSend={onSend} isLoading={isLoading} />
    </div>
  );
}
