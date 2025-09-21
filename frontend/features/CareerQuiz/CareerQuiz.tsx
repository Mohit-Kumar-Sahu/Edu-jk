"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Briefcase, Microscope, Palette, Users, Building, DollarSign, GraduationCap, Star, BarChart3, Repeat } from 'lucide-react';

// --- TYPE DEFINITIONS & CONSTANTS ---

interface Question {
  questionId: string;
  questionText: string;
  options: {
    optionId: string;
    text: string;
    scores: { [key in keyof typeof careerPaths]?: number };
  }[];
}

const careerPaths = {
  R: { name: "Realistic (Doers)", icon: <Briefcase className="h-8 w-8 text-white" />, color: "bg-blue-500", courses: ["B.Tech in Mechanical/Civil Engineering", "Diploma in a Trade", "B.Sc in Agriculture", "Aviation School"], jobs: ["Engineer", "Electrician", "Pilot", "Architect", "Mechanic"] },
  I: { name: "Investigative (Thinkers)", icon: <Microscope className="h-8 w-8 text-white" />, color: "bg-gray-800", courses: ["B.Tech in Computer Science", "B.Sc in Physics/Biology", "MBBS", "B.Pharmacy"], jobs: ["Software Developer", "Data Scientist", "Doctor", "Research Scientist"] },
  A: { name: "Artistic (Creators)", icon: <Palette className="h-8 w-8 text-white" />, color: "bg-pink-500", courses: ["Bachelor of Fine Arts (BFA)", "Bachelor of Design (B.Des)", "B.A. in Journalism & Mass Comm."], jobs: ["Graphic Designer", "Writer", "Musician", "UI/UX Designer", "Filmmaker"] },
  S: { name: "Social (Helpers)", icon: <Users className="h-8 w-8 text-white" />, color: "bg-teal-500", courses: ["Bachelor of Social Work (BSW)", "B.Ed (Education)", "B.Sc in Nursing", "B.A. in Psychology"], jobs: ["Teacher", "Counselor", "Nurse", "Social Worker", "HR Manager"] },
  E: { name: "Enterprising (Persuaders)", icon: <Building className="h-8 w-8 text-white" />, color: "bg-indigo-600", courses: ["MBA / BBA", "B.A. in Political Science", "Law (LLB)", "Hotel Management"], jobs: ["Sales Manager", "Entrepreneur", "Marketing Director", "Lawyer", "Public Relations"] },
  C: { name: "Conventional (Organizers)", icon: <DollarSign className="h-8 w-8 text-white" />, color: "bg-green-600", courses: ["Bachelor of Commerce (B.Com)", "Chartered Accountancy (CA)", "Company Secretary (CS)", "Data Analytics Certification"], jobs: ["Accountant", "Financial Analyst", "Logistics Manager", "Web Developer (Backend)"] },
};

