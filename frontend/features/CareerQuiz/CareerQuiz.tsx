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

export function CareerQuiz({ onComplete }: CareerQuizProps) {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the base API URL from the environment variable
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Use the API_BASE variable here
        const response = await fetch(`${API_BASE}/career-questions`);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions);
        } else {
          setError('Failed to load questions');
        }
      } catch (err) {
        setError('Error fetching questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [API_BASE]); // Added API_BASE to dependency array

  const handleAnswer = async (optionId: string) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, get ML recommendations from API
      try {
        // Use the API_BASE variable here
        const response = await fetch(`${API_BASE}/career-recommendations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: newAnswers }),
        });

        if (response.ok) {
          const data = await response.json();
          const results = {
            answers: newAnswers,
            timestamp: new Date().toISOString(),
            recommendations: data.recommendations,
            aptitude: data.aptitude
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
          // Fallback if API fails
          const results = {
            answers: newAnswers,
            timestamp: new Date().toISOString(),
            recommendations: ["Software Engineer", "Data Scientist", "Product Manager"],
            aptitude: { R: 10, I: 15, A: 5, S: 8, E: 12, C: 6 }
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
        }
      } catch (error) {
        console.error('Error fetching career recommendations:', error);
        // Fallback
        const results = {
          answers: newAnswers,
          timestamp: new Date().toISOString(),
          recommendations: ["Software Engineer", "Data Scientist", "Product Manager"],
          aptitude: { R: 10, I: 15, A: 5, S: 8, E: 12, C: 6 }
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
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Career Quiz</h2>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Career Quiz</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Career Quiz</h2>
      <p className="text-center text-gray-600 mb-8">Discover career paths based on your interests and skills.</p>

      {currentQuestion < questions.length ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="mt-6 text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
          <p className="text-gray-600">Processing your results...</p>
        </div>
      )}
    </div>
  );
}