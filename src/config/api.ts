// src/config/api.ts
// Dynamic API URL selector (Local vs Production Hostinger)
// ?? au lieu de || : chaîne vide '' reste vide (URL relative en prod) au lieu de tomber sur localhost
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
