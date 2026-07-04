const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Parse the JSON string from the environment variable (for production deployment)
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Fallback to local file for development
  serviceAccount = require('./serviceaccountkey.json');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRoutes = require('./routes/api')(db);
app.use('/', apiRoutes);

module.exports = app;
