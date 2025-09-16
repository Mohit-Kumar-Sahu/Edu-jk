// Course recommendation system for EduPath Navigator
// Maps careers to required skills and recommends courses

// Career to skills mapping
const careerSkillsMap = {
  'Data Scientist': [
    'Python', 'Machine Learning', 'Statistics', 'Data Analysis',
    'SQL', 'R Programming', 'Deep Learning', 'Data Visualization'
  ],
  'Software Developer': [
    'JavaScript', 'Python', 'Java', 'C++', 'Web Development',
    'Database Management', 'Version Control', 'Algorithms'
  ],
  'Doctor': [
    'Biology', 'Chemistry', 'Anatomy', 'Physiology',
    'Medical Terminology', 'Patient Care', 'Clinical Skills'
  ],
  'Teacher': [
    'Education Psychology', 'Curriculum Development', 'Classroom Management',
    'Subject Expertise', 'Communication Skills', 'Assessment Methods'
  ],
  'Engineer': [
    'Mathematics', 'Physics', 'CAD Software', 'Project Management',
    'Technical Drawing', 'Problem Solving', 'Engineering Ethics'
  ],
  'Business Analyst': [
    'Business Intelligence', 'Data Analysis', 'Excel', 'SQL',
    'Requirements Gathering', 'Process Modeling', 'Presentation Skills'
  ],
  'Graphic Designer': [
    'Adobe Creative Suite', 'Typography', 'Color Theory', 'UI/UX Design',
    'Digital Illustration', 'Branding', 'Visual Communication'
  ],
  'Marketing Manager': [
    'Digital Marketing', 'SEO', 'Social Media Marketing', 'Content Creation',
    'Market Research', 'Brand Management', 'Analytics'
  ],
  'Accountant': [
    'Financial Accounting', 'Taxation', 'Auditing', 'Financial Analysis',
    'Excel', 'Bookkeeping', 'Financial Reporting'
  ],
  'Lawyer': [
    'Legal Research', 'Contract Law', 'Criminal Law', 'Civil Law',
    'Legal Writing', 'Court Procedures', 'Ethics'
  ]
};

