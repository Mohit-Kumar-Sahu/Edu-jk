const { Hono } = require('hono');
const { serve } = require('@hono/node-server');
const { MongoClient, ObjectId } = require('mongodb');
const { getQuestions, calculateRIASEC, getCareerRecommendations, analyzeAptitude, getSkillGapCourses } = require('./ml-model');
const { getCourseRecommendations } = require('./course-recommendations');

const app = new Hono();

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'EDU2CAREER';
const collectionName = 'EDU2CAREER_DB';

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

app.get('/api/colleges', async (c) => {
  try {
    const collection = await connectToDB();
    const colleges = await collection.find({}).toArray();
    return c.json(colleges);
  } catch (error) {
    return c.json({ error: 'Failed to fetch colleges' }, 500);
  }
});

app.get('/api/colleges/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const collection = await connectToDB();
    const college = await collection.findOne({ _id: new ObjectId(id) });
    if (!college) {
      return c.json({ error: 'College not found' }, 404);
    }
    return c.json(college);
  } catch (error) {
    return c.json({ error: 'Failed to fetch college' }, 500);
  }
});

app.post('/api/users', async (c) => {
  try {
    const userData = await c.req.json();
    const collection = await connectToDB();
    const result = await collection.insertOne(userData);
    return c.json({ success: true, id: result.insertedId });
  } catch (error) {
    return c.json({ error: 'Failed to store user data' }, 500);
  }
});

app.get('/api/users/:uid', async (c) => {
  try {
    const uid = c.req.param('uid');
    const collection = await connectToDB();
    const user = await collection.findOne({ uid });
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json(user);
  } catch (error) {
    return c.json({ error: 'Failed to fetch user data' }, 500);
  }
});

app.put('/api/users/:uid', async (c) => {
  try {
    const uid = c.req.param('uid');
    const updateData = await c.req.json();
    const collection = await connectToDB();
    const result = await collection.updateOne(
      { uid },
      { $set: updateData },
      { upsert: true }
    );
    return c.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    return c.json({ error: 'Failed to update user data' }, 500);
  }
});

app.post('/api/quiz-results', async (c) => {
  try {
    const quizData = await c.req.json();
    const collection = await connectToDB();
    const result = await collection.insertOne({
      ...quizData,
      timestamp: new Date()
    });
    return c.json({ success: true, id: result.insertedId });
  } catch (error) {
    return c.json({ error: 'Failed to store quiz results' }, 500);
  }
});

app.get('/api/quiz-results/:uid', async (c) => {
  try {
    const uid = c.req.param('uid');
    const collection = await connectToDB();
    const results = await collection.find({ uid }).sort({ timestamp: -1 }).toArray();
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch quiz results' }, 500);
  }
});

app.post('/api/personalized-suggestions', async (c) => {
  try {
    const { uid, quizResults, userProfile } = await c.req.json();
    if (!quizResults || !userProfile) {
      return c.json({ error: 'Quiz results and user profile required' }, 400);
    }

    // Generate suggestions based on quiz results and profile
    const suggestions = generatePersonalizedSuggestions(quizResults, userProfile);

    return c.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return c.json({ error: 'Failed to generate suggestions' }, 500);
  }
});

app.post('/api/skill-gap-courses', async (c) => {
  try {
    const { userProfile, quizResults } = await c.req.json();
    if (!userProfile || !quizResults) {
      return c.json({ error: 'User profile and quiz results required' }, 400);
    }

    // Get skill gap course recommendations
    const skillGapCourses = getSkillGapCourses(userProfile, quizResults);

    return c.json({ skillGapCourses });
  } catch (error) {
    console.error('Error generating skill gap courses:', error);
    return c.json({ error: 'Failed to generate skill gap courses' }, 500);
  }
});

// New endpoint to get career recommendations based on quiz answers
app.post('/api/career-recommendations', async (c) => {
  try {
    const { answers } = await c.req.json();
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return c.json({ error: 'Invalid answers format' }, 400);
    }

    // Calculate RIASEC scores
    const riasecScores = calculateRIASEC(answers);

    // Get recommendations from ML model
    const recommendations = getCareerRecommendations(riasecScores);
    const aptitude = analyzeAptitude(riasecScores);

    return c.json({ recommendations, aptitude });
  } catch (error) {
    console.error('Error in /api/career-recommendations:', error);
    return c.json({ error: 'Failed to get career recommendations' }, 500);
  }
});

app.get('/api/career-questions', async (c) => {
  try {
    const questions = getQuestions();
    return c.json({ questions });
  } catch (error) {
    console.error('Error in /api/career-questions:', error);
    return c.json({ error: 'Failed to get career questions' }, 500);
  }
});

