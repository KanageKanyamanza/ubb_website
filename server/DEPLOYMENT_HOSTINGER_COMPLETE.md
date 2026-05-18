# 🚀 GUIDE DE DÉPLOIEMENT COMPLET : MONOLITHE NODE.JS + REACT + MYSQL SUR HOSTINGER

Ce manuel vous guide pas-à-pas pour déployer votre plateforme **Ubuntu Business Builders (UBB)** sur votre hébergement **Hostinger**. Cette architecture regroupe le front-end React et les API MySQL dans un **monolithe unique**, éliminant les complications de CORS et de sous-domaines.

---

## 🗄️ ÉTAPE 1 : Configuration de la Base de Données MySQL sur Hostinger

Pour stocker vos données de manière persistante en production, vous devez créer une base de données MySQL dans votre espace client Hostinger.

1. Connectez-vous à votre **hPanel Hostinger**.
2. Dans le menu de gauche, naviguez vers **Bases de données** > **Bases de données MySQL**.
3. Remplissez le formulaire de création :
   * **Nom de la base de données** : Choisissez un nom (ex : `u123456789_ubb`).
   * **Nom d'utilisateur** : Choisissez un identifiant d'administrateur (ex : `u123456789_admin`).
   * **Mot de passe** : Générez un mot de passe sécurisé et notez-le soigneusement.
4. Cliquez sur **Créer**.
5. Repérez la nouvelle base dans la liste ci-dessous, puis cliquez sur **Entrer dans phpMyAdmin** (à droite).
6. Dans phpMyAdmin, cliquez sur l'onglet **SQL** dans le menu supérieur.
7. Ouvrez le fichier local [schema.sql](schema.sql), copiez son contenu, collez-le dans la zone de texte de phpMyAdmin, puis cliquez sur **Exécuter**.

> **Félicitations** : Votre base de données de production est désormais structurée et pré-remplie avec tous les membres de l'équipe (y compris Nadinga Raoul au Burkina Faso), la galerie d'actualités et vos outils SaaS (vitalCHECK, HARVESTS 2.0) !

---

## 💻 ÉTAPE 2 : Préparation et Compilation (Build) du Front-End

Le front-end doit être compilé avec des routes relatives afin qu'il s'adapte automatiquement à votre domaine sur Hostinger, sans nécessiter de configuration manuelle.

1. Vérifiez que le fichier principal `.env.production` à la racine de votre projet `ubb_website` contient :
   ```env
   VITE_API_URL=
   ```
   *(Laisser cette valeur vide force Vite à compiler l'application en utilisant des adresses relatives, par exemple `/api/team` au lieu de `http://localhost:5000/api/team`)*
2. Ouvrez votre terminal à la racine du projet (`ubb_website`) et lancez la compilation :
   ```bash
   npm run build
   ```
3. Cette commande génère un dossier optimisé nommé **`dist`** à la racine de votre projet. C'est ce dossier qui contient les fichiers finaux qui seront lus par vos visiteurs.

---

## 📡 ÉTAPE 3 : Configuration du Back-End Node.js pour Hostinger

Avant d'envoyer votre serveur sur Hostinger, vous devez renseigner les accès de production MySQL.

1. Dans le dossier `server/`, créez ou modifiez le fichier `.env` avec les accès MySQL Hostinger créés à l'Étape 1 :
   ```env
   PORT=5000
   DB_HOST=localhost  # Sous Hostinger mutualisé, la base de données s'exécute sur le même serveur ('localhost')
   DB_USER=u123456789_admin
   DB_PASSWORD=le_mot_de_passe_secret_que_vous_avez_choisi
   DB_NAME=u123456789_ubb
   DB_PORT=3306
   JWT_SECRET=generer_une_cle_securisee_ici_2026
   ```

---

## 📂 ÉTAPE 4 : Téléversement des Fichiers sur Hostinger

Vous devez déposer vos fichiers sur Hostinger à l'aide du **Gestionnaire de fichiers** de l'hPanel ou via un client FTP (comme **FileZilla**).

Structure finale des fichiers sur votre hébergement :
```
├── dist/           <-- Fichiers compilés de React (contenant index.html, assets/, etc.)
└── server/         <-- Fichiers de votre serveur API Node.js (server.js, db.js, package.json, .env)
```

1. Connectez-vous au **Gestionnaire de fichiers Hostinger**.
2. Créez un dossier pour votre application Node.js (par exemple, dans le répertoire racine).
3. Téléversez-y l'intégralité du dossier local **`server`** (ne téléversez pas le dossier `node_modules` local, Hostinger les réinstallera lui-même proprement).
4. Téléversez le dossier **`dist`** (généré à l'Étape 2) juste à côté du dossier `server`, de manière à ce qu'il se trouve au même niveau hiérarchique.

---

## 🚀 ÉTAPE 5 : Lancement de l'Application Node.js sur Hostinger

Hostinger intègre un panneau simplifié pour gérer les serveurs Node.js.

1. Connectez-vous à votre **hPanel Hostinger**.
2. Dans la barre de recherche ou le menu, recherchez **Node.js** (sous l'onglet *Avancé*).
3. Cliquez sur **Créer une application** :
   * **Version de Node.js** : Sélectionnez la version stable recommandée (ex : `18.x` ou `20.x`).
   * **Mode d'application** : Choisissez `Production`.
   * **Répertoire de l'application** : Sélectionnez le dossier où vous avez téléversé le code du serveur (le dossier `server` contenant `server.js`).
   * **Fichier de démarrage** : Indiquez `server.js`.
4. Cliquez sur **Créer**.
5. Une fois l'application créée, cliquez sur le bouton **Installer npm** (ou *Run npm install*) dans le hPanel d'Hostinger. Hostinger va automatiquement installer de manière optimisée toutes les dépendances requises (`express`, `mysql2`, `cors`, `dotenv`).
6. Cliquez sur le bouton **Démarrer l'application** (ou *Start*).

---

## 📝 ÉTAPE 6 : Configuration des Redirections de Routes (Optionnel mais Recommandé)

Pour vous assurer que les pages de votre Single Page Application (React Router) se chargent et se rafraîchissent correctement sans générer d'erreurs `404 Not Found` de la part d'Apache (le serveur web d'Hostinger), créez un fichier nommé **`.htaccess`** à la racine de votre dossier `public_html/` sur Hostinger, et collez-y ce code :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🎉 VOTRE SITE EST EN LIGNE ET DISPONIBLE !

Votre application monolithique est à présent connectée de bout-en-bout :
* **Base de Données MySQL** : Stocke et distribue dynamiquement vos membres de l'équipe, la galerie d'actualités et vos applications SaaS.
* **Serveur API Node.js** : Protège vos accès, assure le transfert des données et distribue la plateforme.
* **Front-End React** : Affiche votre design premium et se connecte automatiquement et de façon relative à l'API sur le même domaine.
