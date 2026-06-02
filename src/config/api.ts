// src/config/api.ts
// Dynamic API URL selector (Local vs Production Hostinger)
// En production (Vercel), l'API est sur le même domaine via les rewrites vercel.json → URL relative ''
// En développement local, l'API tourne sur localhost:5000
export const API_BASE_URL =
  import.meta.env.VITE_API_URL !== undefined
    ? import.meta.env.VITE_API_URL          // override explicite si défini
    : import.meta.env.PROD
      ? ''                                   // production Vercel : URL relative
      : 'http://localhost:5000';             // dev local
