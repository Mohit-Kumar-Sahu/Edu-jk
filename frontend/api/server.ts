import { Hono } from 'hono';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase-service-account.json';
import twilio from 'twilio';

const app = new Hono();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();
const collectionName = 'EDU2CAREER_DB';

// Twilio credentials (replace with env variables in production)
const twilioClient = twilio('your_account_sid', 'your_auth_token');
const twilioPhoneNumber = '+1234567890'; // Your Twilio phone number

app.get('/api/colleges', async (c) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const colleges = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return c.json(colleges);
  } catch (error) {
    return c.json({ error: 'Failed to fetch colleges' }, 500);
  }
});

app.get('/api/colleges/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) {
      return c.json({ error: 'College not found' }, 404);
    }
    return c.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    return c.json({ error: 'Failed to fetch college' }, 500);
  }
});

app.post('/api/send-sms', async (c) => {
  try {
    const { to, message } = await c.req.json();
    const sms = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });
    return c.json({ success: true, sid: sms.sid });
  } catch (error) {
    return c.json({ error: 'Failed to send SMS' }, 500);
  }
});

export default app;
