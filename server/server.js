// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const PAYPAL_MODE = process.env.PAYPAL_MODE === 'sandbox' ? 'sandbox' : 'live';
const PAYPAL_API_BASE = PAYPAL_MODE === 'sandbox'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.warn('⚠️ PayPal server configuration est incomplète. Vérifiez PAYPAL_CLIENT_ID et PAYPAL_CLIENT_SECRET.');
}

async function getPayPalAccessToken() {
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal token error: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createPayPalOrder({ email, amount = '20.00', currency = 'GBP', description = 'Pack Ressources Digitales UBB — E-books' }) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        description,
        amount: { currency_code: currency, value: amount },
        custom_id: email || undefined,
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`PayPal order creation failed: ${response.status} ${JSON.stringify(data)}`);
  }
  return data;
}

async function capturePayPalOrder(orderID) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`PayPal capture failed: ${response.status} ${JSON.stringify(data)}`);
  }
  return data;
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Migration : ajoute la colonne linkedin si elle n'existe pas encore
pool.query("ALTER TABLE team_members ADD COLUMN IF NOT EXISTS linkedin TEXT")
  .catch(() => {});

// ────────────────────────────────────────────────────────────────
//  HEALTH CHECK — diagnostic connexion DB
// ────────────────────────────────────────────────────────────────

app.get('/api/health', async (req, res) => {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) {
    return res.status(500).json({
      status: 'error',
      message: 'POSTGRES_URL non définie dans les variables d\'environnement Vercel',
      env: process.env.NODE_ENV || 'unknown'
    });
  }
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connectée', env: process.env.NODE_ENV || 'unknown' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ────────────────────────────────────────────────────────────────
//  API ROUTES : MEMBRES DE L'ÉQUIPE
// ────────────────────────────────────────────────────────────────

app.get('/api/team', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members ORDER BY created_at ASC');
    const mapped = rows.map(member => ({
      ...member,
      visible: Boolean(member.visible),
      chips: member.chips ? member.chips.split(',').map(c => c.trim()) : []
    }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la récupération de l'équipe", details: error.message });
  }
});

app.post('/api/team', async (req, res) => {
  const { name, title, img, bio, chips, category, visible, linkedin } = req.body;
  if (!name || !title || !bio) {
    return res.status(400).json({ error: "Les champs nom, titre et biographie sont obligatoires" });
  }

  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);
  const chipsString = Array.isArray(chips) ? chips.join(', ') : (chips || '');
  const isVisible = visible !== false;

  try {
    await pool.query(
      'INSERT INTO team_members (id, name, title, img, bio, chips, category, visible, linkedin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [id, name, title, img, bio, chipsString, category || 'tech', isVisible, linkedin || null]
    );
    res.status(201).json({ message: "Membre ajouté avec succès", id });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la création du membre", details: error.message });
  }
});

app.put('/api/team/:id', async (req, res) => {
  const { id } = req.params;
  const { name, title, img, bio, chips, category, visible, linkedin } = req.body;

  if (!name || !title || !bio) {
    return res.status(400).json({ error: "Les champs nom, titre et biographie sont obligatoires" });
  }

  const chipsString = Array.isArray(chips) ? chips.join(', ') : (chips || '');
  const isVisible = visible !== false;

  try {
    const { rowCount } = await pool.query(
      'UPDATE team_members SET name = $1, title = $2, img = $3, bio = $4, chips = $5, category = $6, visible = $7, linkedin = $8 WHERE id = $9',
      [name, title, img, bio, chipsString, category, isVisible, linkedin || null, id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }
    res.json({ message: "Membre mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la modification du membre", details: error.message });
  }
});

app.patch('/api/team/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT visible FROM team_members WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    const newVisibility = !rows[0].visible;
    await pool.query('UPDATE team_members SET visible = $1 WHERE id = $2', [newVisibility, id]);

    res.json({ message: "Visibilité mise à jour avec succès", visible: newVisibility });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors du changement de visibilité", details: error.message });
  }
});

app.delete('/api/team/:id', async (req, res) => {
  const { id } = req.params;
  if (id === 'ambrose') {
    return res.status(400).json({ error: "Impossible de supprimer le profil du Directeur Exécutif" });
  }

  try {
    const { rowCount } = await pool.query('DELETE FROM team_members WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }
    res.json({ message: "Membre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la suppression", details: error.message });
  }
});

// ────────────────────────────────────────────────────────────────
//  API ROUTES : GALERIE D'ACTUALITÉS
// ────────────────────────────────────────────────────────────────

app.get('/api/news', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM news_gallery ORDER BY created_at DESC');
    res.json(rows.map(item => ({ ...item, visible: Boolean(item.visible) })));
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

app.post('/api/news', async (req, res) => {
  const { url, caption, date, category, visible } = req.body;
  if (!url) return res.status(400).json({ error: "L'URL de l'image est obligatoire" });

  const id = 'news-' + Date.now();
  try {
    await pool.query(
      'INSERT INTO news_gallery (id, url, caption, date, category, visible) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, url, caption || '', date || '', category || 'Webinaire', visible !== false]
    );
    res.status(201).json({ message: "Actualité ajoutée avec succès", id });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout", details: error.message });
  }
});

app.put('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const { url, caption, date, category, visible } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE news_gallery SET url = $1, caption = $2, date = $3, category = $4, visible = $5 WHERE id = $6',
      [url, caption || '', date || '', category || 'Webinaire', visible !== false, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: "Actualité introuvable" });
    res.json({ message: "Actualité mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour", details: error.message });
  }
});

