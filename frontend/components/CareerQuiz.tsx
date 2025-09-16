import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Brain, Lightbulb, Users, Briefcase, Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface QuizProps {
  onComplete: (results: any) => void;
}

export function CareerQuiz({ onComplete }: QuizProps) {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const sections = [
    {
      title: "Interest Assessment",
      subtitle: "RIASEC Model",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-blue-500",
      questions: [
        // Realistic
        { id: 'R1', text: 'I enjoy working with tools and machines', category: 'R' },
        { id: 'R2', text: 'I like outdoor activities and manual work', category: 'R' },
        { id: 'R3', text: 'I prefer practical, hands-on problem solving', category: 'R' },
        
        // Investigative
        { id: 'I1', text: 'I enjoy analyzing data and conducting research', category: 'I' },
        { id: 'I2', text: 'I like solving complex mathematical problems', category: 'I' },
        { id: 'I3', text: 'I am curious about how things work scientifically', category: 'I' },
        
        // Artistic
        { id: 'A1', text: 'I enjoy creative writing and artistic expression', category: 'A' },
        { id: 'A2', text: 'I like designing and creating visual content', category: 'A' },
        { id: 'A3', text: 'I prefer unstructured, creative environments', category: 'A' },
        
        // Social
        { id: 'S1', text: 'I enjoy helping and teaching others', category: 'S' },
        { id: 'S2', text: 'I like working in team environments', category: 'S' },
        { id: 'S3', text: 'I am interested in counseling and social work', category: 'S' },
        
        // Enterprising
        { id: 'E1', text: 'I enjoy leading and managing projects', category: 'E' },
        { id: 'E2', text: 'I like selling ideas and persuading others', category: 'E' },
        { id: 'E3', text: 'I am comfortable taking calculated risks', category: 'E' },
        
        // Conventional
        { id: 'C1', text: 'I prefer organized, structured work environments', category: 'C' },
        { id: 'C2', text: 'I enjoy working with data and detailed information', category: 'C' },
        { id: 'C3', text: 'I like following established procedures', category: 'C' }
      ]
    },
    {
      title: "Aptitude Assessment",
      subtitle: "Core Skills",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-green-500",
      questions: [
        // Numerical
        { id: 'N1', text: 'If a book costs ₹120 after a 20% discount, what was the original price?', category: 'Numerical', options: ['₹144', '₹150', '₹160', '₹180'], correct: 1 },
        { id: 'N2', text: 'What is 15% of 240?', category: 'Numerical', options: ['30', '32', '36', '40'], correct: 2 },
        { id: 'N3', text: 'A train travels 300 km in 4 hours. What is its average speed?', category: 'Numerical', options: ['70 km/h', '75 km/h', '80 km/h', '85 km/h'], correct: 1 },
        
        // Verbal
        { id: 'V1', text: 'Choose the word most similar to "Abundant":', category: 'Verbal', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], correct: 1 },
        { id: 'V2', text: 'Complete: "As light is to darkness, hope is to _____"', category: 'Verbal', options: ['Despair', 'Brightness', 'Future', 'Dreams'], correct: 0 },
        { id: 'V3', text: 'Which word does not belong: Dog, Cat, Bird, Chair', category: 'Verbal', options: ['Dog', 'Cat', 'Bird', 'Chair'], correct: 3 },
        
        // Logical
        { id: 'L1', text: 'What comes next in the sequence: 2, 6, 18, 54, ?', category: 'Logical', options: ['108', '162', '216', '270'], correct: 1 },
        { id: 'L2', text: 'If all roses are flowers, and some flowers are red, can we conclude that some roses are red?', category: 'Logical', options: ['Yes', 'No', 'Cannot determine', 'Maybe'], correct: 2 },
        { id: 'L3', text: 'A is taller than B, B is taller than C. Who is shortest?', category: 'Logical', options: ['A', 'B', 'C', 'Cannot determine'], correct: 2 }
      ]
    }
  ];

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const currentQuestionIndex = sections.slice(0, currentSection).reduce((sum, section) => sum + section.questions.length, 0) + currentQuestion;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const currentSectionData = sections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];

  const handleAnswer = (value: number) => {
    const questionId = currentQuestionData.id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      completeQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const calculateResults = () => {
    // Calculate RIASEC scores
    const riasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const categoryNames = {
      R: 'Realistic',
      I: 'Investigative', 
      A: 'Artistic',
      S: 'Social',
      E: 'Enterprising',
      C: 'Conventional'
    };

    // Interest scores (RIASEC)
    Object.entries(answers).forEach(([questionId, score]) => {
      const question = sections[0].questions.find(q => q.id === questionId);
      if (question && question.category in riasecScores) {
        riasecScores[question.category as keyof typeof riasecScores] += score;
      }
    });

    // Aptitude scores
    let aptitudeScore = 0;
    let totalAptitudeQuestions = 0;
    
    sections[1].questions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        totalAptitudeQuestions++;
        if (question.correct !== undefined && answer === question.correct) {
          aptitudeScore++;
        }
      }
    });

    const aptitudePercentage = totalAptitudeQuestions > 0 ? Math.round((aptitudeScore / totalAptitudeQuestions) * 100) : 0;

    // Get top RIASEC categories
    const topInterests = Object.entries(riasecScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([code, score]) => ({
        code,
        name: categoryNames[code as keyof typeof categoryNames],
        score: Math.round((score / 15) * 100) // Normalize to percentage
      }));

    // Career recommendations based on top interests
    const careerRecommendations = getCareerRecommendations(topInterests);

    return {
      riasecScores,
      topInterests,
      aptitudeScore: aptitudePercentage,
      topCareerPaths: careerRecommendations,
      totalScore: Math.round((aptitudePercentage + topInterests[0]?.score || 0) / 2)
    };
  };

  const getCareerRecommendations = (topInterests: any[]) => {
    const careerDatabase = {
      'Realistic': [
        { title: 'Civil Engineer', description: 'Design and build infrastructure projects', match: 95 },
        { title: 'Mechanical Engineer', description: 'Design machines and mechanical systems', match: 90 },
        { title: 'Agriculture Officer', description: 'Manage agricultural development programs', match: 85 }
      ],
      'Investigative': [
        { title: 'Software Developer', description: 'Create applications and software solutions', match: 95 },
        { title: 'Research Scientist', description: 'Conduct scientific research and experiments', match: 90 },
        { title: 'Data Analyst', description: 'Analyze data to find insights and trends', match: 85 }
      ],
      'Artistic': [
        { title: 'Graphic Designer', description: 'Create visual content and designs', match: 95 },
        { title: 'Content Writer', description: 'Create engaging written content', match: 90 },
        { title: 'UI/UX Designer', description: 'Design user interfaces and experiences', match: 85 }
      ],
      'Social': [
        { title: 'Teacher', description: 'Educate and guide students', match: 95 },
        { title: 'Social Worker', description: 'Help individuals and communities', match: 90 },
        { title: 'Counselor', description: 'Provide guidance and mental health support', match: 85 }
      ],
      'Enterprising': [
        { title: 'Business Manager', description: 'Lead and manage business operations', match: 95 },
        { title: 'Marketing Executive', description: 'Promote products and services', match: 90 },
        { title: 'Entrepreneur', description: 'Start and run your own business', match: 85 }
      ],
      'Conventional': [
        { title: 'Accountant', description: 'Manage financial records and transactions', match: 95 },
        { title: 'Bank Officer', description: 'Handle banking operations and services', match: 90 },
        { title: 'Administrative Officer', description: 'Manage office operations and procedures', match: 85 }
      ]
    };

    const recommendations: any[] = [];
    topInterests.forEach(interest => {
      if (careerDatabase[interest.name as keyof typeof careerDatabase]) {
        recommendations.push(...careerDatabase[interest.name as keyof typeof careerDatabase]);
      }
    });

    return recommendations.slice(0, 6);
  };

  const completeQuiz = () => {
    const results = calculateResults();
    setIsCompleted(true);
    onComplete(results);
    
    // Confetti effect
    setTimeout(() => {
      navigate('/quiz-results');
    }, 2000);
  };

  const isAnswered = currentQuestionData.id in answers;
  const canProceed = isAnswered;

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed! 🎉</h2>
          <p className="text-lg text-gray-600 mb-6">
            Great job! We're analyzing your responses to create personalized career recommendations.
          </p>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            
            <Badge variant="secondary">
              {currentQuestionIndex + 1} of {totalQuestions}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${currentSectionData.color} text-white`}>
                {currentSectionData.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentSectionData.title}</h1>
                <p className="text-gray-600">{currentSectionData.subtitle}</p>
              </div>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentQuestionData.text}
                </CardTitle>
                {currentQuestionData.category && (
                  <Badge variant="outline" className="w-fit">
                    {currentQuestionData.category}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                {currentSectionData.title === "Interest Assessment" ? (
                  // Likert scale for interest questions
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-2 text-center text-sm">
                      <span>Strongly Disagree</span>
                      <span>Disagree</span>
                      <span>Neutral</span>
                      <span>Agree</span>
                      <span>Strongly Agree</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleAnswer(value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            answers[currentQuestionData.id] === value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="w-6 h-6 mx-auto rounded-full border-2 border-current"></div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Multiple choice for aptitude questions
                  <div className="space-y-3">
                    {currentQuestionData.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          answers[currentQuestionData.id] === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            answers[currentQuestionData.id] === index
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}></div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentSection === 0 && currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!canProceed}
            className="flex items-center space-x-2"
          >
            <span>
              {currentSection === sections.length - 1 && currentQuestion === currentSectionData.questions.length - 1
                ? 'Complete Quiz'
                : 'Next'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}