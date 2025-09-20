"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Lightbulb, Briefcase, Code, Palette, BookOpen, Handshake, DollarSign, Microscope, Building, Users, Gavel } from 'lucide-react';
// NEW: Import the questions from your JSON file
import quizQuestions from '../../question_bank.json';

// NEW: Define the structure of a question from your JSON
interface Question {
  questionId: string;
  questionText: string;
  category: string;
  options: {
    optionId: string;
    text: string;
    scores: { [key: string]: number };
  }[];
}

// UPDATED: Expanded career paths with courses and job opportunities
const careerPaths = {
  R: {
    name: "Realistic (Doers)",
    description: "You enjoy hands-on work, using tools, and working with plants and animals. You are practical and mechanically inclined.",
    courses: ["B.Tech in Mechanical/Civil/Electrical Engineering", "Diploma in a Trade (e.g., Carpentry, Plumbing)", "B.Sc in Agriculture"],
    jobs: ["Engineer", "Electrician", "Pilot", "Farmer", "Mechanic"],
    icon: <Briefcase className="h-12 w-12 text-blue-600 mb-4" />,
  },
  I: {
    name: "Investigative (Thinkers)",
    description: "You like to solve complex problems, work with ideas, and conduct research. You are curious, analytical, and precise.",
    courses: ["B.Tech in Computer Science", "B.Sc in Physics/Chemistry/Biology", "MBBS", "Bachelor of Pharmacy"],
    jobs: ["Software Developer", "Data Scientist", "Doctor", "Research Scientist", "Pharmacist"],
    icon: <Microscope className="h-12 w-12 text-gray-800 mb-4" />,
  },
  A: {
    name: "Artistic (Creators)",
    description: "You are creative, expressive, and enjoy working in unstructured environments. You value aesthetics and self-expression.",
    courses: ["Bachelor of Fine Arts (BFA)", "Bachelor of Design (B.Des)", "B.A. in Journalism & Mass Communication"],
    jobs: ["Graphic Designer", "Writer", "Musician", "Actor", "Web Designer"],
    icon: <Palette className="h-12 w-12 text-pink-500 mb-4" />,
  },
  S: {
    name: "Social (Helpers)",
    description: "You enjoy helping, teaching, and working with people. You are empathetic, cooperative, and good at communicating.",
    courses: ["Bachelor of Social Work (BSW)", "B.Ed (Bachelor of Education)", "B.Sc in Nursing", "B.A. in Psychology"],
    jobs: ["Teacher", "Counselor", "Nurse", "Social Worker", "HR Manager"],
    icon: <Users className="h-12 w-12 text-teal-600 mb-4" />,
  },
  E: {
    name: "Enterprising (Persuaders)",
    description: "You are a natural leader who enjoys persuading and influencing others. You are ambitious, energetic, and confident.",
    courses: ["Master of Business Administration (MBA)", "Bachelor of Business Administration (BBA)", "B.A. in Political Science"],
    jobs: ["Sales Manager", "Entrepreneur", "Marketing Director", "Lawyer", "Politician"],
    icon: <Building className="h-12 w-12 text-indigo-600 mb-4" />,
  },
  C: {
    name: "Conventional (Organizers)",
    description: "You are organized, detail-oriented, and enjoy working with data and following established procedures. You are efficient and practical.",
    courses: ["Bachelor of Commerce (B.Com)", "Chartered Accountancy (CA)", "Company Secretary (CS)"],
    jobs: ["Accountant", "Financial Analyst", "Data Entry Clerk", "Office Manager", "Bank Teller"],
    icon: <DollarSign className="h-12 w-12 text-green-600 mb-4" />,
  },
};


export function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // CHANGED: State now holds RIASEC scores
  const [scores, setScores] = useState({
    R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
  });
  const [showResult, setShowResult] = useState(false);
  // Result will now be a RIASEC code (e.g., 'R', 'I')
  const [result, setResult] = useState<keyof typeof careerPaths | null>(null);

  // CHANGED: handleAnswer function now processes RIASEC scores
  const handleAnswer = (points: { [key: string]: number }) => {
    // Create a mutable copy of the current scores
    const newScores = { ...scores };
    // Add points from the selected option
    for (const key in points) {
      if (newScores[key as keyof typeof newScores] !== undefined) {
        newScores[key as keyof typeof newScores] += points[key];
      }
    }
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Pass the final scores to calculateResult
      calculateResult(newScores);
    }
  };

  // CHANGED: calculateResult now finds the max RIASEC score
  const calculateResult = (finalScores: typeof scores) => {
    let maxScore = -1;
    let maxCareer: keyof typeof scores | null = null;
    
    for (const career in finalScores) {
      if (finalScores[career as keyof typeof scores] > maxScore) {
        maxScore = finalScores[career as keyof typeof scores];
        maxCareer = career as keyof typeof scores;
      }
    }
    
    setResult(maxCareer as keyof typeof careerPaths);
    setShowResult(true);
  };

  // CHANGED: resetQuiz now resets RIASEC scores
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setShowResult(false);
    setResult(null);
  };

  // NEW: Handle loading state while questions are being processed
  if (quizQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="p-4 md:p-6 min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        key={showResult ? 'result' : `question-${currentQuestion}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl" // Increased width for more content
      >
        <Card className="p-4 md:p-8 rounded-xl shadow-2xl transition-shadow duration-500 bg-white">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
              >
                <CardHeader className="text-center mb-6">
                  <p className="text-sm font-semibold text-blue-500">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </p>
                  {/* CHANGED: Using questionText from your JSON */}
                  <CardTitle className="text-2xl font-extrabold text-gray-800 mt-2">
                    {quizQuestions[currentQuestion].questionText}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CHANGED: Looping through options from your JSON */}
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.optionId}
                      variant="outline"
                      className="w-full h-auto py-4 px-6 text-left text-base font-medium rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors duration-200"
                      // Pass the 'scores' object on click
                      onClick={() => handleAnswer(option.scores)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold text-blue-700">Your Career Path Suggestion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* UPDATED: Display logic for new careerPaths structure */}
                  {result && careerPaths[result] ? (
                    <div className="flex flex-col items-center">
                      {careerPaths[result].icon}
                      <h2 className="text-2xl font-bold text-gray-800">
                        {careerPaths[result].name}
                      </h2>
                      <p className="text-gray-600 max-w-md mx-auto my-4">{careerPaths[result].description}</p>
                      
                      {/* NEW: Display Courses and Job Opportunities */}
                      <div className="text-left w-full mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-lg text-gray-700">Suggested Courses:</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {careerPaths[result].courses.map(course => <li key={course}>{course}</li>)}
                        </ul>
                        <h3 className="font-bold text-lg text-gray-700 mt-4">Job Opportunities:</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {careerPaths[result].jobs.map(job => <li key={job}>{job}</li>)}
                        </ul>
                      </div>
                    </div> 
                  ) : (
                    <p className="text-gray-600">No specific recommendation could be made. Please try the quiz again!</p>
                  )}
                  <Button
                    onClick={resetQuiz}
                    className="w-full mt-6 md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                  >
                    Start Again
                  </Button>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}