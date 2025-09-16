import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  TrendingUp,
  MapPin,
  Award,
  FileText,
  Bell,
  Target,
  Users,
  BookOpen,
  Calendar,
  ChevronRight,
  Star,
  Trophy,
  Zap,
  CheckCircle,
  Clock,
  Activity
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

export function Dashboard({ quizResults }: DashboardProps) {
  const { user } = useAuth();
  const { t } = useLocalization();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "CUET Application Open", type: "exam", urgent: true },
    { id: 2, title: "PMSSS Scholarship Deadline", type: "scholarship", urgent: false },
    { id: 3, title: "New College Added: GDC Baramulla", type: "info", urgent: false }
  ]);

  const [userPoints, setUserPoints] = useState(150);
  const [recentAchievements, setRecentAchievements] = useState([
    { id: 1, title: "First Login", description: "Welcome to Edu2Career!", icon: "🎓", points: 10, date: "2024-01-15" },
    { id: 2, title: "Profile Complete", description: "Completed your profile", icon: "👤", points: 25, date: "2024-01-16" },
    { id: 3, title: "Quiz Master", description: "Completed career assessment", icon: "🧠", points: 50, date: "2024-01-17" }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "Completed Career Quiz", time: "2 hours ago", type: "quiz" },
    { id: 2, action: "Viewed College Details", time: "1 day ago", type: "college" },
    { id: 3, action: "Updated Profile", time: "2 days ago", type: "profile" }
  ]);

  const quickActions = [
    {
      title: t('dashboard.takeQuiz'),
      description: "Discover your interests & aptitude",
      icon: <Target className="w-6 h-6" />,
      link: "/quiz",
      color: "bg-blue-500",
      completed: !!quizResults
    },
    {
      title: t('dashboard.findColleges'),
      description: "142 J&K Govt colleges",
      icon: <MapPin className="w-6 h-6" />,
      link: "/colleges",
      color: "bg-green-500",
      completed: false
    },
    {
      title: t('dashboard.applyScholarships'),
      description: "PMSSS, NSP & state schemes",
      icon: <Award className="w-6 h-6" />,
      link: "/scholarships",
      color: "bg-orange-500",
      completed: false
    },
    {
      title: t('dashboard.buildResume'),
      description: "Auto-generate professional resume",
      icon: <FileText className="w-6 h-6" />,
      link: "/resume",
      color: "bg-purple-500",
      completed: false
    }
  ];

  const upcomingDeadlines = [
    { name: "CUET Application", date: "March 15, 2024", type: "Exam" },
    { name: "PMSSS Scholarship", date: "March 20, 2024", type: "Scholarship" },
    { name: "JEE Main Registration", date: "March 25, 2024", type: "Exam" }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const profileCompletion = () => {
    const fields = [
      user?.user_metadata?.name,
      user?.email,
      user?.user_metadata?.phone,
      user?.user_metadata?.district,
      user?.user_metadata?.currentClass,
      user?.user_metadata?.stream
    ];
    const completed = fields.filter(field => field).length;
    return Math.round((completed / fields.length) * 100);
  };

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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {getGreeting()}, {user?.user_metadata?.name || 'Student'}! 👋
            </h1>
            <p className="text-blue-100 mb-4">
              Ready to explore your career journey today?
            </p>
            {quizResults && (
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-blue-100">
                  Quiz Score: {quizResults.totalScore || 'Completed'}
                </span>
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

      {/* Profile Completion & Gamification */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center justify-between">
                {t('dashboard.profileCompletion')}
                <Badge variant={profileCompletion() === 100 ? "default" : "secondary"}>
                  {profileCompletion()}%
                </Badge>
              </CardTitle>
              <CardDescription>
                {t('dashboard.completeProfile')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={profileCompletion()} className="w-full" />
                {profileCompletion() < 100 && (
                  <Link to="/profile">
                    <Button variant="outline" size="sm">
                      {t('dashboard.completeProfileButton')}
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span>{t('dashboard.gamificationPoints')}</span>
              </CardTitle>
              <CardDescription>
                {t('dashboard.earnPoints')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{userPoints}</div>
                      <div className="text-sm text-gray-600">{t('dashboard.totalPoints')}</div>
                    </div>
                  </div>
                  <Link to="/gamification">
                    <Button variant="outline" size="sm">
                      {t('dashboard.viewAll')}
                    </Button>
                  </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span>{t('dashboard.recentAchievements')}</span>
            </CardTitle>
            <CardDescription>
              {t('dashboard.latestAccomplishments')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium">
                        {achievement.title === "First Login" ? t('dashboard.firstLogin') :
                         achievement.title === "Profile Complete" ? t('dashboard.profileComplete') :
                         achievement.title === "Quiz Master" ? t('dashboard.quizMaster') :
                         achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {achievement.title === "First Login" ? t('dashboard.welcomeMessage') :
                         achievement.title === "Profile Complete" ? t('dashboard.completedProfile') :
                         achievement.title === "Quiz Master" ? t('dashboard.completedAssessment') :
                         achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-600">+{achievement.points} pts</div>
                    <div className="text-xs text-gray-500">{achievement.date}</div>
                  </div>
                </div>
              ))}
              <Link to="/gamification">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  {t('dashboard.viewAll')} {t('gamification.title')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>{t('dashboard.recentActivityTitle')}</span>
            </CardTitle>
            <CardDescription>
              {t('dashboard.latestActions')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'quiz' ? 'bg-blue-100' :
                      activity.type === 'college' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {activity.type === 'quiz' && <Target className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'college' && <MapPin className="w-4 h-4 text-green-600" />}
                      {activity.type === 'profile' && <Users className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{activity.action}</h4>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={action.link}>
                <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      {action.completed && (
                        <Badge variant="default" className="bg-green-500">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center text-blue-600 text-sm">
                      <span>{action.completed ? 'View Results' : 'Get Started'}</span>
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
                <span>Your Career Recommendations</span>
              </CardTitle>
              <CardDescription>
                Based on your quiz results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {quizResults.topCareerPaths?.slice(0, 3).map((career: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">{career.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600">Match: {career.match}%</span>
                      <Link to="/quiz-results" className="text-blue-600 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                )) || (
                  <div className="col-span-3 text-center py-4">
                    <p className="text-gray-600">Take the career quiz to see recommendations</p>
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
                <span>Upcoming Deadlines</span>
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
                    View All Notifications
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
                <span>Study Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-1">Exam Prep Corner</h4>
                  <p className="text-sm text-gray-600 mb-2">Practice tests for JEE, NEET, CUET</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-1">Career Guidance Videos</h4>
                  <p className="text-sm text-gray-600 mb-2">Expert advice from industry professionals</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-1">Alumni Connect</h4>
                  <p className="text-sm text-gray-600 mb-2">Chat with verified alumni</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
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
            <div className="text-2xl font-bold text-blue-600">142</div>
            <div className="text-sm text-gray-600">J&K Colleges</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">25+</div>
            <div className="text-sm text-gray-600">Scholarships</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">50+</div>
            <div className="text-sm text-gray-600">Career Paths</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">AI Support</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}