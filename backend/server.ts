// File: src/server.ts (or src/index.ts - Your Main Backend File)

// 1. Add this to load your .env file for the MongoDB connection string
import * as dotenv from 'dotenv';
dotenv.config();

import { Hono } from 'hono';
import * as admin from 'firebase-admin';

// 2. Import ALL your route files (your "departments")
import achievements from './achievements-backend';
import userManagement from './user-management';
import profile from './src/profile'; // <-- The crucial import for your new profile routes

const app = new Hono();

// 3. Initialize Firebase Admin correctly
if (!admin.apps.length) {
  // This will find the 'firebase-service-account.json' file in your project's root folder
  const serviceAccount = require('../firebase-service-account.json'); 
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK Initialized.");
}

// --- IMPORTANT: All other logic has been removed from this file ---
// The career quiz, Twilio, and colleges logic should be moved to their own
// dedicated route files for better organization, just like you've done for 'profile.ts'.
// For now, removing them here will fix the immediate problem.

// 4. Register ALL your routes with the app
console.log("Registering server routes...");

// Any request to '/api/achievements' will be handled by 'achievements.ts'
app.route('/api/achievements', achievements);

// Any request to '/api/profile' will now be correctly handled by 'profile.ts'
app.route('/api/profile', profile); // <-- THIS LINE FIXES THE "NOT FOUND" ERROR

// Any other request starting with '/api' will be handled by 'user-management.ts'
// This must come after the more specific '/api/profile' route.
app.route('/api', userManagement);

console.log("Routes registered. Server is ready to accept requests!");

export default app;