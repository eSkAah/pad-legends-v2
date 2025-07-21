# Product Requirements Document (PRD)

## Application de Matchmaking Padel avec Gamification

---

### 1. VISION & OBJECTIFS

**Vision Produit :** Créer la première plateforme mobile de matchmaking pour joueurs de Padel, facilitant l'organisation de parties et créant une communauté engagée grâce à la gamification.

**Objectifs Business :**

- Résoudre la problématique d'organisation des matchs de Padel
- Créer une communauté de joueurs actifs
- Augmenter la fréquentation des clubs partenaires
- Développer un écosystème gamifié pour fidéliser les utilisateurs

**Métriques de Succès :**

- Nombre d'utilisateurs actifs mensuels
- Nombre de matchs organisés via la plateforme
- Taux de complétion des parties (parties à 4 joueurs)
- Taux de rétention utilisateur à 30 jours

---

### 2. UTILISATEURS CIBLES

**Persona Principal :** Joueurs de Padel de 25-45 ans, niveau intermédiaire, cherchant à jouer régulièrement avec des partenaires de niveau équivalent.

**Besoins Utilisateurs :**

- Trouver rapidement des partenaires de jeu
- Organiser des parties selon ses disponibilités
- Jouer avec des personnes de niveau similaire
- Suivre sa progression et ses performances

---

### 3. ARCHITECTURE TECHNIQUE

**Plateforme :** Web Application Progressive (PWA)

- Optimisée mobile-first
- Compatible desktop
- Installation possible sur mobile
- Notifications push natives

**Stack Technique Confirmée :**

- Frontend : React + TypeScript + Vite
- Backend : NestJS + TypeScript
- Base de données : PostgreSQL via Supabase
- Authentification : Supabase Auth (OAuth Google/Apple intégré)
- Notifications : Supabase Realtime + Push notifications
- Géolocalisation : Google Maps API
- ORM : Prisma (compatible Supabase)
- UI Framework : Tailwind CSS + Headless UI
- State Management : Zustand ou React Query

---

### 4. FONCTIONNALITÉS DÉTAILLÉES

#### 4.1 AUTHENTIFICATION & ONBOARDING

**4.1.1 Inscription**

- Email/mot de passe classique
- Connexion rapide Google OAuth
- Connexion rapide Apple Sign-In
- Validation email obligatoire

**4.1.2 Profil Utilisateur - Setup Initial**
Champs obligatoires :

- Pseudo (unique, 3-20 caractères)
- Niveau de jeu (slider 1-10 avec descriptions)
  - 1-2 : Débutant
  - 3-4 : Débutant+
  - 5-6 : Intermédiaire
  - 7-8 : Avancé
  - 9-10 : Expert
- Côté de jeu préféré : Gauche/Droite/Indifférent
- Clubs favoris (maximum 3, recherche avec autocomplétion)

Champs optionnels :

- Photo de profil
- Âge
- Description courte (100 caractères max)

#### 4.2 GESTION DES AMIS

**Fonctionnalités :**

- Recherche d'amis par pseudo
- Envoi/réception demandes d'amis
- Liste des amis avec statut (en ligne/hors ligne)
- Suppression d'amis
- Invitation directe d'amis lors de création de partie

**Interface :**

- Onglet dédié "Amis"
- Badge de notification pour nouvelles demandes
- Bouton d'invitation rapide dans l'écran de création de match

#### 4.3 CRÉATION DE PARTIE

**Workflow de Création :**

1. Sélection du club (parmi ses favoris ou recherche)
2. Choix de la date (calendrier avec disponibilités des courts)
3. Sélection de l'heure (créneaux de 1h30, affichage des courts libres)
4. Définition du niveau accepté (±1 niveau par rapport au sien)
5. Option : Invitation d'amis spécifiques
6. Validation et publication

**Informations de la Partie :**

- Créateur (organisateur)
- Club et court si spécifié
- Date et heure
- Niveau requis
- Participants (0-3 autres joueurs)
- Statut : Ouverte/Complète/Annulée

#### 4.4 LISTE & RECHERCHE DE MATCHS

**Affichage :**

- Liste chronologique des matchs disponibles
- Card design avec informations essentielles :
  - Club et localisation
  - Date/heure
  - Niveau requis
  - Nombre de places restantes (X/4)
  - Distance approximative

