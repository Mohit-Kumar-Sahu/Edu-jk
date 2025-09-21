// File: backend/src/firebase-admin.ts (Final, Production-Ready Version)

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // 1. Read the three separate, secure environment variables from Render.
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // 2. We need to replace the '\\n' characters in the private key from the env var.
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // 3. Safety check: If any of them are missing, the app cannot start.
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Firebase environment variables (PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY) are not set.');
    }

    // 4. Assemble the credentials object from the variables.
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    console.log("✅ [Firebase] Admin SDK Initialized SUCCESSFULLY from separate environment variables.");

  } catch (error) {
    console.error("❌ [Firebase] FAILED to initialize Admin SDK:", error);
    // Exit the process if Firebase fails, because the app is non-functional.
    process.exit(1);
  }
}

export { admin };