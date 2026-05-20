// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

export type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("ubb_lang");
    if (saved === "fr" || saved === "en") return saved;
    
    // Fallback to browser language if it is French or English
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "en" ? "en" : "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ubb_lang", lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Translate function supporting nested keys (e.g. "home.hero.title")
  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const keys = key.split(".");
    const dict = translations[language];
    
    let value: any = dict;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to French dictionary if not found in current language
        let fallbackValue: any = translations["fr"];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            fallbackValue = undefined;
            break;
          }
        }
        if (typeof fallbackValue === "string") {
          value = fallbackValue;
          break;
        }
        return key; // Returns the key if no translation is found
      }
    }

    if (typeof value !== "string") {
      return key;
    }

    // Handle string replacements (e.g. "Welcome, {name}")
    if (replacements) {
      let result = value;
      Object.entries(replacements).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
      return result;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
