// File: backend/src/firebase-admin.ts (Final, Most Robust Version)

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // 1. Get the secret JSON string from the environment variable.
    const credsJson = process.env.FIREBASE_CREDENTIALS;

    if (!credsJson) {
      throw new Error('FIREBASE_CREDENTIALS environment variable not set.');
    }

    // 2. Parse the JSON string into an object.
    const serviceAccount = JSON.parse(credsJson);

    // --- THIS IS THE FINAL FIX ---
    // 3. Find and "un-scramble" the private key's newline characters.
    // This replaces the literal '\\n' text with actual newline characters '\n'.
    // This is a common and necessary fix for many hosting environments.
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

    // 4. Initialize Firebase with the corrected credentials.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ [Firebase] Admin SDK Initialized SUCCESSFULLY from environment variable.");

  } catch (error) {
    console.error("❌ [Firebase] FAILED to initialize Admin SDK:", error);
    process.exit(1);
  }
}

export { admin };