// Achievement endpoints
app.get('/api/achievements/user/:uid', async (c) => {
  try {
    const uid = c.req.param('uid');
    const collection = await connectToDB();
    const user = await collection.findOne({ uid });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const achievements = user.achievements || [];
    return c.json(achievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return c.json({ error: 'Failed to fetch achievements' }, 500);
  }
});

app.post('/api/achievements/user/:uid/add', async (c) => {
  try {
    const uid = c.req.param('uid');
    const achievement = await c.req.json();
    const collection = await connectToDB();

    // Add achievement to user's achievements array
    const result = await collection.updateOne(
      { uid },
      {
        $push: { achievements: { ...achievement, earnedAt: new Date() } },
        $inc: { totalPoints: achievement.points || 0 }
      },
      { upsert: true }
    );

    return c.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Error adding achievement:', error);
    return c.json({ error: 'Failed to add achievement' }, 500);
  }
});

app.post('/api/achievements/user/:uid/points', async (c) => {
  try {
    const uid = c.req.param('uid');
    const { points } = await c.req.json();
    const collection = await connectToDB();

    const result = await collection.updateOne(
      { uid },
      { $inc: { totalPoints: points } },
      { upsert: true }
    );

    return c.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Error updating points:', error);
    return c.json({ error: 'Failed to update points' }, 500);
  }
});

app.get('/api/achievements/leaderboard', async (c) => {
  try {
    const collection = await connectToDB();
    const users = await collection
      .find({ totalPoints: { $exists: true } })
      .sort({ totalPoints: -1 })
      .limit(50)
      .toArray();

    const leaderboard = users.map((user, index) => ({
      userId: user.uid,
      name: user.name || 'Anonymous',
      points: user.totalPoints || 0,
      achievements: user.achievements ? user.achievements.length : 0,
      rank: index + 1
    }));

    return c.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return c.json({ error: 'Failed to fetch leaderboard' }, 500);
  }
});

// College Comparison endpoints
app.get('/api/colleges/compare', async (c) => {
  try {
    const ids = c.req.query('ids')?.split(',') || [];
    if (ids.length === 0 || ids.length > 4) {
      return c.json({ error: 'Please provide 1-4 college IDs' }, 400);
    }

    const collection = await connectToDB();
    const objectIds = ids.map(id => new ObjectId(id));
    const colleges = await collection.find({ _id: { $in: objectIds } }).toArray();

    // Add comparison metrics to each college
    const collegesWithMetrics = colleges.map(college => ({
      ...college,
      comparisonMetrics: {
        studentFacultyRatio: college.facultyCount && college.totalSeats ?
          (college.totalSeats / college.facultyCount).toFixed(1) : 'N/A',
        facilitiesScore: calculateFacilitiesScore(college.facilities || []),
        accreditationScore: getAccreditationScore(college.naacGrade),
        locationScore: calculateLocationScore(college.District),
        courseDiversity: (college.streams || []).length,
        totalScore: 0 // Will be calculated below
      }
    }));

    // Calculate total comparison score for each college
    collegesWithMetrics.forEach(college => {
      const metrics = college.comparisonMetrics;
      metrics.totalScore = calculateTotalScore(metrics);
    });

    return c.json(collegesWithMetrics);
  } catch (error) {
    console.error('Error comparing colleges:', error);
    return c.json({ error: 'Failed to compare colleges' }, 500);
  }
});

app.post('/api/comparisons/save', async (c) => {
  try {
    const { userId, name, collegeIds, criteria } = await c.req.json();
    const collection = await connectToDB();

    const comparison = {
      userId,
      name,
      collegeIds,
      criteria,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(comparison);
    return c.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error saving comparison:', error);
    return c.json({ error: 'Failed to save comparison' }, 500);
  }
});

app.get('/api/comparisons/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const collection = await connectToDB();
    const comparisons = await collection
      .find({ userId })
      .sort({ updatedAt: -1 })
      .toArray();

    return c.json(comparisons);
  } catch (error) {
    console.error('Error fetching comparisons:', error);
    return c.json({ error: 'Failed to fetch comparisons' }, 500);
  }
});

app.delete('/api/comparisons/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const collection = await connectToDB();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return c.json({ error: 'Comparison not found' }, 404);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting comparison:', error);
    return c.json({ error: 'Failed to delete comparison' }, 500);
  }
});

// Helper functions for comparison calculations
function calculateFacilitiesScore(facilities) {
  const facilityPoints = {
    'Library': 10,
    'Computer Lab': 8,
    'Sports Facilities': 6,
    'Hostel': 8,
    'Cafeteria': 4,
    'Medical Facilities': 6,
    'WiFi': 5,
    'Auditorium': 4
  };

  return facilities.reduce((score, facility) => {
    return score + (facilityPoints[facility] || 2);
  }, 0);
}

function getAccreditationScore(naacGrade) {
  const scores = { 'A++': 100, 'A+': 90, 'A': 80, 'B++': 70, 'B+': 60, 'B': 50, 'C': 30 };
  return scores[naacGrade] || 0;
}

function calculateLocationScore(district) {
  // Higher scores for districts with better infrastructure/connectivity
  const premiumDistricts = ['Srinagar', 'Jammu'];
  const goodDistricts = ['Baramulla', 'Anantnag', 'Budgam', 'Pulwama'];

  if (premiumDistricts.includes(district)) return 90;
  if (goodDistricts.includes(district)) return 70;
  return 50;
}

function calculateTotalScore(metrics) {
  // Weighted scoring system
  const weights = {
    studentFacultyRatio: 0.25,
    facilitiesScore: 0.20,
    accreditationScore: 0.25,
    locationScore: 0.15,
    courseDiversity: 0.15
  };

  // Normalize student-faculty ratio (lower is better, max score for ratio <= 15)
  const ratioScore = metrics.studentFacultyRatio !== 'N/A' ?
    Math.max(0, 100 - (parseFloat(metrics.studentFacultyRatio) - 15) * 5) : 50;

  const totalScore =
    (ratioScore * weights.studentFacultyRatio) +
    (Math.min(metrics.facilitiesScore, 100) * weights.facilitiesScore) +
    (metrics.accreditationScore * weights.accreditationScore) +
    (metrics.locationScore * weights.locationScore) +
    ((metrics.courseDiversity / 5) * 100 * weights.courseDiversity);

  return Math.round(totalScore);
}

serve({
  fetch: app.fetch,
  port: 3001,
});
