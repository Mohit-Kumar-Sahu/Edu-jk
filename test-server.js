const http = require('http');
const fs = require('fs');
const path = require('path');

// Load the career quiz model
let careerQuizModel = null;
try {
  const modelData = fs.readFileSync('career_quiz_model.json', 'utf8');
  careerQuizModel = JSON.parse(modelData);
  console.log(`✅ Career quiz model loaded with ${careerQuizModel.questions.length} questions`);
} catch (error) {
  console.error('❌ Failed to load career quiz model:', error.message);
  process.exit(1);
}

// Helper functions
function calculateRIASECScores(selectedOptions, questions) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  selectedOptions.forEach(optionId => {
    for (const question of questions) {
      const option = question.options.find(opt => opt.id === optionId);
      if (option) {
        Object.keys(scores).forEach(riasecType => {
          scores[riasecType] += option.scores[riasecType] || 0;
        });
        break;
      }
    }
  });
  
  return scores;
}

function getCareerRecommendations(riasecScores, careerMappings, topN = 5) {
  const sortedScores = Object.entries(riasecScores)
    .sort(([,a], [,b]) => b - a);
  
  const recommendations = [];
  const maxScore = Math.max(...Object.values(riasecScores));
  
  sortedScores.forEach(([riasecType, score]) => {
    if (score > 0 && careerMappings[riasecType]) {
      const careerInfo = careerMappings[riasecType];
      careerInfo.careers.slice(0, 3).forEach(career => {
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

// Create HTTP server
const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // GET /api/career-questions
  if (req.method === 'GET' && url.pathname === '/api/career-questions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      questions: careerQuizModel.questions,
      model_info: careerQuizModel.model_info
    }));
    return;
  }
  
  // POST /api/career-recommendations
  if (req.method === 'POST' && url.pathname === '/api/career-recommendations') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { answers } = JSON.parse(body);
        
        if (!answers || !Array.isArray(answers)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid answers format' }));
          return;
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
        const personalityProfile = {};
        
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
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          recommendations: recommendations.map(rec => rec.career),
          detailed_recommendations: recommendations,
          aptitude: riasecScores,
          personality_profile: personalityProfile,
          quiz_completed_at: new Date().toISOString()
        }));
        
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to process career recommendations' }));
      }
    });
    return;
  }
  
  // GET /api/career-info/:career
  if (req.method === 'GET' && url.pathname.startsWith('/api/career-info/')) {
    const careerName = decodeURIComponent(url.pathname.split('/').pop());
    
    // Find which RIASEC type this career belongs to
    let careerInfo = null;
    let riasecType = null;
    
    for (const [type, info] of Object.entries(careerQuizModel.riasec_careers)) {
      if (info.careers.includes(careerName)) {
        careerInfo = info;
        riasecType = type;
        break;
      }
    }
    
    if (!careerInfo) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Career not found' }));
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      career: careerName,
      riasec_type: riasecType,
      type_info: careerInfo,
      related_careers: careerInfo.careers.filter(c => c !== careerName)
    }));
    return;
  }
  
  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📊 Model info: ${careerQuizModel.model_info.total_questions} questions, version ${careerQuizModel.model_info.version}`);
  console.log(`🎯 RIASEC distribution:`, careerQuizModel.model_info.riasec_distribution);
});