**Filtres :**

- Par club (sélection multiple)
- Par région/ville
- "Autour de moi" (rayon personnalisable : 5km, 10km, 20km)
- Par niveau (±1, ±2 par rapport au niveau utilisateur)
- Par date (aujourd'hui, demain, cette semaine)

**Actions :**

- Rejoindre une partie
- Voir détails de la partie
- Contacter l'organisateur

#### 4.5 SYSTÈME DE CHAT (ROOMS)

**Déclenchement :** Room automatiquement créée quand partie complète (4/4 joueurs)

**Fonctionnalités Chat :**

- Messages texte instantanés
- Affichage des avatars des 4 participants
- Notifications push pour nouveaux messages
- Partage de localisation pour le rendez-vous
- Messages système automatiques (rappels de match)

**Gestion de la Room :**

- Active jusqu'à 2h après la fin du match
- Archivage automatique
- Possibilité de créer une nouvelle partie avec les mêmes joueurs

#### 4.6 NOTIFICATIONS

**Types de Notifications :**

- Push mobile + email pour partie complète
- Push pour nouveaux messages dans une room
- Rappel 2h avant le match
- Rappel 24h avant le match
- Invitation d'ami reçue
- Demande d'ami acceptée

**Paramètres :**

- Activation/désactivation par type
- Heures de silence configurables

#### 4.7 GAMIFICATION

**4.7.1 Statistiques Personnelles**
Dashboard avec :

- Nombre total de parties jouées
- Ratio Victoires/Défaites (saisie manuelle post-match)
- Streak de parties (consécutives)
- Club le plus fréquenté
- Partenaires de jeu réguliers
- Graphique d'évolution du niveau

**4.7.2 Système de Badges**
Badges basés sur l'activité :

- **Rookie** : Première partie jouée
- **Social** : 5 parties avec différents partenaires
- **Regular** : 10 parties jouées
- **Veteran** : 25 parties jouées
- **Legend** : 50 parties jouées
- **Streak Master** : 5 victoires consécutives
- **Explorer** : Joué dans 3 clubs différents
- **Community Builder** : 10 amis ajoutés

**Affichage des Badges :**

- Icône de profil évolutive selon le badge principal
- Section dédiée dans le profil
- Badge visible sur les parties créées (crédibilité)

---

### 5. WIREFRAMES & USER FLOWS

#### 5.1 Navigation Principale

**Bottom Tab Bar (Mobile) :**

- Accueil (liste des matchs)
- Créer (+)
- Mes Parties
- Amis
- Profil

#### 5.2 User Flow Principal

```
Inscription → Setup Profil → Liste Matchs → [Créer/Rejoindre] → Chat Room → Statistiques
```

#### 5.3 États des Écrans Principaux

**Écran d'Accueil :**

- Header avec filtres actifs
- Liste scrollable des matchs
- FAB pour créer une partie
- États vides avec illustrations

**Écran Création :**

- Formulaire step-by-step
- Validation en temps réel
- Prévisualisation avant publication

---

### 6. SPÉCIFICATIONS TECHNIQUES

#### 6.1 Base de Données - Modèle Supabase

**Utilisateurs (profiles)** - Extension de auth.users

```sql
- id (UUID, PK, référence auth.users)
- email (string, sync avec auth.users)
- pseudo (string, unique)
- level (integer, 1-10)
- preferred_side (enum: left/right/both)
- avatar_url (string, nullable)
- age (integer, nullable)
- description (string, nullable)
- created_at, updated_at (timestamps)
- is_verified (boolean, default false)
```

**Clubs (clubs)**

```sql
- id (UUID, PK)
- name (string)
- address (string)
- latitude, longitude (decimal)
- city (string)
- phone (string, nullable)
- created_at (timestamp)
```

**Parties (matches)**

```sql
- id (UUID, PK)
- creator_id (UUID, FK users)
- club_id (UUID, FK clubs)
- scheduled_date (datetime)
- level_min, level_max (integer)
- status (enum: open/full/completed/cancelled)
- participants (jsonb array of user_ids)
- created_at, updated_at (timestamps)
```

**Amis (friendships)**

```sql
- id (UUID, PK)
- requester_id (UUID, FK users)
- receiver_id (UUID, FK users)
- status (enum: pending/accepted/blocked)
- created_at (timestamp)
```

**Messages (chat_messages)**

```sql
- id (UUID, PK)
- match_id (UUID, FK matches)
- sender_id (UUID, FK users)
- content (text)
- created_at (timestamp)
```

**Statistiques (user_stats)**

```sql
- id (UUID, PK)
- user_id (UUID, FK users)
- matches_played (integer)
- matches_won (integer)
- matches_lost (integer)
- current_streak (integer)
- badges (jsonb array)
- updated_at (timestamp)
```

#### 6.2 API Endpoints Principaux

**Authentification Supabase**

```
// Utilisation du client Supabase
POST /auth/v1/signup (email/password)
POST /auth/v1/token?grant_type=password (login)
POST /auth/v1/authorize (OAuth Google/Apple)
POST /auth/v1/token?grant_type=refresh_token
```

**API NestJS**

**Utilisateurs**

```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/search?q={pseudo}
GET /api/users/{id}/stats
```

**Matchs**

```
GET /api/matches (avec filtres query params)
POST /api/matches
GET /api/matches/{id}
PUT /api/matches/{id}/join
DELETE /api/matches/{id}/leave
```

**Chat Temps Réel**

```
// Supabase Realtime pour les messages
WebSocket automatique via Supabase client
Subscriptions : matches.{match_id}.chat_messages
```

#### 6.3 Design System Premium - Inspiration Apple

**Palette de Couleurs :**

```css
/* Couleurs principales */
--navy-900: #0C1B2E    /* Bleu très foncé - backgrounds principaux */
--navy-800: #1E293B    /* Bleu foncé - cards, sections */
--navy-700: #334155    /* Bleu moyen - borders, dividers */
--navy-600: #475569    /* Bleu clair - text secondary */

--amber-400: #FBBF24   /* Jaune principal - CTAs, highlights */
--amber-300: #FCD34D   /* Jaune clair - hover states */
--amber-500: #F59E0B   /* Jaune foncé - active states */

/* Couleurs neutres premium */
--white: #FFFFFF
--gray-50: #F8FAFC     /* Backgrounds clairs */
--gray-100: #F1F5F9    /* Subtle backgrounds */
--gray-200: #E2E8F0    /* Borders légers */
--gray-300: #CBD5E1    /* Icons, disabled states */
--gray-400: #94A3B8    /* Text muted */
--gray-500: #64748B    /* Text secondary */
--gray-900: #0F172A    /* Text primary */

/* Couleurs système */
--success: #10B981     /* Vert émeraude */
--warning: #F59E0B     /* Ambre */
--error: #EF4444       /* Rouge moderne */
--info: #3B82F6        /* Bleu système */
```

**Typographie - Style Apple :**

```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui

/* Hiérarchie */
--text-xs: 12px     /* Captions, badges */
--text-sm: 14px     /* Body secondary, metadata */
--text-base: 16px   /* Body primary */
--text-lg: 18px     /* Subheadings */
--text-xl: 20px     /* Card titles */
--text-2xl: 24px    /* Section headers */
--text-3xl: 30px    /* Page titles */
--text-4xl: 36px    /* Hero titles */

/* Weights */
--font-regular: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

**Composants Premium :**

1. **Cards avec Glassmorphism :**

   - Background : navy-800 avec 90% opacity
   - Border : 1px solid white avec 10% opacity
   - Backdrop blur : 20px
   - Border radius : 16px
   - Box shadow : 0 8px 32px rgba(12, 27, 46, 0.37)

2. **Boutons - Style Apple :**

   - Primary : Fond amber-400, text navy-900, bold
   - Secondary : Border amber-400, text amber-400
   - Ghost : Text gray-300, hover gray-100
   - Height : 48px minimum (touch-friendly)
   - Border radius : 12px
   - Transition : all 200ms ease

3. **Inputs Premium :**

   - Background : navy-700 avec border gray-300
   - Focus : border amber-400 avec shadow amber-400/20
   - Placeholder : gray-400
   - Height : 52px
   - Border radius : 12px
   - Padding : 16px

4. **Navigation - Tab Bar iOS :**
   - Background : navy-900 avec blur effect
   - Active tab : amber-400 avec subtle glow
   - Inactive : gray-400
   - Icons : SF Symbols style (lucide-react)

**Animations & Micro-interactions :**

```css
/* Transitions fluides */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)

