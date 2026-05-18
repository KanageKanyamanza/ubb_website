# 🗄️ UBB MySQL & API Server - Guide de Configuration

Ce dossier contient toutes les configurations, le schéma SQL et le serveur API Node.js/Express nécessaires pour connecter la plateforme **Ubuntu Business Builders (UBB)** à une base de données **MySQL** persistante et sécurisée.

---

## 📋 Prérequis

1. **MySQL Server** ou un environnement local comme **XAMPP / WampServer / MAMP** (incluant phpMyAdmin).
2. **Node.js** (version 16 ou supérieure) installé sur votre machine.

---

## 🚀 Étape 1 : Initialisation de la Base de Données MySQL

1. Lancez votre serveur MySQL (via XAMPP Control Panel ou vos services système).
2. Ouvrez **phpMyAdmin** dans votre navigateur (généralement `http://localhost/phpmyadmin`).
3. Cliquez sur l'onglet **SQL** en haut.
4. Ouvrez le fichier [schema.sql](schema.sql) situé dans ce dossier, copiez l'intégralité de son contenu, collez-le dans la zone SQL de phpMyAdmin, puis cliquez sur **Exécuter**.

> **Note :** Cette opération va créer automatiquement :
> * La base de données `ubb_database`
> * Les tables `admins`, `team_members`, `news_gallery` et `strategic_projects`
> * Injecter automatiquement toutes les données initiales haut de gamme (Ambrose, Raoul Nadinga, Khady, etc. et vos projets comme vitalCHECK et HARVESTS 2.0).

---

## ⚙️ Étape 2 : Configuration des Variables d'Environnement

Le fichier [.env](.env) gère les accès sécurisés à votre base de données.
Ouvrez le fichier [.env](.env) et ajustez les paramètres si votre serveur MySQL utilise un mot de passe ou un port différent :

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=votre_mot_de_passe  # Laissez vide si vous êtes sur XAMPP par défaut
DB_NAME=ubb_database
DB_PORT=3306
```

---

## 🏎️ Étape 3 : Lancement du Serveur API

Ouvrez votre terminal dans le dossier `server` et exécutez les commandes suivantes :

### 1. Installer les dépendances
```bash
npm install
```

### 2. Démarrer le serveur en mode développement (avec rechargement automatique)
```bash
npm run dev
```

Le serveur démarrera instantanément sur : `http://localhost:5000`

---

## 📡 Liste des Points d'Accès de l'API (Endpoints)

| Méthode | Route | Description |
| :--- | :--- | :--- |
| **GET** | `/api/team` | Récupère tous les membres de l'équipe actifs |
| **POST** | `/api/team` | Ajoute un nouveau membre dans MySQL |
| **PUT** | `/api/team/:id` | Modifie un membre existant par son ID |
| **PATCH**| `/api/team/:id/toggle` | Active/Désactive la visibilité publique d'un membre |
| **DELETE**| `/api/team/:id` | Supprime définitivement un membre (hors Ambrose) |
| **GET** | `/api/news` | Récupère toutes les photos de la galerie d'actualités |
| **GET** | `/api/projects` | Récupère tous les projets stratégiques (SaaS) |
| **POST** | `/api/admin/login` | Authentifie un administrateur backoffice de manière sécurisée |

---

## ⚡ Étape 4 : Connexion du Front-end React au Serveur MySQL

Pour connecter le front-end React à ce serveur MySQL, il suffit de modifier vos contexts front-end (comme `TeamContext.tsx`) pour remplacer le chargement depuis `localStorage` par des requêtes `fetch()` standard.

### Exemple de chargement dans `TeamContext.tsx` :
```typescript
useEffect(() => {
  fetch("http://localhost:5000/api/team")
    .then(res => res.json())
    .then(data => setTeam(data))
    .catch(err => console.error("Erreur de synchronisation MySQL:", err));
}, []);
```