// --- HARD-CODED QUESTION BANK (No Changes) ---
const hardcodedQuestions: Question[] = [
  { questionId: 'q1', questionText: "When a new gadget comes out, I'm more likely to:", options: [
    { optionId: '1a', text: "Take it apart to see how it works.", scores: { R: 2, I: 1 } },
    { optionId: '1b', text: "Analyze its market impact and sales potential.", scores: { E: 2, C: 1 } },
    { optionId: '1c', text: "Imagine new ways to improve its design.", scores: { A: 2 } },
    { optionId: '1d', text: "Explain how it can help people in their daily lives.", scores: { S: 2 } },
  ]},
  { questionId: 'q2', questionText: "Which of these science topics fascinates you the most?", options: [
    { optionId: '2a', text: "The physics of black holes and spacetime.", scores: { I: 2 } },
    { optionId: '2b', text: "The chemical reactions in drug discovery.", scores: { I: 2, C: 1 } },
    { optionId: '2c', text: "The psychology behind human behavior.", scores: { S: 2, I: 1 } },
    { optionId: '2d', text: "The engineering of sustainable energy sources.", scores: { R: 2, I: 1 } },
  ]},
  { questionId: 'q3', questionText: "You're given a complex dataset. What's your first instinct?", options: [
    { optionId: '3a', text: "Organize it neatly into spreadsheets and find patterns.", scores: { C: 2, I: 1 } },
    { optionId: '3b', text: "Create a compelling visual presentation to explain it.", scores: { A: 2, E: 1 } },
    { optionId: '3c', text: "Build a predictive model to forecast future trends.", scores: { I: 2 } },
    { optionId: '3d', text: "Use it to support a business proposal or pitch.", scores: { E: 2 } },
  ]},
  { questionId: 'q4', questionText: "In a group project, you're the one who usually:", options: [
    { optionId: '4a', text: "Leads the discussion and delegates tasks.", scores: { E: 2 } },
    { optionId: '4b', text: "Ensures everyone is heard and resolves conflicts.", scores: { S: 2 } },
    { optionId: '4c', text: "Does the deep research and fact-checking.", scores: { I: 2 } },
    { optionId: '4d', text: "Builds the physical prototype or final product.", scores: { R: 2 } },
  ]},
  { questionId: 'q5', questionText: "Which geopolitical issue interests you more?", options: [
    { optionId: '5a', text: "The economics of international trade agreements.", scores: { E: 2, C: 1 } },
    { optionId: '5b', text: "The cultural impact of globalization.", scores: { A: 1, S: 2 } },
    { optionId: '5c', text: "The strategy and technology behind national security.", scores: { I: 1, R: 1 } },
    { optionId: '5d', text: "The logistics of international aid and disaster relief.", scores: { S: 2, C: 1 } },
  ]},
  { questionId: 'q6', questionText: "I feel most satisfied after:", options: [
    { optionId: '6a', text: "Solving a very difficult logical puzzle.", scores: { I: 2 } },
    { optionId: '6b', text: "Creating something beautiful and original.", scores: { A: 2 } },
    { optionId: '6c', text: "Fixing a broken machine with my own hands.", scores: { R: 2 } },
    { optionId: '6d', text: "Successfully persuading a group to my point of view.", scores: { E: 2 } },
  ]},
  { questionId: 'q7', questionText: "If you were to start a YouTube channel, it would be about:", options: [
    { optionId: '7a', text: "DIY projects and life hacks.", scores: { R: 2, A: 1 } },
    { optionId: '7b', text: "Financial planning and stock market analysis.", scores: { C: 1, E: 2 } },
    { optionId: '7c', text: "Deep-dive documentary essays on complex topics.", scores: { I: 2, A: 1 } },
    { optionId: '7d', text: "Community interviews and social experiments.", scores: { S: 2 } },
  ]},
  { questionId: 'q8', questionText: "Which work environment sounds most appealing?", options: [
    { optionId: '8a', text: "A quiet, well-organized office with clear tasks.", scores: { C: 2 } },
    { optionId: '8b', text: "A busy, dynamic sales floor or a startup pitch room.", scores: { E: 2 } },
    { optionId: '8c', text: "A collaborative and supportive classroom or clinic.", scores: { S: 2 } },
    { optionId: '8d', text: "A research lab or a university library.", scores: { I: 2 } },
  ]},
  { questionId: 'q9', questionText: "Your ideal 'problem to solve' involves:", options: [
    { optionId: '9a', text: "Improving an inefficient system or process.", scores: { C: 2, R: 1 } },
    { optionId: '9b', text: "Understanding a mysterious natural phenomenon.", scores: { I: 2 } },
    { optionId: '9c', text: "Communicating a complex idea to the public.", scores: { A: 2, S: 1 } },
    { optionId: '9d', text: "Launching a new product and beating competitors.", scores: { E: 2 } },
  ]},
  { questionId: 'q10', questionText: "I am most comfortable working with:", options: [
    { optionId: '10a', text: "Data, numbers, and clear instructions.", scores: { C: 2 } },
    { optionId: '10b', text: "People, emotions, and open-ended conversations.", scores: { S: 2 } },
    { optionId: '10c', text: "Theories, ideas, and abstract concepts.", scores: { I: 2 } },
    { optionId: '10d', text: "Tools, machinery, and physical objects.", scores: { R: 2 } },
  ]},
  { questionId: 'q11', questionText: "Which task sounds like the most fun?", options: [
    { optionId: '11a', text: "Writing a script for a short film.", scores: { A: 2 } },
    { optionId: '11b', text: "Developing a budget for a new company department.", scores: { C: 2, E: 1 } },
    { optionId: '11c', text: "Tutoring a student who is struggling with a subject.", scores: { S: 2 } },
    { optionId: '11d', text: "Conducting an experiment to test a hypothesis.", scores: { I: 2 } },
  ]},
  { questionId: 'q12', questionText: "When learning, I prefer to:", options: [
    { optionId: '12a', text: "Learn by doing and direct experience.", scores: { R: 2 } },
    { optionId: '12b', text: "Read books and analyze theories on my own.", scores: { I: 2 } },
    { optionId: '12c', text: "Participate in group discussions and share ideas.", scores: { S: 2, E: 1 } },
    { optionId: '12d', text: "Follow a structured curriculum with clear goals.", scores: { C: 2 } },
  ]},
  { questionId: 'q13', questionText: "A country's strength is best measured by its:", options: [
    { optionId: '13a', text: "Economic output and global market influence.", scores: { E: 2, C: 1 } },
    { optionId: '13b', text: "Scientific advancements and technological innovation.", scores: { I: 2, R: 1 } },
    { optionId: '13c', text: "Social welfare systems and quality of life for citizens.", scores: { S: 2 } },
    { optionId: '13d', text: "Cultural richness and artistic contributions.", scores: { A: 2 } },
  ]},
  { questionId: 'q14', questionText: "I'd rather be known as someone who is:", options: [
    { optionId: '14a', text: "Creative and imaginative.", scores: { A: 2 } },
    { optionId: '14b', text: "Reliable and efficient.", scores: { C: 2 } },
    { optionId: '14c', "text": "Ambitious and influential.", "scores": { "E": 2 } },
    { optionId: '14d', "text": "Kind and compassionate.", "scores": { "S": 2 } }
  ]},
  { questionId: 'q15', questionText: "What kind of game do you prefer?", options: [
    { optionId: '15a', text: "A complex strategy game like Chess or Go.", scores: { I: 2, C: 1 } },
    { optionId: '15b', text: "A building and simulation game like Minecraft.", scores: { R: 2, A: 1 } },
    { optionId: '15c', text: "A social deduction game like Among Us.", scores: { S: 1, E: 1 } },
    { optionId: '15d', text: "A business simulation or tycoon game.", scores: { E: 2, C: 1 } },
  ]},
  { questionId: 'q16', questionText: "If I had a free weekend, I would most likely:", options: [
    { optionId: '16a', text: "Build or repair something at home.", scores: { R: 2 } },
    { optionId: '16b', text: "Volunteer for a local cause or help a friend.", scores: { S: 2 } },
    { optionId: '16c', text: "Read a non-fiction book or watch a documentary.", scores: { I: 2 } },
    { optionId: '16d', text: "Visit an art gallery or work on a creative hobby.", scores: { A: 2 } },
  ]},
  { questionId: 'q17', questionText: "When arguing a point, I rely on:", options: [
    { optionId: '17a', text: "Data, evidence, and logical reasoning.", scores: { I: 2, C: 1 } },
    { optionId: '17b', text: "Emotional appeal and personal stories.", scores: { S: 2, A: 1 } },
    { optionId: '17c', text: "Charisma, confidence, and persuasive language.", scores: { E: 2 } },
    { optionId: '17d', text: "Practical examples and real-world applications.", scores: { R: 2 } },
  ]},
  { questionId: 'q18', questionText: "A documentary about _____ would capture my attention.", options: [
    { optionId: '18a', text: "The rise and fall of a major corporation.", scores: { E: 2, C: 1 } },
    { optionId: '18b', text: "The intricate ecosystems of the deep ocean.", scores: { I: 2 } },
    { optionId: '18c', text: "The life of an influential artist or musician.", scores: { A: 2 } },
    { optionId: '18d', text: "The mechanics of a Formula 1 car.", scores: { R: 2 } },
  ]},
  { questionId: 'q19', questionText: "I prefer a job where I can:", options: [
    { optionId: '19a', text: "See the tangible results of my work.", scores: { R: 2 } },
    { optionId: '19b', text: "Express my individuality and creativity.", scores: { A: 2 } },
    { optionId: '19c', text: "Follow a clear and predictable routine.", scores: { C: 2 } },
    { optionId: '19d', text: "Help and empower others.", scores: { S: 2 } },
  ]},
  { questionId: 'q20', questionText: "Which of the following would give you the greatest sense of achievement?", options: [
    { optionId: '20a', text: "Discovering a new scientific principle.", scores: { I: 2 } },
    { optionId: '20b', text: "Building a successful business from scratch.", scores: { E: 2, C: 1 } },
    { optionId: '20c', text: "Creating a piece of art that moves people.", scores: { A: 2, S: 1 } },
    { optionId: '20d', text: "Mentoring someone to reach their full potential.", scores: { S: 2 } },
  ]},
];