/* Springs iOS-like */
--spring-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--spring-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

**Principes UI Premium :**

- Espacement : système 8px (4, 8, 12, 16, 24, 32, 48, 64px)
- Élévation : subtle shadows avec couleurs de la palette
- Consistance : tous les éléments suivent les mêmes règles
- Affordance : les éléments interactifs sont évidents
- Feedback : chaque action a une réponse visuelle immédiate
- Hiérarchie : utilisation du contrast et de la taille pour guider l'œil

**Layout Responsive :**

- Mobile First : 375px base (iPhone SE)
- Tablet : 768px+ avec adaptation de la navigation
- Desktop : 1024px+ avec sidebar navigation
- Spacing adaptatif : plus généreux sur desktop

**États & Feedback :**

- Loading : Skeleton screens avec shimmer effect
- Empty states : Illustrations custom avec call-to-action
- Error states : Messages explicites avec actions de récupération
- Success : Subtle animations de confirmation (checkmark, etc.)

**Accessibility Premium :**

- Contrast minimum WCAG AAA
- Focus indicators visibles et styled
- Touch targets minimum 44px
- Support screen readers complet
- Keyboard navigation fluide

---

### 7. PHASES DE DÉVELOPPEMENT

#### Phase 1 - MVP (8-10 semaines)

