// File: backend/server.ts (Corrected and Final Version)

import * as dotenv from 'dotenv';
dotenv.config();

import { Hono } from 'hono';
// This line is the most important: It runs your new initialization file
// BEFORE any of the other route files are imported, guaranteeing Firebase is ready.
import './src/firebase-admin'; 

// Now, import your route files
import achievements from './achievements-backend';
import userManagement from './user-management';
import profile from './src/profile';

console.log("🚦 [SERVER] Main server file is running...");

const app = new Hono();

console.log("🚦 [SERVER] Registering server routes...");

app.route('/api/achievements', achievements);
app.route('/api/profile', profile);
app.route('/api', userManagement);

console.log("✅ [SERVER] All routes registered. Server is ready!");

export default app;