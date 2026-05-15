// src/components/chatbot/QuickReplies.jsx
import React from "react";
import { QUICK_REPLIES } from "../../data/chatbotConfig";

export default function QuickReplies({ onSelect, disabled }) {
  return (
    <div className="px-4 py-6">
      <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
        Questions fréquentes :
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK_REPLIES.map((reply, i) => (
          <button
            key={i}
            onClick={() => onSelect(reply)}
            disabled={disabled}
            className="text-[11px] px-4 py-2 bg-transparent border border-gold/30 text-gold rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-200 disabled:opacity-50"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
