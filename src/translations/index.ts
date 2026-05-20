// src/translations/index.ts
import { fr } from "./fr";
import { en } from "./en";

export const translations = {
  fr,
  en,
};

export type TranslationKeys = typeof fr;
export type Language = "fr" | "en";
