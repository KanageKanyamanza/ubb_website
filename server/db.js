// server/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ubb_database',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection instantly
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connecté avec succès à la base de données MySQL : ' + (process.env.DB_NAME || 'ubb_database'));
    connection.release();
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL. Vérifiez que MySQL est lancé sur votre machine et que le mot de passe est correct.', error.message);
  }
})();

module.exports = pool;
