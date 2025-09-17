"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, Briefcase, Code, Palette, BookOpen, Handshake } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    points: { [key: string]: number };
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "When working on a project, I prefer to...",
    options: [
      { text: "Lead the team and manage the timeline.", points: { management: 3, business: 2 } },
      { text: "Analyze data and solve logical puzzles.", points: { technology: 3, engineering: 2, research: 1 } },
      { text: "Create and design the visual elements.", points: { creative: 3, humanities: 1 } },
      { text: "Communicate with clients and customers.", points: { communication: 3, business: 2 } },
    ],
  },
  {
    id: 2,
    question: "Which subject in school did you enjoy the most?",
    options: [
      { text: "Science (Physics, Chemistry, Biology)", points: { research: 3, engineering: 2, medical: 2 } },
      { text: "Mathematics", points: { engineering: 3, finance: 2, technology: 2 } },
      { text: "Literature and History", points: { humanities: 3, creative: 1 } },
      { text: "Economics and Commerce", points: { business: 3, finance: 3, management: 1 } },
    ],
  },
  {
    id: 3,
    question: "What kind of problem-solving excites you the most?",
    options: [
      { text: "Building a new software application.", points: { technology: 3, engineering: 2 } },
      { text: "Finding a cure for a disease.", points: { medical: 3, research: 2 } },
      { text: "Developing a new marketing strategy.", points: { business: 3, creative: 1 } },
      { text: "Improving a legal or social system.", points: { law: 3, humanities: 2, communication: 1 } },
    ],
  },
  {
    id: 4,
    question: "I feel most energized when I...",
    options: [
      { text: "Work with numbers and data all day.", points: { finance: 3, technology: 2, engineering: 1 } },
      { text: "Interact with and help people one-on-one.", points: { medical: 3, social_work: 3, communication: 2 } },
      { text: "Create something from scratch, like a drawing or story.", points: { creative: 3, humanities: 2 } },
      { text: "Read scientific papers and conduct experiments.", points: { research: 3, technology: 2, engineering: 1 } },
    ],
  },
  {
    id: 5,
    question: "Which of these skills would you like to develop?",
    options: [
      { text: "Public speaking and negotiation.", points: { communication: 3, business: 2, law: 1 } },
      { text: "Coding and programming.", points: { technology: 3, engineering: 2, research: 1 } },
      { text: "Financial planning and investment.", points: { finance: 3, business: 2 } },
      { text: "Critical analysis of historical events.", points: { humanities: 3, law: 2 } },
    ],
  },
  {
    id: 6,
    question: "My ideal workplace would be...",
    options: [
      { text: "A bustling office with a clear hierarchy.", points: { management: 3, business: 2, finance: 1 } },
      { text: "A quiet, focused laboratory or study.", points: { research: 3, technology: 2 } },
      { text: "A creative studio or a flexible remote setup.", points: { creative: 3, humanities: 2 } },
      { text: "A place where I can directly help the community.", points: { social_work: 3, medical: 2, communication: 1 } },
    ],
  },
  {
    id: 7,
    question: "What kind of career goal do you find most appealing?",
    options: [
      { text: "Building a profitable company.", points: { business: 3, management: 2 } },
      { text: "Making a difference through public policy.", points: { law: 3, social_work: 2, humanities: 1 } },
      { text: "Creating a masterpiece or a viral product.", points: { creative: 3, business: 1 } },
      { text: "Developing the next-generation AI or machine.", points: { technology: 3, engineering: 2 } },
    ],
  },
];

