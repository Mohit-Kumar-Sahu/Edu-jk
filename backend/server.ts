import { Hono } from 'hono';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase-service-account.json';
import achievements from './achievements-backend';
import userManagement from './user-management';
import twilio from 'twilio';
import * as fs from 'fs';
import * as path from 'path';

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

// Load career quiz model data
let careerQuizModel: any = null;
try {
  const modelPath = path.join(__dirname, '../career_quiz_model_30.json');
  const modelData = fs.readFileSync(modelPath, 'utf8');
  careerQuizModel = JSON.parse(modelData);
  console.log(`Career quiz model loaded with ${careerQuizModel.questions.length} questions`);
} catch (error) {
  console.error('Failed to load career quiz model:', error);
  // Fallback to original model
  try {
    const fallbackPath = path.join(__dirname, '../career_quiz_model.json');
    const fallbackData = fs.readFileSync(fallbackPath, 'utf8');
    careerQuizModel = JSON.parse(fallbackData);
    console.log(`Fallback career quiz model loaded with ${careerQuizModel.questions.length} questions`);
  } catch (fallbackError) {
    console.error('Failed to load fallback career quiz model:', fallbackError);
  }
}

// Career Quiz Helper Functions
function calculateRIASECScores(selectedOptions: string[], questions: any[]): Record<string, number> {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  selectedOptions.forEach(optionId => {
    for (const question of questions) {
      const option = question.options.find((opt: any) => opt.id === optionId);
      if (option) {
        Object.keys(scores).forEach(riasecType => {
          scores[riasecType as keyof typeof scores] += option.scores[riasecType] || 0;
        });
        break;
      }
    }
  });
  
  return scores;
}

function getCareerRecommendations(riasecScores: Record<string, number>, careerMappings: any, topN = 5) {
  const sortedScores = Object.entries(riasecScores)
    .sort(([,a], [,b]) => b - a);
  
  const recommendations: any[] = [];
  const maxScore = Math.max(...Object.values(riasecScores));
  
  sortedScores.forEach(([riasecType, score]) => {
    if (score > 0 && careerMappings[riasecType]) {
      const careerInfo = careerMappings[riasecType];
      careerInfo.careers.slice(0, 3).forEach((career: string) => {
        if (!recommendations.find(r => r.career === career)) {
          recommendations.push({
            career,
            riasecType,
            typeName: careerInfo.name,
            description: careerInfo.description,
            score,
            matchPercentage: maxScore > 0 ? Math.min(100, (score / maxScore) * 100) : 0
          });
        }
      });
    }
  });
  
  return recommendations.slice(0, topN);
}

// Career Quiz API Endpoints
app.get('/api/career-questions', async (c) => {
  try {
    if (!careerQuizModel) {
      return c.json({ error: 'Career quiz model not loaded' }, 500);
    }
    
    return c.json({
      questions: careerQuizModel.questions,
      model_info: careerQuizModel.model_info
    });
  } catch (error) {
    console.error('Error fetching career questions:', error);
    return c.json({ error: 'Failed to fetch career questions' }, 500);
  }
});

app.post('/api/career-recommendations', async (c) => {
  try {
    if (!careerQuizModel) {
      return c.json({ error: 'Career quiz model not loaded' }, 500);
    }
    
    const { answers } = await c.req.json();
    
    if (!answers || !Array.isArray(answers)) {
      return c.json({ error: 'Invalid answers format' }, 400);
    }
    
    // Calculate RIASEC scores
    const riasecScores = calculateRIASECScores(answers, careerQuizModel.questions);
    
    // Get career recommendations
    const recommendations = getCareerRecommendations(
      riasecScores, 
      careerQuizModel.riasec_careers, 
      5
    );
    
    // Calculate personality profile
    const totalScore = Object.values(riasecScores).reduce((sum, score) => sum + score, 0);
    const personalityProfile: Record<string, any> = {};
    
    if (totalScore > 0) {
      Object.entries(riasecScores).forEach(([riasecType, score]) => {
        const percentage = (score / totalScore) * 100;
        personalityProfile[riasecType] = {
          score,
          percentage: Math.round(percentage * 10) / 10,
          name: careerQuizModel.riasec_careers[riasecType]?.name || riasecType,
          description: careerQuizModel.riasec_careers[riasecType]?.description || ''
        };
      });
    }
    
    return c.json({
      recommendations: recommendations.map(rec => rec.career),
      detailed_recommendations: recommendations,
      aptitude: riasecScores,
      personality_profile: personalityProfile,
      quiz_completed_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing career recommendations:', error);
    return c.json({ error: 'Failed to process career recommendations' }, 500);
  }
});

// Get detailed career information
app.get('/api/career-info/:career', async (c) => {
  try {
    if (!careerQuizModel) {
      return c.json({ error: 'Career quiz model not loaded' }, 500);
    }
    
    const careerName = c.req.param('career');
    
    // Find which RIASEC type this career belongs to
    let careerInfo = null;
    let riasecType = null;
    
    for (const [type, info] of Object.entries(careerQuizModel.riasec_careers)) {
      if ((info as any).careers.includes(careerName)) {
        careerInfo = info;
        riasecType = type;
        break;
      }
    }
    
    if (!careerInfo) {
      return c.json({ error: 'Career not found' }, 404);
    }
    
    return c.json({
      career: careerName,
      riasec_type: riasecType,
      type_info: careerInfo,
      related_careers: (careerInfo as any).careers.filter((c: string) => c !== careerName)
    });
    
  } catch (error) {
    console.error('Error fetching career info:', error);
    return c.json({ error: 'Failed to fetch career information' }, 500);
  }
});

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

// Use achievements routes
app.route('/api/achievements', achievements);

// Use user management routes
app.route('/api', userManagement);

export default app;
