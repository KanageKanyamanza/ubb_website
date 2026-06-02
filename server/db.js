// server/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
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
