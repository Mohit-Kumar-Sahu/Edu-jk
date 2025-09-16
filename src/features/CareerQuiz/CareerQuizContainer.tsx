import React, { useState } from 'react';
import { CareerQuiz } from './CareerQuiz';
import { QuizResults } from './QuizResults';

interface QuizResults {
  answers: string[];
  timestamp: string;
  recommendations: string[];
  detailed_recommendations?: any[];
  aptitude: Record<string, number>;
  personality_profile?: Record<string, any>;
}

export function CareerQuizContainer() {
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setShowResults(false);
  };

  if (showResults && quizResults) {
    return (
      <QuizResults 
        results={quizResults} 
        onRetake={handleRetakeQuiz}
      />
    );
  }

  return (
    <CareerQuiz onComplete={handleQuizComplete} />
  );
}
