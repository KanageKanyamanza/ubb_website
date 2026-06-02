// server/db.js
const { Pool } = require('pg');
require('dotenv').config();

const rawUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!rawUrl) {
  console.error('❌ POSTGRES_URL et DATABASE_URL sont tous les deux absents de process.env');
  console.error('   Variables disponibles:', Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE') || k.includes('PG')));
}

// Nettoyage de l'URL : supprime channel_binding non supporté par certaines versions de pg
let connectionString = rawUrl;
if (connectionString) {
  try {
    const url = new URL(connectionString);
    url.searchParams.delete('channel_binding');
    connectionString = url.toString();
  } catch (e) {
    // URL invalide — on la garde telle quelle
  }
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  if (!connectionString) return;
  try {
    const client = await pool.connect();
    console.log('✅ Connecté à PostgreSQL (Neon)');
    client.release();
  } catch (error) {
    console.error('❌ Erreur connexion PostgreSQL:', error.message);
  }
})();

module.exports = pool;
