// src/hooks/useChatbot.js
import { useState, useEffect, useCallback } from "react";
import { UBB_SYSTEM_PROMPT, CHATBOT_CONFIG } from "../data/chatbotConfig";

export const useChatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("ubb_chat");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "welcome",
        role: "assistant",
        content: CHATBOT_CONFIG.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("ubb_chat", JSON.stringify(messages));
  }, [messages]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) setHasNewMsg(false);
  }, [isOpen]);

  const clearChat = useCallback(() => {
    const welcome = [{
      id: "welcome-" + Date.now(),
      role: "assistant",
      content: CHATBOT_CONFIG.welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    setMessages(welcome);
    sessionStorage.removeItem("ubb_chat");
  }, []);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim()) return;

    const userMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey.includes("YOUR_GEMINI_API_KEY")) {
        throw new Error("Clé API non configurée");
      }

      // Using Gemini 2.0 Flash as it was the only one that responded for you
      const history = messages
        .filter(m => !m.id.toString().startsWith("welcome"))
        .map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

      const contents = [
        ...history,
        { role: "user", parts: [{ text: userText }] }
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: contents,
            system_instruction: {
              parts: [{ text: UBB_SYSTEM_PROMPT }]
            },
            generationConfig: {
              temperature: CHATBOT_CONFIG.temperature,
              maxOutputTokens: CHATBOT_CONFIG.maxTokens,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Erreur API");
      }

      const data = await response.json();
      const botReply = data.candidates[0].content.parts[0].text;

      const assistantMessage = {
        id: "bot-" + Date.now(),
        role: "assistant",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (!isOpen) setHasNewMsg(true);

    } catch (err) {
      console.error("Chatbot Error:", err.message);
      const errorMessage = {
        id: "error-" + Date.now(),
        role: "assistant",
        content: `Difficulté technique : ${err.message}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isOpen]);

  const sendQuickReply = (text) => sendMessage(text);

  return { messages, isLoading, isOpen, hasNewMsg, sendMessage, sendQuickReply, toggleOpen, clearChat };
};