// Course database with platform integrations
const coursesDatabase = [
  // Python courses
  {
    id: 'python-basics-swayam',
    title: 'Programming in Python',
    platform: 'SWAYAM',
    provider: 'IIT Madras',
    skill: 'Python',
    level: 'Beginner',
    duration: '8 weeks',
    url: 'https://swayam.gov.in/course/1234',
    description: 'Learn Python programming fundamentals',
    free: true
  },
  {
    id: 'python-ml-coursera',
    title: 'Python for Data Science',
    platform: 'Coursera',
    provider: 'IBM',
    skill: 'Python',
    level: 'Intermediate',
    duration: '6 weeks',
    url: 'https://coursera.org/learn/python-for-data-science',
    description: 'Python programming for data science applications',
    free: true
  },
  // Machine Learning courses
  {
    id: 'ml-basics-coursera',
    title: 'Machine Learning by Andrew Ng',
    platform: 'Coursera',
    provider: 'Stanford University',
    skill: 'Machine Learning',
    level: 'Intermediate',
    duration: '11 weeks',
    url: 'https://coursera.org/learn/machine-learning',
    description: 'Comprehensive machine learning course',
    free: true
  },
  {
    id: 'ml-nptel',
    title: 'Introduction to Machine Learning',
    platform: 'NPTEL',
    provider: 'IIT Kharagpur',
    skill: 'Machine Learning',
    level: 'Advanced',
    duration: '12 weeks',
    url: 'https://nptel.ac.in/courses/1234',
    description: 'Advanced machine learning concepts',
    free: true
  },
  // Web Development courses
  {
    id: 'web-dev-coursera',
    title: 'Web Development Fundamentals',
    platform: 'Coursera',
    provider: 'University of Michigan',
    skill: 'Web Development',
    level: 'Beginner',
    duration: '4 weeks',
    url: 'https://coursera.org/learn/web-development',
    description: 'Learn HTML, CSS, and JavaScript',
    free: true
  },
  // Statistics courses
  {
    id: 'statistics-swayam',
    title: 'Basic Statistics',
    platform: 'SWAYAM',
    provider: 'IIT Bombay',
    skill: 'Statistics',
    level: 'Beginner',
    duration: '8 weeks',
    url: 'https://swayam.gov.in/course/5678',
    description: 'Fundamental concepts in statistics',
    free: true
  },
  // SQL courses
  {
    id: 'sql-coursera',
    title: 'Learn SQL Basics',
    platform: 'Coursera',
    provider: 'UC Davis',
    skill: 'SQL',
    level: 'Beginner',
    duration: '2 weeks',
    url: 'https://coursera.org/learn/sql-basics',
    description: 'Database querying with SQL',
    free: true
  },
  // JavaScript courses
  {
    id: 'javascript-coursera',
    title: 'JavaScript Programming',
    platform: 'Coursera',
    provider: 'Meta',
    skill: 'JavaScript',
    level: 'Beginner',
    duration: '6 weeks',
    url: 'https://coursera.org/learn/javascript',
    description: 'Modern JavaScript programming',
    free: true
  },
  // Business Intelligence
  {
    id: 'bi-coursera',
    title: 'Business Intelligence',
    platform: 'Coursera',
    provider: 'University of Colorado',
    skill: 'Business Intelligence',
    level: 'Intermediate',
    duration: '4 weeks',
    url: 'https://coursera.org/learn/business-intelligence',
    description: 'Business intelligence and analytics',
    free: true
  },
  // Digital Marketing
  {
    id: 'digital-marketing-coursera',
    title: 'Digital Marketing Specialization',
    platform: 'Coursera',
    provider: 'University of Illinois',
    skill: 'Digital Marketing',
    level: 'Beginner',
    duration: '6 months',
    url: 'https://coursera.org/specializations/digital-marketing',
    description: 'Complete digital marketing course',
    free: false
  }
];

// Get course recommendations based on career and current skills
function getCourseRecommendations(career, currentSkills = []) {
  const requiredSkills = careerSkillsMap[career] || [];
  const missingSkills = requiredSkills.filter(skill => !currentSkills.includes(skill));

  if (missingSkills.length === 0) {
    return {
      message: 'You already have the required skills for this career!',
      courses: [],
      career,
      requiredSkills,
      missingSkills: []
    };
  }

  // Find courses for missing skills
  const recommendedCourses = [];
  const skillPriority = ['Beginner', 'Intermediate', 'Advanced'];

  missingSkills.forEach(skill => {
    const skillCourses = coursesDatabase.filter(course => course.skill === skill);

    if (skillCourses.length > 0) {
      // Sort by level (beginner first) and add top 2 courses per skill
      const sortedCourses = skillCourses.sort((a, b) => {
        return skillPriority.indexOf(a.level) - skillPriority.indexOf(b.level);
      });

      recommendedCourses.push(...sortedCourses.slice(0, 2));
    }
  });

  // Remove duplicates and limit to top 6 recommendations
  const uniqueCourses = recommendedCourses.filter((course, index, self) =>
    index === self.findIndex(c => c.id === course.id)
  ).slice(0, 6);

  return {
    career,
    requiredSkills,
    missingSkills,
    courses: uniqueCourses,
    totalCourses: uniqueCourses.length
  };
}

// Get all courses for a specific skill
function getCoursesBySkill(skill) {
  return coursesDatabase.filter(course => course.skill === skill);
}

// Get courses by platform
function getCoursesByPlatform(platform) {
  return coursesDatabase.filter(course => course.platform === platform);
}

// Get courses by level
function getCoursesByLevel(level) {
  return coursesDatabase.filter(course => course.level === level);
}

module.exports = {
  getCourseRecommendations,
  getCoursesBySkill,
  getCoursesByPlatform,
  getCoursesByLevel,
  careerSkillsMap,
  coursesDatabase
};
