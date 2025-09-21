import { Hono } from 'hono';
import { admin } from './src/firebase-admin'; // <-- The Fix!

const achievements = new Hono();

// Initialize Firebase Admin (assuming it's initialized in main server)
const db = admin.firestore();
const achievementsCollection = 'user_achievements';
const usersCollection = 'users';

achievements.get('/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const snapshot = await db.collection(achievementsCollection)
      .where('userId', '==', userId)
      .orderBy('earnedAt', 'desc')
      .get();

    const achievements = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return c.json(achievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return c.json({ error: 'Failed to fetch achievements' }, 500);
  }
});

achievements.get('/leaderboard', async (c) => {
  try {
    const snapshot = await db.collection(usersCollection)
      .orderBy('totalPoints', 'desc')
      .limit(50)
      .get();

    const leaderboard = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return c.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return c.json({ error: 'Failed to fetch leaderboard' }, 500);
  }
});

achievements.post('/user/:userId/add', async (c) => {
  try {
    const userId = c.req.param('userId');
    const achievement = await c.req.json();

    // Add achievement
    const achievementRef = await db.collection(achievementsCollection).add({
      userId,
      ...achievement,
      earnedAt: new Date().toISOString()
    });

    // Update user points
    const userRef = db.collection(usersCollection).doc(userId);
    const userDoc = await userRef.get();
    const currentPoints = userDoc.exists ? userDoc.data()?.totalPoints || 0 : 0;
    await userRef.set({
      totalPoints: currentPoints + achievement.points
    }, { merge: true });

    return c.json({ success: true, id: achievementRef.id });
  } catch (error) {
    console.error('Error adding achievement:', error);
    return c.json({ error: 'Failed to add achievement' }, 500);
  }
});

achievements.post('/user/:userId/points', async (c) => {
  try {
    const userId = c.req.param('userId');
    const { points } = await c.req.json();

    const userRef = db.collection(usersCollection).doc(userId);
    const userDoc = await userRef.get();
    const currentPoints = userDoc.exists ? userDoc.data()?.totalPoints || 0 : 0;

    await userRef.set({
      totalPoints: currentPoints + points
    }, { merge: true });

    return c.json({ success: true, newTotal: currentPoints + points });
  } catch (error) {
    console.error('Error updating points:', error);
    return c.json({ error: 'Failed to update points' }, 500);
  }
});

export default achievements;
