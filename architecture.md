# System Architecture Overview

This document outlines the logic and data flow of the MDMS application.

## High-Level Architecture Flow

The system is a unified full-stack application hosted on Vercel, integrating securely with Google Cloud Firebase.

```mermaid
flowchart TD
    classDef frontend fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    classDef backend fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff
    classDef database fill:#f59e0b,stroke:#b45309,stroke-width:2px,color:#fff
    classDef auth fill:#f43f5e,stroke:#be123c,stroke-width:2px,color:#fff

    subgraph user_device [User Device]
        Browser[User Browser - React App]
    end

    subgraph vercel [Vercel Global Edge Network]
        UI[Static Frontend Delivery - React]
        API[Serverless Backend Functions - Node.js/Express]
    end

    subgraph firebase [Google Cloud / Firebase]
        Firestore[(Firestore Database)]
        FirebaseAuth[Firebase Authentication]
    end

    Browser -->|1. Loads UI| UI
    UI -.->|2. Renders in Browser| Browser
    Browser -->|3. Data Requests API| API
    Browser -->|Authenticates| FirebaseAuth
    API -->|4. Query Data Admin SDK| Firestore
    Firestore -->|5. Returns JSON Data| API
    API -->|6. Sends JSON Response| Browser

    class Browser,UI frontend
    class API backend
    class Firestore database
    class FirebaseAuth auth
```

## System Logic and Data Flow

### 1. The Frontend (React UI)
- The React frontend is served globally via Vercel’s Edge Network. 
- When a user visits the application URL, the browser downloads the static bundle (HTML/CSS/JS) and renders the interface locally.
- Authentication happens directly between the React frontend and Firebase Authentication.

### 2. The Backend (Serverless API)
- The backend logic is powered by Node.js/Express and is structured inside the `/api` directory.
- Vercel automatically maps any file inside `/api` into a Serverless Function. 
- The `vercel.json` rewrite rules ensure that frontend requests to `/api/*` are intercepted and routed to these serverless functions seamlessly without hitting the React router.
- When an API request is made, a serverless instance spins up dynamically, processes the logic, and shuts down immediately after sending the response.

### 3. Database Interaction (Firestore)
- The Serverless backend interacts with the Firestore Database using the `Firebase Admin SDK`.
- Secure connection to Firebase is established using a service account credentials object stored safely within Vercel's Environment Variables (`FIREBASE_SERVICE_ACCOUNT`).
- Data queried from Firestore is parsed, formatted into JSON, and returned back down the chain to the React frontend where it populates the UI state.

### 4. Security and Authentication Flow
- All API routes are protected by a global `checkAuth` Express middleware (`api/routes/api.js`).
- When a user logs in, Firebase Authentication issues a JWT (JSON Web Token). The frontend stores this token in `localStorage`.
- For every subsequent API request (GET, POST, PUT), the frontend retrieves this token and appends it to the request headers (`X-Authorization: Bearer <token>`).
- The backend intercepts the request and verifies the JWT using the `Firebase Admin SDK` (`admin.auth().verifyIdToken()`).
- If the token is valid, the request proceeds to the Firestore data fetch logic. If missing or invalid, it immediately returns a `401 Unauthorized` response.
