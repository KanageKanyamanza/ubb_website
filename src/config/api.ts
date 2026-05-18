// src/config/api.ts
// Dynamic API URL selector (Local vs Production Hostinger)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
