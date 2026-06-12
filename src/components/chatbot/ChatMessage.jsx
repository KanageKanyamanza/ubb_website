// src/components/chatbot/ChatMessage.jsx
import React from "react";
import { CHATBOT_CONFIG } from "../../data/chatbotConfig";

const formatContent = (content) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noreferrer" 
          className="text-gold underline hover:text-gold-light break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function ChatMessage({ message }) {
  const isBot = message.role === "assistant";

  return (
    <div className={`flex w-full mb-6 ${isBot ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${
          isBot 
            ? "bg-gold/10 border-gold/30 text-gold mr-3" 
            : "bg-bg-primary border-white/10 text-text-secondary ml-3"
        }`}>
          {isBot ? CHATBOT_CONFIG.avatarInitials : "V"}
        </div>

        {/* Bubble */}
        <div className="flex flex-col">
          <div className={`p-3 text-[13px] leading-relaxed shadow-lg ${
            isBot 
              ? "bg-[#1A1A1A] border border-gold/20 text-white rounded-tr-xl rounded-br-xl rounded-bl-xl"
              : "bg-gold-gradient text-bg-primary font-medium rounded-tl-xl rounded-bl-xl rounded-br-xl"
          }`}>
            <div className="whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>
          </div>
          
          <span className={`text-[9px] mt-1 text-text-muted uppercase tracking-widest ${isBot ? "text-left" : "text-right"}`}>
            {message.timestamp}
          </span>
        </div>

      </div>
    </div>
  );
}
