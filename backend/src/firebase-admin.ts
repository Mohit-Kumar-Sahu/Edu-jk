// File: backend/src/firebase-admin.ts (Final, Production-Ready Version)

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // 1. Get the secret JSON string from the environment variable we just created in Render.
    const credsJson = process.env.FIREBASE_CREDENTIALS;

    // 2. Safety check: If the variable doesn't exist, stop and throw an error.
    if (!credsJson) {
      throw new Error('FIREBASE_CREDENTIALS environment variable not set.');
    }

    // 3. Parse the JSON string back into a usable object.
    const serviceAccount = JSON.parse(credsJson);

    // 4. Initialize Firebase with the credentials from the environment.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ [Firebase] Admin SDK Initialized SUCCESSFULLY from environment variable.");

  } catch (error) {
    console.error("❌ [Firebase] FAILED to initialize Admin SDK:", error);
    // We explicitly exit if Firebase can't initialize, as the app cannot run without it.
    process.exit(1); 
  }
}

export { admin };