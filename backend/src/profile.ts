import { Hono } from 'hono';
import { Collection, MongoClient } from 'mongodb';
import { authMiddleware } from './middleware/auth';

type Variables = {
  uid: string; // 👈 tell Hono that c.get("uid") will return a string
};

const profile = new Hono<{ Variables: Variables }>();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'EDU2CAREER';
const USERS_COLLECTION = 'users';
let usersCollection: Collection;

(async function() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  usersCollection = db.collection(USERS_COLLECTION);
})();

// --- Get My Profile ---
profile.get('/me', authMiddleware, async (c) => {
  const firebaseUid = c.get('uid'); // ✅ now recognized as string
  const user = await usersCollection.findOne({ firebaseUid });

  if (!user) {
    return c.json({ error: 'User profile not found' }, 404);
  }
  return c.json(user);
});

// --- Update My Profile ---
profile.put('/me', authMiddleware, async (c) => {
  const firebaseUid = c.get('uid'); // ✅ no TS error
  const updateData = await c.req.json();

  delete updateData._id;
  delete updateData.firebaseUid;
  delete updateData.email;

  await usersCollection.updateOne({ firebaseUid }, { $set: updateData });

  const updatedUser = await usersCollection.findOne({ firebaseUid });
  return c.json({ success: true, user: updatedUser });
});

export default profile;