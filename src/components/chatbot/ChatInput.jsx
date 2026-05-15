// src/components/chatbot/ChatInput.jsx
import React, { useState, useRef, useEffect } from "react";
import { Send, CornerDownLeft } from "lucide-react";
import { CHATBOT_CONFIG } from "../../data/chatbotConfig";

export default function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [text]);

  return (
    <div className="relative border-t border-border-subtle bg-[#131313] p-4">
      {/* Bot Typing Indicator Overlay */}
      {isLoading && (
        <div className="absolute -top-12 left-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-[10px] text-gold font-bold">
            {CHATBOT_CONFIG.avatarInitials}
          </div>
          <div className="bg-[#1A1A1A] border border-gold/20 px-4 py-2 rounded-xl flex gap-1">
            <span className="w-1.5 h-1.5 bg-gold rounded-full typing-dot"></span>
            <span className="w-1.5 h-1.5 bg-gold rounded-full typing-dot"></span>
            <span className="w-1.5 h-1.5 bg-gold rounded-full typing-dot"></span>
          </div>
        </div>
      )}

      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={CHATBOT_CONFIG.placeholder}
          rows={1}
          className="flex-1 bg-transparent text-text-primary text-[13px] outline-none resize-none py-2.5 max-h-[120px] scrollbar-hide"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            text.trim() && !isLoading 
              ? "bg-gold text-bg-primary shadow-lg shadow-gold/20" 
              : "bg-bg-primary text-text-muted opacity-40 cursor-not-allowed"
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-2 px-1">
        <span className="text-[9px] text-text-muted uppercase tracking-widest font-medium">UBB AI Assistant</span>
        <div className="flex items-center gap-1.5 text-[9px] text-text-muted">
          <span>Entrée pour envoyer</span>
          <CornerDownLeft className="w-2.5 h-2.5" />
        </div>
      </div>
    </div>
  );
}
