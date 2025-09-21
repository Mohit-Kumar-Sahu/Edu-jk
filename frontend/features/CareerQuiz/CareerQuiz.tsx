"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Briefcase, Microscope, Palette, Users, Building, DollarSign, GraduationCap, Star } from 'lucide-react';
import quizQuestions from '../../question_bank.json';

// Define the structure of a question from your JSON
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

// No changes to careerPaths object
const careerPaths = {
  R: {
    name: "Realistic (Doers)",
    description: "You enjoy hands-on work, using tools, and working with plants and animals. You are practical and mechanically inclined.",
    courses: ["B.Tech in Mechanical/Civil Engineering", "Diploma in a Trade", "B.Sc in Agriculture"],
    jobs: ["Engineer", "Electrician", "Pilot", "Farmer", "Mechanic"],
    icon: <Briefcase className="h-12 w-12 text-blue-600 mb-4" />,
  },
  I: {
    name: "Investigative (Thinkers)",
    description: "You like to solve complex problems, work with ideas, and conduct research. You are curious, analytical, and precise.",
    courses: ["B.Tech in Computer Science", "B.Sc in Physics/Biology", "MBBS", "B.Pharmacy"],
    jobs: ["Software Developer", "Data Scientist", "Doctor", "Research Scientist"],
    icon: <Microscope className="h-12 w-12 text-gray-800 mb-4" />,
  },
  A: {
    name: "Artistic (Creators)",
    description: "You are creative, expressive, and enjoy working in unstructured environments. You value aesthetics and self-expression.",
    courses: ["Bachelor of Fine Arts (BFA)", "Bachelor of Design (B.Des)", "B.A. in Journalism"],
    jobs: ["Graphic Designer", "Writer", "Musician", "Actor", "Web Designer"],
    icon: <Palette className="h-12 w-12 text-pink-500 mb-4" />,
  },
  S: {
    name: "Social (Helpers)",
    description: "You enjoy helping, teaching, and working with people. You are empathetic, cooperative, and good at communicating.",
    courses: ["Bachelor of Social Work (BSW)", "B.Ed (Education)", "B.Sc in Nursing", "B.A. in Psychology"],
    jobs: ["Teacher", "Counselor", "Nurse", "Social Worker", "HR Manager"],
    icon: <Users className="h-12 w-12 text-teal-600 mb-4" />,
  },
  E: {
    name: "Enterprising (Persuaders)",
    description: "You are a natural leader who enjoys persuading and influencing others. You are ambitious, energetic, and confident.",
    courses: ["MBA / BBA", "B.A. in Political Science", "Law (LLB)"],
    jobs: ["Sales Manager", "Entrepreneur", "Marketing Director", "Lawyer", "Politician"],
    icon: <Building className="h-12 w-12 text-indigo-600 mb-4" />,
  },
  C: {
    name: "Conventional (Organizers)",
    description: "You are organized, detail-oriented, and enjoy working with data and following established procedures. You are efficient and practical.",
    courses: ["Bachelor of Commerce (B.Com)", "Chartered Accountancy (CA)", "Company Secretary (CS)"],
    jobs: ["Accountant", "Financial Analyst", "Data Entry", "Office Manager", "Bank Teller"],
    icon: <DollarSign className="h-12 w-12 text-green-600 mb-4" />,
  },
};

// NEW: Function to shuffle an array and return the first N items
const getShuffledQuestions = (arr: Question[], num: number): Question[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};


export function CareerQuiz() {
  // NEW: State to hold the 20 random questions for the current quiz attempt
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<keyof typeof careerPaths | null>(null);

  // NEW: useEffect to select random questions when the component mounts
  useEffect(() => {
    setActiveQuestions(getShuffledQuestions(quizQuestions, 20));
  }, []);

  const handleAnswer = (points: { [key: string]: number }) => {
    const newScores = { ...scores };
    for (const key in points) {
      if (newScores[key as keyof typeof newScores] !== undefined) {
        newScores[key as keyof typeof newScores] += points[key];
      }
    }
    setScores(newScores);

    // UPDATED: Check against activeQuestions length
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

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

  // UPDATED: resetQuiz now also selects a new set of random questions
  const resetQuiz = () => {
    setActiveQuestions(getShuffledQuestions(quizQuestions, 20));
    setCurrentQuestion(0);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setShowResult(false);
    setResult(null);
  };

  // UPDATED: Loading state now checks activeQuestions
  if (activeQuestions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading Quiz...</div>;
  }

  return (
    <div className="p-4 md:p-6 min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        key={showResult ? 'result' : `question-${currentQuestion}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="p-4 md:p-8 rounded-2xl shadow-xl bg-white">
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
                    {/* UPDATED: Use activeQuestions.length */}
                    Question {currentQuestion + 1} of {activeQuestions.length}
                  </p>
                  <CardTitle className="text-2xl font-extrabold text-gray-800 mt-2">
                    {/* UPDATED: Use activeQuestions */}
                    {activeQuestions[currentQuestion].questionText}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* UPDATED: Use activeQuestions */}
                  {activeQuestions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.optionId}
                      variant="outline"
                      className="w-full h-auto py-4 px-6 text-left text-base font-medium rounded-lg border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors duration-200"
                      onClick={() => handleAnswer(option.scores)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </CardContent>
              </motion.div>
            ) : (
              // ######################################################
              // ### NEW: ATTRACTIVE UI FOR RESULTS CARD STARTS HERE ###
              // ######################################################
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold text-blue-700">Your Recommended Career Path</CardTitle>
                </CardHeader>
                <CardContent>
                  {result && careerPaths[result] ? (
                    <div className="flex flex-col items-center space-y-6">
                      {careerPaths[result].icon}
                      <h2 className="text-2xl font-bold text-gray-800">
                        {careerPaths[result].name}
                      </h2>
                      <p className="text-gray-600 max-w-lg mx-auto">{careerPaths[result].description}</p>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                        {/* Courses Card */}
                        <div className="bg-slate-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-4">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                            Suggested Courses
                          </h3>
                          <ul className="space-y-2">
                            {careerPaths[result].courses.map(course => (
                              <li key={course} className="flex items-start">
                                <Star className="h-4 w-4 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                                <span className="text-gray-600">{course}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Job Opportunities Card */}
                        <div className="bg-slate-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-4">
                            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                            Job Opportunities
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {careerPaths[result].jobs.map(job => (
                              <span key={job} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {job}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div> 
                  ) : (
                    <p className="text-gray-600">No specific recommendation could be made. Please try the quiz again!</p>
                  )}
                  <Button
                    onClick={resetQuiz}
                    className="w-full mt-8 md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
                  >
                    Take Quiz Again
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