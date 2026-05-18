# 🚀 Guide de Déploiement Monolithique (Node.js + React + MySQL) sur Hostinger

Ce guide explique comment déployer votre application **monolithique** sur **Hostinger**. Dans cette architecture, le serveur Node.js/Express gère **à la fois** la connexion à votre base de données MySQL, les routes d'API, et sert directement les fichiers compilés du front-end React.

### 🌟 Avantages du Monolithe :
* **Un seul domaine / Aucun sous-domaine** : Tout fonctionne sur `https://votredomaine.com`.
* **Zéro problème de CORS** : Comme le front-end et l'API tournent sur la même adresse, les navigateurs n'appliquent aucune restriction de sécurité CORS.
* **Déploiement simplifié** : Un seul projet à configurer et à maintenir en ligne.

---

## 🗄️ Étape 1 : Création de la Base de Données MySQL sur Hostinger

1. Connectez-vous à votre **hPanel Hostinger**.
2. Allez dans **Bases de données** > **Bases de données MySQL**.
3. Créez une nouvelle base de données et un nouvel utilisateur :
   * **Nom de la base de données** : `u123456789_ubb`
   * **Nom d'utilisateur MySQL** : `u123456789_admin`
   * **Mot de passe** : *(Choisissez un mot de passe robuste)*
4. Cliquez sur **Créer**.
5. Ouvrez **phpMyAdmin** pour cette base de données depuis votre hPanel Hostinger.
6. Allez sur l'onglet **SQL**, copiez le contenu du fichier [schema.sql](schema.sql) local, collez-le et cliquez sur **Exécuter**. Votre base de données de production est prête !

---

## 💻 Étape 2 : Compilation du Front-end React en Production

Pour compiler le front-end avec des URLs relatives (qui s'adaptent automatiquement à votre domaine de production) :

1. Assurez-vous que le fichier `.env.production` à la racine du projet contient :
   ```env
   VITE_API_URL=
   ```
   *(Laisser cette variable vide indique à React d'utiliser des chemins d'accès relatifs, comme `/api/team` au lieu de `http://localhost:5000/api/team`)*
2. Ouvrez votre terminal à la racine du projet et compilez le front-end :
   ```bash
   npm run build
   ```
3. Cela va générer un dossier `dist/` à la racine de votre projet. Ce dossier contient tous les fichiers statiques de votre site React optimisés pour la production.

---

## 📡 Étape 3 : Déploiement et Configuration de l'Application sur Hostinger

Hostinger supporte Node.js nativement via la section **Avancé** > **Configuration de Node.js** (ou via un VPS Hostinger).

### 1. Préparer les fichiers du serveur
Dans le dossier `server/` de votre projet, ouvrez le fichier `.env` de production et renseignez les identifiants MySQL créés à l'Étape 1 :
```env
PORT=5000
DB_HOST=localhost  # Sous Hostinger mutualisé, le serveur MySQL est hébergé en local
DB_USER=u123456789_admin
DB_PASSWORD=votre_mot_de_passe_secret_hostinger
DB_NAME=u123456789_ubb
DB_PORT=3306
JWT_SECRET=un_secret_de_production_tres_fort
```

### 2. Téléverser les dossiers sur Hostinger
Utilisez le **Gestionnaire de fichiers Hostinger** ou un client FTP (comme FileZilla) :
1. Créez un dossier pour votre application sur Hostinger (par exemple, dans le répertoire de votre application Node.js).
2. Téléversez l'intégralité du contenu du dossier local **`server`** dans ce répertoire.
3. Téléversez le dossier **`dist`** (généré à l'Étape 2) juste à côté du dossier `server`, ou à l'intérieur du dossier parent de manière à conserver la structure relative :
   ```
   ├── dist/           <-- Fichiers compilés de React (index.html, assets, etc.)
   └── server/         <-- Fichiers de votre serveur API Node.js (server.js, db.js, etc.)
   ```

### 3. Configurer Node.js dans le hPanel Hostinger
1. Allez dans **Avancé** > **Configuration de Node.js** dans votre hPanel.
2. Créez une nouvelle application Node.js :
   * **Version de Node.js** : Sélectionnez la version stable recommandée (ex : `18.x` ou `20.x`).
   * **Mode d'application** : `Production`.
   * **Répertoire de l'application** : Indiquez le dossier où se trouve votre fichier `server.js` (dossier `server`).
   * **Fichier de démarrage** : `server.js`.
3. Cliquez sur **Créer**.
4. Cliquez sur le bouton **Installer npm** pour télécharger automatiquement les dépendances (`express`, `mysql2`, `cors`, `dotenv`) directement sur le serveur de production d'Hostinger.
5. Cliquez sur **Démarrer l'application**.

---

## 🎉 Félicitations !
Votre serveur monolithique Node.js est maintenant actif sur Hostinger. Il va :
* Se connecter à la base de données MySQL locale d'Hostinger.
* Répondre aux requêtes API faites sur `/api/team`, `/api/news`, et `/api/projects`.
* **Servir automatiquement** l'ensemble de vos pages web React (`/`, `/team`, `/ebooks`, etc.) de manière ultra-rapide et sécurisée sous votre domaine principal !