app.patch('/api/news/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT visible FROM news_gallery WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Actualité introuvable" });
    const newVisibility = !rows[0].visible;
    await pool.query('UPDATE news_gallery SET visible = $1 WHERE id = $2', [newVisibility, id]);
    res.json({ message: "Visibilité mise à jour", visible: newVisibility });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du changement de visibilité", details: error.message });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM news_gallery WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: "Actualité introuvable" });
    res.json({ message: "Actualité supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression", details: error.message });
  }
});

// ────────────────────────────────────────────────────────────────
//  API ROUTES : PROJETS STRATÉGIQUES
// ────────────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM strategic_projects ORDER BY created_at ASC');
    res.json(rows.map(item => ({ ...item, visible: Boolean(item.visible) })));
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  const { title, tagline, description, link, linkLabel, visible } = req.body;
  if (!title || !description || !link) {
    return res.status(400).json({ error: "Titre, description et lien sont obligatoires" });
  }
  const id = 'proj-' + Date.now();
  try {
    await pool.query(
      'INSERT INTO strategic_projects (id, title, tagline, description, link, "linkLabel", visible) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [id, title, tagline || '', description, link, linkLabel || 'En savoir plus →', visible !== false]
    );
    res.status(201).json({ message: "Projet ajouté avec succès", id });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout", details: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { title, tagline, description, link, linkLabel, visible } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE strategic_projects SET title = $1, tagline = $2, description = $3, link = $4, "linkLabel" = $5, visible = $6 WHERE id = $7',
      [title, tagline || '', description, link, linkLabel || 'En savoir plus →', visible !== false, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: "Projet introuvable" });
    res.json({ message: "Projet mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour", details: error.message });
  }
});

app.patch('/api/projects/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT visible FROM strategic_projects WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Projet introuvable" });
    const newVisibility = !rows[0].visible;
    await pool.query('UPDATE strategic_projects SET visible = $1 WHERE id = $2', [newVisibility, id]);
    res.json({ message: "Visibilité mise à jour", visible: newVisibility });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du changement de visibilité", details: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM strategic_projects WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: "Projet introuvable" });
    res.json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression", details: error.message });
  }
});

// ────────────────────────────────────────────────────────────────
//  API ROUTES : ADMIN AUTH
// ────────────────────────────────────────────────────────────────

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Veuillez saisir votre nom d'utilisateur et mot de passe" });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    if (username === 'ubb_admin' && password === 'UBB@2026!') {
      return res.json({ success: true, token: "ubb_session_token_example_2026" });
    }

    res.status(401).json({ error: "Mot de passe incorrect" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'authentification", details: error.message });
  }
});

// ────────────────────────────────────────────────────────────────
//  API ROUTES : PAYPAL
// ────────────────────────────────────────────────────────────────

app.post('/api/paypal/create-order', async (req, res) => {
  const { email, amount, currency, description } = req.body;
  if (!email) {
    return res.status(400).json({ error: "L'email client est requis pour créer la commande PayPal." });
  }

  try {
    const data = await createPayPalOrder({ email, amount, currency, description });
    res.json({ orderID: data.id });
  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({ error: 'Impossible de créer la commande PayPal.', details: error.message });
  }
});

app.post('/api/paypal/capture-order', async (req, res) => {
  const { orderID } = req.body;
  if (!orderID) {
    return res.status(400).json({ error: "L'ID de commande PayPal est requis pour la capture." });
  }

  try {
    const data = await capturePayPalOrder(orderID);
    res.json(data);
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: 'Impossible de capturer la commande PayPal.', details: error.message });
  }
});

// ────────────────────────────────────────────────────────────────
//  DÉMARRAGE LOCAL UNIQUEMENT (pas exécuté sur Vercel)
// ────────────────────────────────────────────────────────────────

if (require.main === module) {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  const server = app.listen(PORT, () => {
    console.log(`🚀 Serveur Monolithique UBB en cours d'exécution sur le port ${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Le port ${PORT} est déjà utilisé.`);
      process.exit(1);
    }
    console.error('❌ Erreur serveur:', error);
    process.exit(1);
  });
}

module.exports = app;
