import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Brain, Lightbulb, Users, Briefcase, Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useLocalization } from '../hooks/useLocalization';

interface QuizProps {
  onComplete: (results: any) => void;
}

export function CareerQuiz({ onComplete }: QuizProps) {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const sections = [
    {
      title: t('section_interest_title'),
      subtitle: t('section_interest_subtitle'),
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-blue-500",
      questions: [
        // Realistic
        { id: 'R1', text: t('q_r1'), category: 'R' },
        { id: 'R2', text: t('q_r2'), category: 'R' },
        { id: 'R3', text: t('q_r3'), category: 'R' },
        
        // Investigative
        { id: 'I1', text: t('q_i1'), category: 'I' },
        { id: 'I2', text: t('q_i2'), category: 'I' },
        { id: 'I3', text: t('q_i3'), category: 'I' },
        
        // Artistic
        { id: 'A1', text: t('q_a1'), category: 'A' },
        { id: 'A2', text: t('q_a2'), category: 'A' },
        { id: 'A3', text: t('q_a3'), category: 'A' },
        
        // Social
        { id: 'S1', text: t('q_s1'), category: 'S' },
        { id: 'S2', text: t('q_s2'), category: 'S' },
        { id: 'S3', text: t('q_s3'), category: 'S' },
        
        // Enterprising
        { id: 'E1', text: t('q_e1'), category: 'E' },
        { id: 'E2', text: t('q_e2'), category: 'E' },
        { id: 'E3', text: t('q_e3'), category: 'E' },
        
        // Conventional
        { id: 'C1', text: t('q_c1'), category: 'C' },
        { id: 'C2', text: t('q_c2'), category: 'C' },
        { id: 'C3', text: t('q_c3'), category: 'C' }
      ]
    },
    {
      title: t('section_aptitude_title'),
      subtitle: t('section_aptitude_subtitle'),
      icon: <Brain className="w-6 h-6" />,
      color: "bg-green-500",
      questions: [
        // Numerical
        { id: 'N1', text: t('q_n1'), category: t('cat_numerical'), options: [t('q_n1_opt_1'), t('q_n1_opt_2'), t('q_n1_opt_3'), t('q_n1_opt_4')], correct: 1 },
        { id: 'N2', text: t('q_n2'), category: t('cat_numerical'), options: [t('q_n2_opt_1'), t('q_n2_opt_2'), t('q_n2_opt_3'), t('q_n2_opt_4')], correct: 2 },
        { id: 'N3', text: t('q_n3'), category: t('cat_numerical'), options: [t('q_n3_opt_1'), t('q_n3_opt_2'), t('q_n3_opt_3'), t('q_n3_opt_4')], correct: 1 },
        
        // Verbal
        { id: 'V1', text: t('q_v1'), category: t('cat_verbal'), options: [t('q_v1_opt_1'), t('q_v1_opt_2'), t('q_v1_opt_3'), t('q_v1_opt_4')], correct: 1 },
        { id: 'V2', text: t('q_v2'), category: t('cat_verbal'), options: [t('q_v2_opt_1'), t('q_v2_opt_2'), t('q_v2_opt_3'), t('q_v2_opt_4')], correct: 0 },
        { id: 'V3', text: t('q_v3'), category: t('cat_verbal'), options: [t('q_v3_opt_1'), t('q_v3_opt_2'), t('q_v3_opt_3'), t('q_v3_opt_4')], correct: 3 },
        
        // Logical
        { id: 'L1', text: t('q_l1'), category: t('cat_logical'), options: [t('q_l1_opt_1'), t('q_l1_opt_2'), t('q_l1_opt_3'), t('q_l1_opt_4')], correct: 1 },
        { id: 'L2', text: t('q_l2'), category: t('cat_logical'), options: [t('q_l2_opt_1'), t('q_l2_opt_2'), t('q_l2_opt_3'), t('q_l2_opt_4')], correct: 2 },
        { id: 'L3', text: t('q_l3'), category: t('cat_logical'), options: [t('q_l3_opt_1'), t('q_l3_opt_2'), t('q_l3_opt_3'), t('q_l3_opt_4')], correct: 2 }
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
      R: t('riasec_realistic'),
      I: t('riasec_investigative'),
      A: t('riasec_artistic'),
      S: t('riasec_social'),
      E: t('riasec_enterprising'),
      C: t('riasec_conventional')
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
        { title: t('career_civil_engineer_title'), description: t('career_civil_engineer_desc'), match: 95 },
        { title: t('career_mechanical_engineer_title'), description: t('career_mechanical_engineer_desc'), match: 90 },
        { title: t('career_agriculture_officer_title'), description: t('career_agriculture_officer_desc'), match: 85 }
      ],
      'Investigative': [
        { title: t('career_software_developer_title'), description: t('career_software_developer_desc'), match: 95 },
        { title: t('career_research_scientist_title'), description: t('career_research_scientist_desc'), match: 90 },
        { title: t('career_data_analyst_title'), description: t('career_data_analyst_desc'), match: 85 }
      ],
      'Artistic': [
        { title: t('career_graphic_designer_title'), description: t('career_graphic_designer_desc'), match: 95 },
        { title: t('career_content_writer_title'), description: t('career_content_writer_desc'), match: 90 },
        { title: t('career_ui_ux_designer_title'), description: t('career_ui_ux_designer_desc'), match: 85 }
      ],
      'Social': [
        { title: t('career_teacher_title'), description: t('career_teacher_desc'), match: 95 },
        { title: t('career_social_worker_title'), description: t('career_social_worker_desc'), match: 90 },
        { title: t('career_counselor_title'), description: t('career_counselor_desc'), match: 85 }
      ],
      'Enterprising': [
        { title: t('career_business_manager_title'), description: t('career_business_manager_desc'), match: 95 },
        { title: t('career_marketing_executive_title'), description: t('career_marketing_executive_desc'), match: 90 },
        { title: 'career_entrepreneur_title', description: t('career_entrepreneur_desc'), match: 85 }
      ],
      'Conventional': [
        { title: t('career_accountant_title'), description: t('career_accountant_desc'), match: 95 },
        { title: t('career_bank_officer_title'), description: t('career_bank_officer_desc'), match: 90 },
        { title: t('career_admin_officer_title'), description: t('career_admin_officer_desc'), match: 85 }
      ]
    };

    const recommendations: any[] = [];
    topInterests.forEach(interest => {
      // The interest.name is already localized, so we need to map it back to the original key for the database lookup.
      // A more robust solution would be to use the 'code' (R, I, A, etc.) for the lookup.
      const englishKey = Object.keys(riasec_keys_reverse_mapping).find(key => t(key) === interest.name);
      if (englishKey) {
          recommendations.push(...careerDatabase[englishKey as keyof typeof careerDatabase]);
      }
    });

    return recommendations.slice(0, 6);
  };
  
  // This is a new object to map back from the localized name to the original code for the database lookup.
  const riasec_keys_reverse_mapping = {
      'Realistic': t('riasec_realistic'),
      'Investigative': t('riasec_investigative'),
      'Artistic': t('riasec_artistic'),
      'Social': t('riasec_social'),
      'Enterprising': t('riasec_enterprising'),
      'Conventional': t('riasec_conventional')
  };

  const completeQuiz = () => {
    const results = calculateResults();
    setIsCompleted(true);
    onComplete(results);
    
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('quiz_completed_title')}</h2>
          <p className="text-lg text-gray-600 mb-6">
            {t('quiz_completed_message')}
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
              <span>{t('back_to_dashboard')}</span>
            </Button>
            
            <Badge variant="secondary">
              {t('quiz_progress', { current: currentQuestionIndex + 1, total: totalQuestions })}
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
                {currentSectionData.title === t('section_interest_title') ? (
                  // Likert scale for interest questions
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-2 text-center text-sm">
                      <span>{t('likert_disagree_strong')}</span>
                      <span>{t('likert_disagree')}</span>
                      <span>{t('likert_neutral')}</span>
                      <span>{t('likert_agree')}</span>
                      <span>{t('likert_agree_strong')}</span>
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
            <span>{t('previous_button')}</span>
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!canProceed}
            className="flex items-center space-x-2"
          >
            <span>
              {currentSection === sections.length - 1 && currentQuestion === currentSectionData.questions.length - 1
                ? t('complete_quiz_button')
                : t('next_button')}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}