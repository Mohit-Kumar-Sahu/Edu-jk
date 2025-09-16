// RIASEC-based ML model for career recommendations
// Loads questions from CSV and uses RIASEC scoring

const fs = require('fs');
const path = require('path');
const { getCourseRecommendations } = require('./course-recommendations');

// Load and parse CSV data

let questions = [];
let riasecScores = {};

function loadCSVData() {
  try {
    const csvData = fs.readFileSync(csvPath, 'utf8');
    const lines = csvData.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    
    const questionMap = {};
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      
      const qId = row.questionId;
      if (!questionMap[qId]) {
        questionMap[qId] = {
          id: qId,
          text: row.questionText,
          category: row.category,
          options: []
        };
      }
      questionMap[qId].options.push({
        id: row.optionId,
        text: row.optionText,
        scores: {
          R: parseInt(row.R) || 0,
          I: parseInt(row.I) || 0,
          A: parseInt(row.A) || 0,
          S: parseInt(row.S) || 0,
          E: parseInt(row.E) || 0,
          C: parseInt(row.C) || 0
        }
      });
    }
    
    questions = Object.values(questionMap);
    console.log(`Loaded ${questions.length} questions from CSV`);
  } catch (error) {
    console.error('Error loading CSV:', error);
    // Fallback to empty array
    questions = [];
  }
}

// RIASEC Career Mapping Database
const riasecCareers = {
  R: ["Mechanic", "Engineer", "Architect", "Farmer", "Pilot"],
  I: ["Scientist", "Researcher", "Doctor", "Programmer", "Analyst"],
  A: ["Artist", "Designer", "Writer", "Musician", "Photographer"],
  S: ["Teacher", "Counselor", "Nurse", "Social Worker", "Therapist"],
  E: ["Salesperson", "Manager", "Entrepreneur", "Lawyer", "Politician"],
  C: ["Accountant", "Banker", "Office Manager", "Librarian", "Auditor"]
};

// Load data on module load
loadCSVData();

const careerDatabase = {
  "Mathematics & Science": {
    "Independently": {
      "Laboratory": {
        "High salary": ["Data Scientist", "Research Scientist", "AI Engineer"],
        "Helping others": ["Medical Researcher", "Environmental Scientist"],
        "Creativity": ["Bioinformatics Specialist", "Forensic Scientist"],
        "Innovation": ["R&D Engineer", "Quantum Physicist"]
      },
      "Office setting": {
        "High salary": ["Quantitative Analyst", "Financial Engineer"],
        "Helping others": ["Public Health Analyst", "Epidemiologist"],
        "Creativity": ["Data Visualization Expert", "UX Researcher"],
        "Innovation": ["Machine Learning Engineer", "Blockchain Developer"]
      }
    },
    "In a team": {
      "Laboratory": {
        "High salary": ["Pharmaceutical Researcher", "Clinical Trial Manager"],
        "Helping others": ["Healthcare Administrator", "Community Health Worker"],
        "Creativity": ["Product Development Scientist", "Innovation Lab Manager"],
        "Innovation": ["Tech Startup Founder", "Research Team Lead"]
      },
      "Office setting": {
        "High salary": ["Management Consultant", "Strategy Analyst"],
        "Helping others": ["Policy Analyst", "Education Consultant"],
        "Creativity": ["Content Strategist", "Digital Marketing Analyst"],
        "Innovation": ["Product Manager", "Business Intelligence Analyst"]
      }
    }
  },
  "Arts & Literature": {
    "Independently": {
      "Creative studio": {
        "High salary": ["Art Director", "Creative Director"],
        "Helping others": ["Art Therapist", "Community Arts Coordinator"],
        "Creativity": ["Graphic Designer", "Illustrator"],
        "Innovation": ["Digital Artist", "Multimedia Designer"]
      },
      "Office setting": {
        "High salary": ["Brand Manager", "Marketing Director"],
        "Helping others": ["Content Creator", "Educational Writer"],
        "Creativity": ["Copywriter", "Journalist"],
        "Innovation": ["Social Media Strategist", "Content Marketing Manager"]
      }
    },
    "In a team": {
      "Creative studio": {
        "High salary": ["Film Producer", "Advertising Executive"],
        "Helping others": ["Arts Educator", "Cultural Program Manager"],
        "Creativity": ["Set Designer", "Fashion Designer"],
        "Innovation": ["Media Producer", "Interactive Media Designer"]
      },
      "Office setting": {
        "High salary": ["Public Relations Manager", "Communications Director"],
        "Helping others": ["Non-profit Communications", "Community Outreach Coordinator"],
        "Creativity": ["Event Planner", "Marketing Coordinator"],
        "Innovation": ["Digital Content Manager", "Social Entrepreneur"]
      }
    }
  },
  "Business & Economics": {
    "Leading others": {
      "Office setting": {
        "High salary": ["CEO", "Investment Banker"],
        "Helping others": ["Non-profit Director", "Community Development Manager"],
        "Creativity": ["Entrepreneur", "Business Consultant"],
        "Innovation": ["Startup Founder", "Venture Capitalist"]
      }
    },
    "In a team": {
      "Office setting": {
        "High salary": ["Financial Advisor", "Corporate Lawyer"],
        "Helping others": ["HR Manager", "Social Worker"],
        "Creativity": ["Business Analyst", "Project Manager"],
        "Innovation": ["Product Manager", "Strategy Consultant"]
      }
    }
  },
  "Technology & Computers": {
    "Independently": {
      "Office setting": {
        "High salary": ["Software Architect", "Cybersecurity Expert"],
        "Helping others": ["IT Support Specialist", "Technical Trainer"],
        "Creativity": ["Game Developer", "UI/UX Designer"],
        "Innovation": ["AI Researcher", "Blockchain Developer"]
      }
    },
    "In a team": {
      "Office setting": {
        "High salary": ["Tech Lead", "DevOps Engineer"],
        "Helping others": ["Technical Support Manager", "IT Project Manager"],
        "Creativity": ["Full Stack Developer", "Mobile App Developer"],
        "Innovation": ["Product Engineer", "Innovation Engineer"]
      }
    }
  }
};

