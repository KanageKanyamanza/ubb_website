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
  console.warn('⚠️ PayPal server configuration is incomplète. Vérifiez server/.env pour PAYPAL_CLIENT_ID et PAYPAL_CLIENT_SECRET.');
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
      purchase_units: [
        {
          description,
          amount: {
            currency_code: currency,
            value: amount,
          },
          custom_id: email || undefined,
        },
      ],
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

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ────────────────────────────────────────────────────────────────
//  API ROUTES : MEMBRES DE L'ÉQUIPE (TEAM MEMBERS)
// ────────────────────────────────────────────────────────────────

// 1. GET ALL TEAM MEMBERS
app.get('/api/team', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team_members ORDER BY created_at ASC');
    // Map rows to parse chips back to an array
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

// 2. CREATE A NEW TEAM MEMBER
app.post('/api/team', async (req, res) => {
  const { name, title, img, bio, chips, category, visible } = req.body;
  if (!name || !title || !bio) {
    return res.status(400).json({ error: "Les champs nom, titre et biographie sont obligatoires" });
  }

  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);
  const chipsString = Array.isArray(chips) ? chips.join(', ') : (chips || '');
  const isVisible = visible !== false ? 1 : 0;

  try {
    await pool.query(
      'INSERT INTO team_members (id, name, title, img, bio, chips, category, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, title, img, bio, chipsString, category || 'tech', isVisible]
    );
    res.status(201).json({ message: "Membre ajouté avec succès", id });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la création du membre", details: error.message });
  }
});

// 3. UPDATE AN EXISTING TEAM MEMBER
app.put('/api/team/:id', async (req, res) => {
  const { id } = req.params;
  const { name, title, img, bio, chips, category, visible } = req.body;

  if (!name || !title || !bio) {
    return res.status(400).json({ error: "Les champs nom, titre et biographie sont obligatoires" });
  }

  const chipsString = Array.isArray(chips) ? chips.join(', ') : (chips || '');
  const isVisible = visible !== false ? 1 : 0;

  try {
    const [result] = await pool.query(
      'UPDATE team_members SET name = ?, title = ?, img = ?, bio = ?, chips = ?, category = ?, visible = ? WHERE id = ?',
      [name, title, img, bio, chipsString, category, isVisible, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    res.json({ message: "Membre mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la modification du membre", details: error.message });
  }
});

// 4. TOGGLE MEMBER VISIBILITY
app.patch('/api/team/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT visible FROM team_members WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }

    const newVisibility = rows[0].visible ? 0 : 1;
    await pool.query('UPDATE team_members SET visible = ? WHERE id = ?', [newVisibility, id]);

    res.json({ message: "Visibilité mise à jour avec succès", visible: Boolean(newVisibility) });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors du changement de visibilité", details: error.message });
  }
});

// 5. DELETE A TEAM MEMBER
app.delete('/api/team/:id', async (req, res) => {
  const { id } = req.params;
  if (id === 'ambrose') {
    return res.status(400).json({ error: "Impossible de supprimer le profil du Directeur Exécutif" });
  }

  try {
    const [result] = await pool.query('DELETE FROM team_members WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Membre introuvable" });
    }
    res.json({ message: "Membre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la suppression", details: error.message });
  }
});


// ────────────────────────────────────────────────────────────────
// 📸 API ROUTES : GALERIE D'ACTUALITÉS (NEWS GALLERY)
// ────────────────────────────────────────────────────────────────

app.get('/api/news', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news_gallery ORDER BY created_at DESC');
    res.json(rows.map(item => ({ ...item, visible: Boolean(item.visible) })));
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});


// ────────────────────────────────────────────────────────────────
// 🚀 API ROUTES : PROJETS STRATÉGIQUES (STRATEGIC PROJECTS)
// ────────────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM strategic_projects ORDER BY created_at ASC');
    res.json(rows.map(item => ({ ...item, visible: Boolean(item.visible) })));
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
});


// ────────────────────────────────────────────────────────────────
// 🔐 API ROUTES : ADMIN SECURE AUTH
// ────────────────────────────────────────────────────────────────

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Veuillez saisir votre nom d'utilisateur et mot de passe" });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
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

app.post('/api/paypal/create-order', async (req, res) => {
  const { email, amount, currency, description } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'L’email client est requis pour créer la commande PayPal.' });
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
    return res.status(400).json({ error: 'L’ID de commande PayPal est requis pour la capture.' });
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
// 📦 SERVIR LES FICHIERS STATIQUES DU FRONT-END (MONOLITHE)
// ────────────────────────────────────────────────────────────────

// On sert le répertoire de compilation du front-end React ('dist')
app.use(express.static(path.join(__dirname, '../dist')));

// Toutes les autres requêtes non-API sont redirigées vers l'application React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


// START THE SERVER
app.listen(PORT, () => {
  console.log(`🚀 Serveur Monolithique UBB en cours d'exécution sur le port ${PORT}`);
});
