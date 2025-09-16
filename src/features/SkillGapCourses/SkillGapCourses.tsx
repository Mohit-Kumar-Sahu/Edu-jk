import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ExternalLink, Clock, Award, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../hooks/useAuth';

interface Course {
  id: string;
  title: string;
  platform: string;
  provider: string;
  skill: string;
  level: string;
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
  totalCourses: number;
}

interface SkillGapResponse {
  userSkills: string[];
  topCareers: string[];
  recommendations: SkillGapRecommendation[];
}

export function SkillGapCourses() {
  const { user } = useAuth();
  const [skillGapData, setSkillGapData] = useState<SkillGapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkillGapCourses = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Fetch user profile
        const profileResponse = await fetch(`http://localhost:3001/api/users/${user.id}`);
        if (!profileResponse.ok) throw new Error('Failed to fetch user profile');
        const userProfile = await profileResponse.json();

        // Fetch quiz results
        const quizResponse = await fetch(`http://localhost:3001/api/quiz-results/${user.id}`);
        if (!quizResponse.ok) throw new Error('Failed to fetch quiz results');
        const quizResults = await quizResponse.json();

        if (quizResults.length === 0) {
          setError('No quiz results found. Please take the career quiz first.');
          return;
        }

        // Get skill gap courses
        const skillGapResponse = await fetch('http://localhost:3001/api/skill-gap-courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userProfile,
            quizResults: quizResults[0], // Use latest quiz result
          }),
        });

        if (!skillGapResponse.ok) throw new Error('Failed to fetch skill gap courses');
        const data = await skillGapResponse.json();

        setSkillGapData(data.skillGapCourses);
      } catch (err) {
        console.error('Error fetching skill gap courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to load skill gap courses');
      } finally {
        setLoading(false);
      }
    };

    fetchSkillGapCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">Analyzing your skills and generating course recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Recommendations</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!skillGapData || skillGapData.recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Great News!</h2>
          <p className="text-gray-600">You already have the skills needed for your recommended careers.</p>
          <p className="text-gray-600">Consider exploring advanced courses or new career paths!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skill Gap Course Recommendations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your career interests and current skills, here are personalized course recommendations
            to help you bridge the gap and achieve your goals.
          </p>
        </motion.div>

        {/* User Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Current Skills
              </CardTitle>
              <CardDescription>
                Skills you've indicated you possess
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillGapData.userSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recommended Career Paths
              </CardTitle>
              <CardDescription>
                Careers that match your interests and aptitude
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillGapData.topCareers.map((career, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {career}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Course Recommendations */}
        <div className="space-y-8">
          {skillGapData.recommendations.map((rec, recIndex) => (
            <motion.div
              key={recIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + recIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Courses for {rec.career}
                    </span>
                    <Badge variant="secondary">
                      {rec.courses.length} course{rec.courses.length !== 1 ? 's' : ''}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Missing skills: {rec.missingSkills.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {rec.courses.map((course, courseIndex) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + recIndex * 0.1 + courseIndex * 0.05 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg leading-tight">
                                {course.title}
                              </CardTitle>
                              <Badge
                                variant={course.free ? "secondary" : "default"}
                                className={course.free ? "bg-green-100 text-green-800" : ""}
                              >
                                {course.free ? "Free" : "Paid"}
                              </Badge>
                            </div>
                            <CardDescription className="text-sm">
                              {course.provider} • {course.platform}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {course.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {course.level}
                              </Badge>
                            </div>
                            <Button
                              asChild
                              className="w-full"
                              size="sm"
                            >
                              <a
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                Enroll Now
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
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
