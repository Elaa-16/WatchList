# 🎬 Application de gestion de films

## 📌 Présentation du projet

Ce projet est une **application web de gestion de films** développée selon une architecture **frontend / backend**.

L’application permet :

* aux **utilisateurs** de consulter les films et leurs détails
* à l’**administrateur** de gérer les films et les genres (ajout, modification, suppression)

L’objectif principal du projet est de montrer une **bonne séparation des responsabilités**, une **communication sécurisée via une API**, et une **gestion claire des données**.

---

## 🏗️ Architecture générale

Le projet est divisé en trois grandes parties :

```
Frontend (React)
   ↓
API Backend (Node.js / Express)
   ↓
Base de données (MongoDB)
```

👉 Le frontend **ne communique jamais directement avec la base de données**.
👉 **Toutes les requêtes passent par l’API**, ce qui permet de sécuriser et contrôler les accès.

---

## 🖥️ Frontend

Le frontend est développé avec **React**.
Il s’occupe uniquement de :

* l’interface utilisateur
* l’affichage des données
* la gestion des actions de l’utilisateur

### 📁 Structure principale

```
frontend/
 ├── src/
 │   ├── assets/        # Images, icônes
 │   ├── components/    # Composants réutilisables
 │   ├── pages/         # Pages de l’application
 │   ├── redux/         # Gestion des données
 │   ├── App.jsx        # Routing principal
 │   └── main.jsx       # Point d’entrée React
```

### 📄 Pages

Chaque page correspond à une fonctionnalité précise :

* Page d’accueil
* Liste des films
* Détails d’un film
* Connexion / inscription
* Profil utilisateur
* Pages d’administration

### 🧩 Composants

Les composants sont des éléments réutilisables comme :

* cartes de films
* formulaires
* fenêtres modales
* indicateurs de chargement

Cela permet d’éviter la répétition du code.

---

## 🧠 Gestion des données : Redux & RTK Query

### Redux

**Redux** est utilisé pour **centraliser les données importantes** de l’application, par exemple :

* l’utilisateur connecté
* la liste des films

Au lieu que chaque page gère ses propres données, Redux les stocke **dans un seul endroit**, accessible par toute l’application.

### RTK Query

**RTK Query** est utilisé pour communiquer avec le backend.
Il permet de :

* appeler l’API
* récupérer les données
* gérer automatiquement le chargement et les erreurs

Ainsi, le frontend peut récupérer les données sans gérer manuellement toute la logique réseau.

---

## 🔐 Authentification et rôles

L’application utilise un système d’authentification basé sur :

* email et mot de passe
* token pour maintenir la session utilisateur

Il existe deux rôles :

* **Utilisateur** : accès aux fonctionnalités de consultation
* **Administrateur** : accès à la gestion des films et des genres

Les pages sensibles sont protégées côté frontend et côté backend.

---

## 🌐 Backend

Le backend est une **API REST** développée avec **Node.js et Express**.
Il s’occupe de :

* recevoir les requêtes du frontend
* appliquer la logique métier
* vérifier les droits des utilisateurs
* communiquer avec la base de données

### 📁 Structure principale

```
backend/
 ├── config/        # Configuration (connexion DB)
 ├── models/        # Schémas de données
 ├── controllers/   # Logique métier
 ├── routes/        # Routes de l’API
 ├── middlewares/   # Sécurité et protections
 └── index.js       # Point d’entrée du serveur
```

### Models

Les models définissent la structure des données stockées dans MongoDB (films, utilisateurs, genres).

### Controllers

Les controllers contiennent la logique principale, par exemple :

* récupérer les films
* ajouter ou supprimer un film
* gérer les utilisateurs

### Routes

Les routes définissent les endpoints de l’API et redirigent les requêtes vers les controllers.

---

## 🗄️ Base de données

La base de données utilisée est **MongoDB**.
Elle permet de stocker de manière persistante :

* les utilisateurs
* les films
* les genres

La communication avec la base se fait uniquement via le backend.



