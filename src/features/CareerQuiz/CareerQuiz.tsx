import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addAchievement } from '../../api/achievements';

interface CareerQuizProps {
  onComplete?: (results: any) => void;
}

interface Question {
  id: string;
  text: string;
  category: string;
  options: {
    id: string;
    text: string;
    scores: {
      R: number;
      I: number;
      A: number;
      S: number;
      E: number;
      C: number;
    };
  }[];
}

interface QuizResults {
  answers: string[];
  timestamp: string;
  recommendations: string[];
  detailed_recommendations?: any[];
  aptitude: Record<string, number>;
  personality_profile?: Record<string, any>;
}

export function CareerQuiz({ onComplete }: CareerQuizProps) {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/career-questions');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions);
        } else {
          setError('Failed to load questions. Please try again.');
        }
      } catch (err) {
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, get recommendations from API
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:3001/api/career-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: newAnswers }),
        });

        if (response.ok) {
          const data = await response.json();
          const results: QuizResults = {
            answers: newAnswers,
            timestamp: new Date().toISOString(),
            recommendations: data.recommendations,
            detailed_recommendations: data.detailed_recommendations,
            aptitude: data.aptitude,
            personality_profile: data.personality_profile
          };
          
          if (onComplete) {
            onComplete(results);
          }
          
          // Add achievement for completing quiz
          if (user) {
            await addAchievement(user.id, {
              id: 'complete-career-quiz',
              title: 'Career Quiz Completed',
              description: 'Completed the career quiz and received recommendations',
              icon: '🎓',
              points: 50
            });
          }
        } else {
          throw new Error('Failed to get recommendations');
        }
      } catch (error) {
        console.error('Error fetching career recommendations:', error);
        // Fallback with basic results
        const results: QuizResults = {
          answers: newAnswers,
          timestamp: new Date().toISOString(),
          recommendations: ["Software Engineer", "Data Scientist", "Teacher"],
          aptitude: { R: 10, I: 15, A: 5, S: 8, E: 12, C: 6 }
        };
        
        if (onComplete) {
          onComplete(results);
        }
        
        // Add achievement even on fallback
        if (user) {
          await addAchievement(user.id, {
            id: 'complete-career-quiz',
            title: 'Career Quiz Completed',
            description: 'Completed the career quiz and received recommendations',
            icon: '🎓',
            points: 50
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Career Quiz</h2>
            <p className="text-gray-600">Loading your personalized assessment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const categoryColors = {
    psychometric: 'bg-purple-100 text-purple-800',
    academic: 'bg-green-100 text-green-800',
    aptitude: 'bg-blue-100 text-blue-800',
    socioeconomic: 'bg-yellow-100 text-yellow-800',
    aspiration: 'bg-pink-100 text-pink-800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Career Assessment Quiz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your ideal career path through our scientifically-backed RIASEC assessment
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-600">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {currentQuestion < questions.length ? (
            <div className="p-6 md:p-8">
              {/* Question Header */}
              <div className="mb-8">
                <span className={`inline-block px-4 py-2 text-sm font-medium rounded-full mb-4 ${
                  categoryColors[questions[currentQuestion].category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
                }`}>
                  {questions[currentQuestion].category.charAt(0).toUpperCase() + questions[currentQuestion].category.slice(1)}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                  {questions[currentQuestion].text}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full p-4 md:p-6 text-left border-2 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] ${
                      selectedOption === option.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === option.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedOption === option.id && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-lg font-medium ${
                          selectedOption === option.id ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {option.text}
                        </span>
                      </div>
                      <div className="text-2xl">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    currentQuestion === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selectedOption || isSubmitting}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    !selectedOption || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Processing...</span>
                    </div>
                  ) : currentQuestion === questions.length - 1 ? (
                    'Complete Quiz'
                  ) : (
                    'Next Question'
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Choose the option that best describes you. There are no right or wrong answers.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Analyzing your responses and generating personalized career recommendations based on the RIASEC model...
              </p>
              <div className="flex justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            This assessment is based on the RIASEC model developed by John Holland
          </p>
        </div>
      </div>
    </div>
  );
}
