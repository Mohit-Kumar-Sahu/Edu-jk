// File: src/middleware/auth.ts

import { createMiddleware } from 'hono/factory';
import * as admin from 'firebase-admin';

// This is our "Security Guard" middleware.
export const authMiddleware = createMiddleware(async (c, next) => {
  // 1. It asks for the user's ID card (the token from the "Authorization" header).
  const authHeader = c.req.header('Authorization');
  
  // 2. If they don't have one, it denies access.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: No token provided' }, 401);
  }

  // 3. It takes the token out of the "Bearer <token>" format.
  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    // 4. It calls Firebase to verify the ID card is real and not fake/expired.
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // 5. If it's real, it secretly attaches the user's unique ID (uid) to the request...
    c.set('uid', decodedToken.uid);
    
    // 6. ...and lets them proceed to the private profile page.
    await next();
  } catch (error) {
    // 7. If the ID is fake/expired, it denies access.
    console.error('Token verification failed:', error);
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
  }
});