// --- NEW: Color styles for the option buttons ---
const optionColors = [
    "bg-sky-100 text-sky-900 border-sky-200 hover:bg-sky-200 hover:border-sky-400",
    "bg-teal-100 text-teal-900 border-teal-200 hover:bg-teal-200 hover:border-teal-400",
    "bg-indigo-100 text-indigo-900 border-indigo-200 hover:bg-indigo-200 hover:border-indigo-400",
    "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 hover:bg-fuchsia-200 hover:border-fuchsia-400",
];

// --- MAIN QUIZ COMPONENT ---

export function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [showResult, setShowResult] = useState(false);

  const topResult = useMemo(() => {
    if (!showResult) return null;
    return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as keyof typeof careerPaths;
  }, [scores, showResult]);

  const handleAnswer = (points: { [key in keyof typeof careerPaths]?: number }) => {
    setScores(prevScores => {
      const newScores = { ...prevScores };
      for (const key in points) {
        newScores[key as keyof typeof newScores] += points[key as keyof typeof newScores] || 0;
      }
      return newScores;
    });

    if (currentQuestion < hardcodedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / hardcodedQuestions.length) * 100;

  return (
    // NEW: More vibrant background gradient
    <div className="p-4 md:p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-purple-100">
      {/* NEW: Wider card for more space */}
      <Card className="w-full max-w-5xl rounded-2xl shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
            >
              {/* NEW: Increased padding for more breathing room */}
              <div className="p-8 md:p-12">
                <CardHeader className="p-0 mb-8 text-center">
                  <p className="text-md font-semibold text-blue-600 mb-2 tracking-wide">
                    Question {currentQuestion + 1} of {hardcodedQuestions.length}
                  </p>
                  <CardTitle className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    {hardcodedQuestions[currentQuestion].questionText}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {hardcodedQuestions[currentQuestion].options.map((option, index) => (
                    <motion.div key={option.optionId} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        // NEW: Classes to fix text wrapping and apply colors
                        className={`w-full h-auto text-base font-medium rounded-lg transition-all duration-200 shadow-sm text-left p-5 whitespace-normal ${optionColors[index % optionColors.length]}`}
                        onClick={() => handleAnswer(option.scores)}
                      >
                        {option.text}
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </div>
              {/* Progress Bar (no changes) */}
              <div className="bg-gray-200 h-2 w-full">
                <motion.div
                  className="bg-blue-600 h-2"
                  initial={{ width: `${(currentQuestion / hardcodedQuestions.length) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          ) : (
            // --- Results UI (No changes needed here) ---
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-10 text-center"
            >
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-extrabold text-blue-700">Here's Your Career Profile!</CardTitle>
                <CardDescription className="text-gray-600 mt-2">This profile is based on your interests. Explore the paths that excite you the most.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {topResult && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className={`p-6 rounded-xl text-white flex flex-col items-center justify-center ${careerPaths[topResult].color}`}>
                      <div className="mb-4">{careerPaths[topResult].icon}</div>
                      <h3 className="text-sm font-bold tracking-widest uppercase">Your Top Match</h3>
                      <h2 className="text-3xl font-bold mt-1">{careerPaths[topResult].name}</h2>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-4 text-left">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                        Your Interest Scores
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(scores).sort((a,b) => b[1] - a[1]).map(([key, score]) => {
                          const maxScore = Math.max(...Object.values(scores));
                          const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                          const path = careerPaths[key as keyof typeof careerPaths];
                          return (
                            <div key={key} className="w-full">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-600">{path.name.split('(')[0]}</span>
                                <span className="text-sm font-bold text-gray-800">{score} pts</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <motion.div
                                  className={`${path.color} h-2.5 rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.8, delay: 0.3 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-8 text-left bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 flex items-center mb-4">
                        <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                        Paths Based on Your Top Interest
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-600 mb-2">Suggested Courses</h4>
                             <ul className="space-y-2">
                                {topResult && careerPaths[topResult].courses.map(course => (
                                  <li key={course} className="flex items-start">
                                    <Star className="h-4 w-4 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                                    <span className="text-gray-600">{course}</span>
                                  </li>
                                ))}
                              </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-600 mb-2">Job Opportunities</h4>
                            <div className="flex flex-wrap gap-2">
                                {topResult && careerPaths[topResult].jobs.map(job => (
                                <span key={job} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {job}
                                </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                  onClick={resetQuiz}
                  className="w-full md:w-auto mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
                >
                  <Repeat className="h-4 w-4 mr-2" />
                  Take Quiz Again
                </Button>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}