const careerPaths = {
  engineering: {
    name: "Engineering",
    description: "You have a knack for solving technical problems and building systems. You'd thrive in fields like Civil, Mechanical, or Electrical Engineering.",
    icon: <Briefcase className="h-12 w-12 text-blue-600 mb-4" />,
  },
  technology: {
    name: "Technology & IT",
    description: "Your interests align with software, data, and digital innovation. This path is perfect for roles like Software Developer, Data Scientist, or Cybersecurity Analyst.",
    icon: <Code className="h-12 w-12 text-gray-800 mb-4" />,
  },
  medical: {
    name: "Medical & Healthcare",
    description: "Your passion is helping people and understanding the human body. Consider careers like Doctor, Nurse, Physical Therapist, or Pharmacist.",
    icon: <Handshake className="h-12 w-12 text-green-600 mb-4" />,
  },
  business: {
    name: "Business & Entrepreneurship",
    description: "You are a natural leader with a flair for strategy and finance. This is a great fit for roles in management, marketing, or starting your own venture.",
    icon: <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />,
  },
  finance: {
    name: "Finance & Accounting",
    description: "You are excellent with numbers and financial systems. You could pursue careers as a Financial Analyst, Accountant, or Investment Banker.",
    icon: <Briefcase className="h-12 w-12 text-blue-800 mb-4" />,
  },
  research: {
    name: "Research & Development",
    description: "Your curiosity is your biggest asset. This path is for you if you enjoy deep dives into subjects as a Scientist, Academician, or a Research Associate.",
    icon: <Lightbulb className="h-12 w-12 text-yellow-600 mb-4" />,
  },
  creative: {
    name: "Creative Arts & Design",
    description: "You have a strong sense of aesthetics and self-expression. Consider careers in Graphic Design, Web Design, Fine Arts, or becoming a writer.",
    icon: <Palette className="h-12 w-12 text-pink-500 mb-4" />,
  },
  humanities: {
    name: "Humanities & Social Sciences",
    description: "You are interested in human culture, history, and society. This path can lead to careers in Journalism, Social Work, Education, or Public Administration.",
    icon: <BookOpen className="h-12 w-12 text-purple-600 mb-4" />,
  },
  law: {
    name: "Law & Justice",
    description: "You have a keen interest in legal systems and justice. A career as a Lawyer, Judge, or Legal Consultant would suit you well.",
    icon: <Handshake className="h-12 w-12 text-red-600 mb-4" />,
  },
  social_work: {
    name: "Social Work & Public Service",
    description: "Your primary goal is to make a positive impact on society. This can lead to roles in social work, NGOs, or other public service sectors.",
    icon: <Handshake className="h-12 w-12 text-teal-600 mb-4" />,
  },
  communication: {
    name: "Communication & Media",
    description: "You are a great communicator and enjoy connecting with people. This path is ideal for a career in Marketing, Public Relations, or Journalism.",
    icon: <BookOpen className="h-12 w-12 text-orange-600 mb-4" />,
  },
};

export function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    engineering: 0,
    technology: 0,
    medical: 0,
    business: 0,
    finance: 0,
    research: 0,
    creative: 0,
    humanities: 0,
    law: 0,
    social_work: 0,
    communication: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (points: { [key: string]: number }) => {
    const newScores = { ...scores };
    for (const key in points) {
      if (newScores[key as keyof typeof newScores] !== undefined) {
        newScores[key as keyof typeof newScores] += points[key];
      }
    }
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let maxScore = -1;
    let maxCareer = 'unknown';
    for (const career in scores) {
      if (scores[career as keyof typeof scores] > maxScore) {
        maxScore = scores[career as keyof typeof scores];
        maxCareer = career;
      }
    }
    setResult(maxCareer);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      engineering: 0,
      technology: 0,
      medical: 0,
      business: 0,
      finance: 0,
      research: 0,
      creative: 0,
      humanities: 0,
      law: 0,
      social_work: 0,
      communication: 0,
    });
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="p-4 md:p-6 min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        key={showResult ? 'result' : `question-${currentQuestion}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
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
                  <CardTitle className="text-2xl font-extrabold text-gray-800 mt-2">
                    {quizQuestions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full h-auto py-4 px-6 text-left text-base font-medium rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors duration-200"
                      onClick={() => handleAnswer(option.points)}
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
                  {result && careerPaths[result as keyof typeof careerPaths] ? (
                    <>
                      {careerPaths[result as keyof typeof careerPaths].icon}
                      <h2 className="text-2xl font-bold text-gray-800">
                        {careerPaths[result as keyof typeof careerPaths].name}
                      </h2>
                      <p className="text-gray-600 max-w-md mx-auto">{careerPaths[result as keyof typeof careerPaths].description}</p>
                    </>
                  ) : (
                    <p className="text-gray-600">No specific recommendation could be made. Please try the quiz again!</p>
                  )}
                  <Button
                    onClick={resetQuiz}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
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