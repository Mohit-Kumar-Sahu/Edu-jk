// File: src/components/Dashboard.tsx (Fully Modified Version)

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  TrendingUp, 
  MapPin, 
  Award, 
  FileText, 
  Target,
  BookOpen,
  Calendar,
  ChevronRight,
  Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocalization } from '../hooks/useLocalization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface DashboardProps {
  quizResults: any;
}

// Define a TypeScript interface for the structure of our fetched profile data.
// This helps prevent bugs by ensuring we use the correct property names.
interface ProfileInfo {
  name?: string;
  phone?: string;
  district?: string;
  currentClass?: string;
  stream?: string;
  email?: string; // It's good practice to include all expected fields.
  [key: string]: any; // Allows for any other properties that might come from the API.
}

export function Dashboard({ quizResults }: DashboardProps) {
  // 1. Get the 'getToken' function and manage new state variables.
  const { user, getToken } = useAuth();
  const { t } = useLocalization();
  
  // State to hold the live profile data fetched from the database.
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  // State to show a loading message while data is being fetched.
  const [loading, setLoading] = useState(true);

  // 2. Fetch the user's live profile data when the component loads.
  useEffect(() => {
    async function fetchDashboardProfile() {
      // We can't fetch data without a logged-in user and the getToken function.
      if (!user || !getToken) {
        setLoading(false); // Stop loading if there's no user.
        return;
      }
      
      try {
        const token = await getToken();
        const response = await fetch('/api/profile/me', {
          headers: {
            'Authorization': `Bearer ${token}` // Send the auth token for verification.
          }
        });

        if (!response.ok) {
          // If the profile doesn't exist in the DB (e.g., a new user),
          // we'll use the basic info from the auth object as a fallback.
          console.warn('Could not fetch profile for dashboard, using default auth info.');
          setProfileInfo({ name: user.displayName || 'Student' });
          return;
        }

        const data: ProfileInfo = await response.json();
        setProfileInfo(data); // Store the fetched live data in our state.
      } catch (error) {
        console.error("Failed to fetch profile for dashboard:", error);
        // In case of a network error, also use fallback data.
        setProfileInfo({ name: user.displayName || 'Student' });
      } finally {
        setLoading(false); // Stop the loading indicator.
      }
    }

    fetchDashboardProfile();
  }, [user, getToken]); // This code re-runs if the user logs in or out.

  // 3. Update the profile completion logic to use the new, live data.
  const profileCompletion = () => {
    // If profileInfo hasn't loaded yet, the completion is 0%.
    if (!profileInfo) return 0;

    const fields = [
      profileInfo.name,
      user?.email, // Email is reliable from the core 'user' object.
      profileInfo.phone,
      profileInfo.state, 
      profileInfo.currentClass,
      profileInfo.stream
    ];
    // Count how many of the fields are not empty.
    const completed = fields.filter(field => field && String(field).trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  // --- No changes needed for the functions and data below ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting_morning");
    if (hour < 17) return t("dashboard.greeting_afternoon");
    return t("dashboard.greeting_evening");
  };

  const quickActions = [
    { title: t("dashboard.takeQuiz"), description: t("dashboard.takeQuiz_desc"), icon: <Target className="w-6 h-6" />, link: "/quiz", color: "bg-blue-500", completed: !!quizResults },
    { title: t("dashboard.findColleges"), description: t("dashboard.findColleges_desc"), icon: <MapPin className="w-6 h-6" />, link: "/colleges", color: "bg-green-500", completed: false },
    { title: t("dashboard.applyScholarships"), description: t("dashboard.applyScholarships_desc"), icon: <Award className="w-6 h-6" />, link: "/scholarships", color: "bg-orange-500", completed: false },
    { title: t("dashboard.buildResume"), description: t("dashboard.buildResume_desc"), icon: <FileText className="w-6 h-6" />, link: "/resume", color: "bg-purple-500", completed: false }
  ];

  const upcomingDeadlines = [
    { name: t("dashboard.deadline_cuet_name"), date: "March 15, 2026", type: t("dashboard.deadline_exam_type") },
    { name: t("dashboard.deadline_pmsss_name"), date: "March 20, 2026", type: t("dashboard.deadline_scholarship_type") },
    { name: t("dashboard.deadline_jee_name"), date: "March 25, 2026", type: t("dashboard.deadline_exam_type") }
  ];

  // Show a loading message while we're fetching the user's data.
  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading your dashboard...</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            {/* 4. Update the welcome message to use the live name. */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {getGreeting()}, {profileInfo?.name || t("dashboard.student")}! 👋
            </h1>
            <p className="text-blue-100 mb-4">{t("dashboard.subtitle")}</p>
            {quizResults && (
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-blue-100">{t("dashboard.quiz_score", { score: quizResults.totalScore || t("dashboard.completed") })}</span>
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Completion (This section now displays the live, accurate percentage) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t("dashboard.profile_completion_title")}
              <Badge variant={profileCompletion() === 100 ? "default" : "secondary"}>
                {profileCompletion()}%
              </Badge>
            </CardTitle>
            <CardDescription>{t("dashboard.profile_completion_subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={profileCompletion()} className="w-full" />
              {profileCompletion() < 100 && (
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    {t("dashboard.complete_profile_button")}
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-semibold mb-4">{t("dashboard.quickActions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div key={index} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to={action.link}>
                <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${action.color} text-white`}>{action.icon}</div>
                      {action.completed && <Badge variant="default" className="bg-green-500">{t("dashboard.badge_done")}</Badge>}
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center text-blue-600 text-sm">
                      <span>{action.completed ? t("dashboard.view_results") : t("dashboard.get_started_button")}</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Career Recommendations */}
      {quizResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>{t("dashboard.recommendations_title")}</span>
              </CardTitle>
              <CardDescription>
                {t("dashboard.recommendations_subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {quizResults.topCareerPaths?.slice(0, 3).map((career: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">{career.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600">{t("dashboard.match_label", { match: career.match })}</span>
                      <Link to="/quiz-results" className="text-blue-600 hover:underline">
                        {t("dashboard.view_details")}
                      </Link>
                    </div>
                  </div>
                )) || (
                  <div className="col-span-3 text-center py-4">
                    <p className="text-gray-600">{t("dashboard.no_recommendations")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>{t("dashboard.upcoming_deadlines_title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">{deadline.name}</p>
                      <p className="text-sm text-gray-600">{deadline.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">{deadline.date}</p>
                    </div>
                  </div>
                ))}
                <Link to="/notifications">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    {t("dashboard.view_all_notifications")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span>{t("dashboard.study_resources_title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-1">{t("dashboard.exam_prep_title")}</h4>
                  <p className="text-sm text-gray-600 mb-2">{t("dashboard.exam_prep_desc")}</p>
                  <Button variant="outline" size="sm">{t("dashboard.coming_soon")}</Button>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-1">{t("dashboard.videos_title")}</h4>
                  <p className="text-sm text-gray-600 mb-2">{t("dashboard.videos_desc")}</p>
                  <Button variant="outline" size="sm">{t("dashboard.coming_soon")}</Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-1">{t("dashboard.alumni_title")}</h4>
                  <p className="text-sm text-gray-600 mb-2">{t("dashboard.alumni_desc")}</p>
                  <Button variant="outline" size="sm">{t("dashboard.coming_soon")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{t("dashboard.stats_college_count")}</div>
            <div className="text-sm text-gray-600">{t("dashboard.stats_college_label")}</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{t("dashboard.stats_scholarship_count")}</div>
            <div className="text-sm text-gray-600">{t("dashboard.stats_scholarship_label")}</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{t("dashboard.stats_career_count")}</div>
            <div className="text-sm text-gray-600">{t("dashboard.stats_career_label")}</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{t("dashboard.stats_ai_count")}</div>
            <div className="text-sm text-gray-600">{t("dashboard.stats_ai_label")}</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
