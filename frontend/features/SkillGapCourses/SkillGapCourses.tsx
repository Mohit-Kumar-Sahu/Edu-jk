"use-client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Clock, Award, Users, Target, CheckCircle, BarChart, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

// --- INTERFACES & MOCK DATA ---

interface Course {
  id: string;
  title: string;
  platform: string;
  provider: string;
  skill: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  url: string;
  description: string;
  free: boolean;
}

interface SkillGapRecommendation {
  career: string;
  requiredSkills: string[];
  missingSkills: string[];
  courses: Course[];
}

interface SkillGapResponse {
  userSkills: string[];
  topCareers: string[];
  recommendations: SkillGapRecommendation[];
}

// Hardcoded mock data to replace API calls
const mockSkillGapData: SkillGapResponse = {
  userSkills: ['Python', 'SQL', 'Problem Solving', 'Communication'],
  topCareers: ['Data Scientist', 'AI Engineer', 'Backend Developer'],
  recommendations: [
    {
      career: 'Data Scientist',
      requiredSkills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
      missingSkills: ['Statistics', 'Machine Learning', 'Data Visualization'],
      courses: [
        { id: 'ds1', title: 'Machine Learning A-Z™: AI, Python & R', platform: 'Udemy', provider: 'Kirill Eremenko', skill: 'Machine Learning', level: 'Beginner', duration: '44 hours', url: '#', free: false, description: 'Learn to create Machine Learning algorithms in Python and R from two Data Science experts. Code templates included.' },
        { id: 'ds2', title: 'Data Visualization with Python', platform: 'Coursera', provider: 'IBM', skill: 'Data Visualization', level: 'Beginner', duration: '19 hours', url: '#', free: true, description: 'Learn to create compelling visualizations and build interactive dashboards using Python libraries like Matplotlib, Seaborn, and Folium.' },
        { id: 'ds3', title: 'Statistics with Python Specialization', platform: 'Coursera', provider: 'University of Michigan', skill: 'Statistics', level: 'Intermediate', duration: '3 months', url: '#', free: false, description: 'Master statistical learning techniques, from linear regression to advanced topics like non-linear modeling.' },
      ],
    },
    {
      career: 'AI Engineer',
      requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Natural Language Processing'],
      missingSkills: ['Deep Learning', 'Natural Language Processing', 'Machine Learning'],
      courses: [
        { id: 'ai1', title: 'Deep Learning Specialization', platform: 'Coursera', provider: 'DeepLearning.AI', skill: 'Deep Learning', level: 'Intermediate', duration: '4 months', url: '#', free: false, description: 'Build and train deep neural networks, identify key architecture parameters, and apply deep learning to solve real-world problems.' },
        { id: 'ai2', title: 'Natural Language Processing Specialization', platform: 'Coursera', provider: 'DeepLearning.AI', skill: 'Natural Language Processing', level: 'Intermediate', duration: '3 months', url: '#', free: true, description: 'Learn to design and implement cutting-edge NLP models for tasks like sentiment analysis, summarization, and question answering.' },
        { id: 'ai3', title: 'TensorFlow Developer Certificate', platform: 'Udemy', provider: 'Daniel Bourke', skill: 'Deep Learning', level: 'Advanced', duration: '50 hours', url: '#', free: false, description: 'A comprehensive guide to prepare for the official TensorFlow Developer Certificate exam and become a certified developer.' },
      ],
    },
  ],
};

const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800',
};


// --- MAIN COMPONENT ---

export function SkillGapCourses() {
  const skillGapData = mockSkillGapData; // Use hardcoded data directly

  if (!skillGapData) {
     // This part can be used as a fallback if data structure is ever invalid
    return <div className="text-center p-8">No recommendation data available.</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Learning Pathway</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bridge the gap between your current skills and your dream career with these curated course recommendations.
          </p>
        </motion.div>

        {/* --- DASHBOARD SUMMARY --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card className="h-full shadow-lg border-t-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-full"><CheckCircle className="w-6 h-6 text-blue-600" /></div>
                  Your Current Skills
                </CardTitle>
                <CardDescription>A snapshot of the skills you already possess.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGapData.userSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-base px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card className="h-full shadow-lg border-t-4 border-teal-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-teal-100 rounded-full"><Award className="w-6 h-6 text-teal-600" /></div>
                  Top Career Matches
                </CardTitle>
                 <CardDescription>Career paths that align with your profile and interests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGapData.topCareers.map((career) => (
                    <Badge key={career} variant="secondary" className="text-base px-3 py-1 bg-teal-100 text-teal-800 border border-teal-200">
                      {career}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* --- COURSE RECOMMENDATIONS --- */}
        <div className="space-y-12">
          {skillGapData.recommendations.map((rec, recIndex) => (
            <motion.div
              key={recIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + recIndex * 0.2, duration: 0.6 }}
            >
              <Card className="shadow-xl overflow-hidden">
                <CardHeader className="bg-gray-50/50 p-6 border-b">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <BrainCircuit className="w-7 h-7 text-blue-600" />
                    Learning Plan for: {rec.career}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2 text-md">
                     <Target className="w-5 h-5 text-red-500" />
                     <strong className="text-gray-600 mr-2">Skills to learn:</strong> 
                     <div className="flex flex-wrap gap-2">
                      {rec.missingSkills.map(skill => 
                        <Badge key={skill} className="text-sm bg-red-100 text-red-800 border-red-200">{skill}</Badge>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rec.courses.map((course, courseIndex) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + recIndex * 0.2 + courseIndex * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
                        className="h-full"
                      >
                        <Card className="h-full flex flex-col transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <span className="font-semibold text-gray-500 text-sm">{course.provider}</span>
                                <Badge variant={course.free ? "secondary" : "default"} className={course.free ? "bg-green-100 text-green-800" : "bg-indigo-100 text-indigo-800"}>
                                    {course.free ? "Free" : "Paid"}
                                </Badge>
                            </div>
                            <CardTitle className="text-lg leading-tight text-gray-900">
                              {course.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col justify-between pt-0">
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                              {course.description}
                            </p>
                            <div className="space-y-4">
                               <div className="flex items-center justify-between text-sm text-gray-500">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.duration}</span>
                                  </div>
                                  <Badge variant="outline" className={`text-xs font-medium ${levelColors[course.level]}`}>
                                    {course.level}
                                  </Badge>
                                </div>
                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    View Course <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}