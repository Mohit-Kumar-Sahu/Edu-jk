// File: backend/src/firebase-admin.ts

import * as admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors.
if (!admin.apps.length) {
  try {
    // This path is correct because this file is in 'src', so it goes up one level ('../')
    // to the 'backend' folder to find the key.
    const serviceAccount = require('../firebase-service-account.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ [Firebase] Admin SDK Initialized SUCCESSFULLY.");
  } catch (error) {
    console.error("❌ [Firebase] FAILED to initialize Admin SDK:", error);
  }
}

// Export the already-initialized admin object for other files to use.
export { admin };