// server/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connecté avec succès à PostgreSQL');
    client.release();
  } catch (error) {
    console.error('❌ Erreur de connexion à PostgreSQL:', error.message);
  }
})();

module.exports = pool;
