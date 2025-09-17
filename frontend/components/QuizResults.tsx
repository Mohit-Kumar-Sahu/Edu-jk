import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Download, 
  Share2, 
  ChevronRight,
  Star,
  Brain,
  Users,
  Briefcase,
  BookOpen,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useLocalization } from '../hooks/useLocalization'; // Import the localization hook

interface QuizResultsProps {
  results: any;
}

export function QuizResults({ results }: QuizResultsProps) {
  const { t } = useLocalization();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('no_results_title')}</h2>
          <p className="text-gray-600 mb-6">{t('no_results_message')}</p>
          <Link to="/quiz">
            <Button>{t('button_take_quiz')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Prepare radar chart data
  const radarData = results.topInterests?.map((interest: any) => ({
    category: t(`riasec_${interest.name.toLowerCase()}`),
    score: interest.score
  })) || [];

  // Use a map of keys to handle descriptions
  const riasecDescriptions: { [key: string]: string } = {
    'Realistic': t('riasec_desc_realistic'),
    'Investigative': t('riasec_desc_investigative'),
    'Artistic': t('riasec_desc_artistic'),
    'Social': t('riasec_desc_social'),
    'Enterprising': t('riasec_desc_enterprising'),
    'Conventional': t('riasec_desc_conventional')
  };

  const getRecommendedCourses = (topInterests: any[]) => {
    const courseDatabase: { [key: string]: string[] } = {
      'Realistic': [t('course_btech_civil'), t('course_bsc_agriculture'), t('course_diploma_mech')],
      'Investigative': [t('course_btech_cs'), t('course_bsc_physics'), t('course_bsc_math')],
      'Artistic': [t('course_ba_fine_arts'), t('course_bdes'), t('course_ba_english')],
      'Social': [t('course_bed'), t('course_ba_psychology'), t('course_bsw')],
      'Enterprising': [t('course_bba'), t('course_bcom'), t('course_ba_economics')],
      'Conventional': [t('course_bcom_acc'), t('course_bca'), t('course_ba_public_admin')]
    };

    const courses: string[] = [];
    topInterests.forEach(interest => {
      if (courseDatabase[interest.name]) {
        courses.push(...courseDatabase[interest.name]);
      }
    });

    return [...new Set(courses)].slice(0, 6);
  };

  const recommendedCourses = getRecommendedCourses(results.topInterests || []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('results_header_title')}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {t('results_header_subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{t('button_download_report')}</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>{t('button_share_results')}</span>
            </Button>
          </div>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('overall_score_title')}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold">{results.totalScore}%</div>
                    <div className="text-blue-100">
                      <p>{t('overall_score_message')}</p>
                      <p className="text-sm">{t('overall_score_subtitle')}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Star className="w-12 h-12 text-yellow-300 mb-2" />
                  <p className="text-sm text-blue-100">{t('overall_score_encouragement')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interest Profile & Aptitude Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Interest Profile Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>{t('interest_profile_title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} />
                      <Radar
                        name={t('interest_score_radar_name')}
                        dataKey="score"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Top Interest */}
                {results.topInterests?.[0] && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {t('primary_interest_title', { name: t(`riasec_${results.topInterests[0].name.toLowerCase()}`)})}
                    </h4>
                    <p className="text-sm text-blue-700">
                      {riasecDescriptions[results.topInterests[0].name as keyof typeof riasecDescriptions]}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Aptitude Scores */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span>{t('aptitude_title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {results.aptitudeScore}%
                  </div>
                  <p className="text-gray-600">{t('aptitude_overall_score')}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('aptitude_numerical')}</span>
                      <span>{Math.max(results.aptitudeScore - 10, 0)}%</span>
                    </div>
                    <Progress value={Math.max(results.aptitudeScore - 10, 0)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('aptitude_verbal')}</span>
                      <span>{Math.min(results.aptitudeScore + 5, 100)}%</span>
                    </div>
                    <Progress value={Math.min(results.aptitudeScore + 5, 100)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('aptitude_logical')}</span>
                      <span>{results.aptitudeScore}%</span>
                    </div>
                    <Progress value={results.aptitudeScore} />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>{t('aptitude_strength_label')}:</strong> {t('aptitude_strength_desc')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Career Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span>{t('recommended_careers_title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.topCareerPaths?.map((career: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-blue-600">{career.title}</h4>
                      <Badge variant="secondary">{t('match_score', { match: career.match })}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                    <div className="flex items-center justify-between">
                      <Progress value={career.match} className="flex-1 mr-2" />
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span>{t('recommended_courses_title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {recommendedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="p-3 bg-purple-50 rounded-lg border border-purple-100"
                  >
                    <h4 className="font-medium text-purple-900">{course}</h4>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">{t('next_steps_title')}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/colleges">
                    <Button className="w-full flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{t('button_find_colleges')}</span>
                    </Button>
                  </Link>
                  <Link to="/scholarships">
                    <Button variant="outline" className="w-full flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{t('button_check_scholarships')}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('action_explore_colleges_title')}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('action_explore_colleges_desc')}
              </p>
              <Link to="/colleges">
                <Button variant="outline" size="sm">{t('action_explore_now')}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('action_apply_scholarships_title')}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('action_apply_scholarships_desc')}
              </p>
              <Link to="/scholarships">
                <Button variant="outline" size="sm">{t('action_check_now')}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('action_get_guidance_title')}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('action_get_guidance_desc')}
              </p>
              <Button variant="outline" size="sm">{t('action_chat_now')}</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}