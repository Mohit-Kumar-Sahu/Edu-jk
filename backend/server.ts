// File: server.ts (or index.ts)

// --- Step 1: Add dotenv to load your .env file ---
import * as dotenv from 'dotenv';
dotenv.config();

// --- Step 2: Keep necessary imports ---
import { Hono } from 'hono';
import * as admin from 'firebase-admin';

// --- Step 3: Import ALL your route files ---
import achievements from './achievements-backend';
import userManagement from './user-management';
import profile from "./src/profile"; // <-- ADD THIS LINE to import your new profile routes

const app = new Hono();

// --- Step 4: Initialize Firebase Admin correctly ---
// This will now find the firebase-service-account.json file in your project's root folder.
if (!admin.apps.length) {
  // Use 'require' here as it's a common and reliable way to load JSON in Node.js
  const serviceAccount = require('../firebase-service-account.json'); 
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK Initialized.");
}

// --- Step 5: REMOVE all conflicting database and API logic ---
// We are deleting the Firestore code (`admin.firestore()`), the career quiz logic,
// and the college endpoints from this file. Why? Because this file should only be the "control center"
// that directs traffic. The actual logic should live in other files (like profile.ts, etc.).
// This makes your project MUCH cleaner and easier to manage.

// --- Step 6: Register ALL your routes ---
// Tell your app where to send incoming requests.

console.log("Registering routes...");

// Any request starting with /api/achievements goes to the achievements file.
app.route('/api/achievements', achievements);

// Any request starting with /api/profile goes to our new secure profile file.
app.route('/api/profile', profile); // <-- ADD THIS LINE to activate the new routes

// Any other request starting with /api goes to your user management file.
// IMPORTANT: This should come LAST among the /api routes so the more specific ones are matched first.
app.route('/api', userManagement);

console.log("Routes registered successfully. Server is ready!");

export default app;