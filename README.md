# MDMS (Meter Data Management System)

A unified full-stack application built to manage meter devices, profiles, and tenant information. The application integrates securely with Google Cloud Firebase and is deployed globally via Vercel.

## Tech Stack

*   **Frontend:** React (Bootstrapped with Create React App), React Bootstrap, Axios for data fetching.
*   **Backend:** Serverless Node.js/Express API (deployed as Vercel Serverless Functions).
*   **Database:** Google Cloud Firestore (NoSQL).
*   **Authentication:** Firebase Authentication & JWT verification via Firebase Admin SDK.
*   **Deployment:** Vercel (Frontend + Serverless API).

## Security Overview

The MDMS platform implements a robust security architecture using **JSON Web Tokens (JWT)**:

1.  **Authentication:** Users log in on the frontend via Firebase Authentication. A secure JWT is issued upon successful authentication and stored securely.
2.  **API Requests:** The frontend explicitly appends this JWT to the headers (`X-Authorization: Bearer <token>`) of every API request sent to the backend.
3.  **Global Middleware:** The backend is protected by a global Express middleware (`checkAuth`). This middleware intercepts incoming requests and uses the Firebase Admin SDK (`admin.auth().verifyIdToken()`) to cryptographically verify the JWT against Google's servers.
4.  **Authorization:** If the token is valid, the request is allowed to fetch or modify data in Firestore. If the token is missing, expired, or invalid, the backend immediately drops the request and returns a `401 Unauthorized` response.

## Development

To run the project locally, you will need to set up the necessary environment variables.

### Environment Variables

Create a `.env` file in the root directory:

```bash
REACT_APP_API_URL=http://localhost:5000 # Use this for local API calls, omit in production to use relative paths.
FIREBASE_SERVICE_ACCOUNT={"type": "service_account", "project_id": "mdms-...", ...} # Firebase Admin SDK credentials (JSON string).
```

### Running Locally

To run the React frontend:

```bash
npm install
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Architecture Details

For a detailed breakdown of the system logic, data flow, and serverless implementation, please see the [architecture.md](./architecture.md) documentation.