function getQuestions() {
  return questions;
}

function calculateRIASEC(answers) {
  // answers: array of selected optionIds
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  answers.forEach(optionId => {
    // Find the option in questions
    for (const question of questions) {
      const option = question.options.find(opt => opt.id === optionId);
      if (option) {
        scores.R += option.scores.R;
        scores.I += option.scores.I;
        scores.A += option.scores.A;
        scores.S += option.scores.S;
        scores.E += option.scores.E;
        scores.C += option.scores.C;
        break;
      }
    }
  });
  
  return scores;
}

function getCareerRecommendations(riasecScores) {
  // riasecScores: { R, I, A, S, E, C }
  const recommendations = [];
  
  // Find the highest RIASEC scores
  const sortedRIASEC = Object.entries(riasecScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2); // Top 2
  
  sortedRIASEC.forEach(([type, score]) => {
    if (score > 0 && riasecCareers[type]) {
      recommendations.push(...riasecCareers[type]);
    }
  });
  
  // If no recommendations, fallback
  if (recommendations.length === 0) {
    return ["Software Engineer", "Data Analyst", "Product Manager"];
  }
  
  return recommendations.slice(0, 5); // Return top 5
}

function analyzeAptitude(riasecScores) {
  // Return RIASEC scores as aptitude
  return riasecScores;
}

function getSkillGapCourses(userProfile, quizResults) {
  // userProfile: { skills: [], ... }
  // quizResults: { riasecScores: {}, ... }

  const currentSkills = userProfile.skills || [];
  const riasecScores = quizResults.riasecScores || {};

  // Get top careers based on RIASEC
  const topCareers = getCareerRecommendations(riasecScores);

  const skillGapRecommendations = [];

  topCareers.forEach(career => {
    const courseRec = getCourseRecommendations(career, currentSkills);
    if (courseRec.courses.length > 0) {
      skillGapRecommendations.push({
        career,
        ...courseRec
      });
    }
  });

  return {
    userSkills: currentSkills,
    topCareers,
    recommendations: skillGapRecommendations
  };
}

module.exports = {
  getQuestions,
  calculateRIASEC,
  getCareerRecommendations,
  analyzeAptitude,
  getCourseRecommendations,
  getSkillGapCourses
};