- Authentification complète
- CRUD profil utilisateur
- Création/recherche/affichage des matchs
- Système de base de notifications
- Interface mobile responsive

#### Phase 2 - Social (4-6 semaines)

- Système d'amis complet
- Chat rooms et WebSocket
- Notifications push natives
- Géolocalisation et filtres avancés

#### Phase 3 - Gamification (3-4 semaines)

- Statistiques utilisateur
- Système de badges
- Dashboard analytics
- Profils publics enrichis

#### Phase 4 - Optimisation (2-3 semaines)

- Performance et SEO
- Tests utilisateurs
- Corrections bugs
- Préparation production

---

### 8. CRITÈRES D'ACCEPTATION

#### Fonctionnels

- Un utilisateur peut s'inscrire en moins de 2 minutes
- Une partie peut être créée en moins de 1 minute
- Les notifications sont reçues dans les 30 secondes
- Le chat fonctionne en temps réel
- Les filtres de recherche sont instantanés

#### Techniques

- Temps de chargement < 3 secondes
- Compatible iOS Safari et Chrome Android
- Fonctionne hors ligne pour la consultation
- Base de données optimisée pour 10k+ utilisateurs
- Sécurité : toutes les données sensibles chiffrées

#### UX/UI

- Interface intuitive sans formation
- Design cohérent sur toutes les plateformes
- Accessibilité WCAG 2.1 niveau AA
- Mode sombre/clair
- Support multi-langues (FR/EN minimum)

---

### 9. RISQUES & MITIGATION

**Risque Technique :** Gestion des notifications push cross-platform
**Mitigation :** Utiliser Firebase FCM avec fallback email

**Risque Business :** Adoption lente par les clubs
**Mitigation :** Phase pilote avec 3-5 clubs partenaires

**Risque Légal :** RGPD et données personnelles
**Mitigation :** Audit juridique et implémentation privacy-by-design

**Risque Produit :** Engagement utilisateur faible
**Mitigation :** Tests utilisateurs réguliers et métriques d'engagement

---

### 10. MÉTRIQUES & KPI

**Engagement :**

- DAU/MAU ratio
- Nombre de parties créées/complétées par jour
- Temps moyen passé dans l'app
- Taux de rétention J7, J30

**Fonctionnalités :**

- Taux de complétion des parties (4/4 joueurs)
- Nombre moyen de messages par chat room
- Utilisation des filtres de recherche
- Taux d'activation des notifications

**Business :**

- Croissance mensuelle des nouveaux utilisateurs
- Nombre de clubs actifs sur la plateforme
- Fréquence moyenne de jeu par utilisateur

---

Ce PRD constitue la base technique et fonctionnelle pour le développement avec Claude Code. Chaque section peut être approfondie selon les besoins spécifiques du développement.
