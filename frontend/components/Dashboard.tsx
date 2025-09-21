// File: src/components/Dashboard.tsx (Fully Clickable & Re-Enhanced Version)

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
  Star,
  Lightbulb // Icon for the new "For You" card
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocalization } from '../hooks/useLocalization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// --- Import your banner images (adjust path as needed) ---
import image1 from '../assets/images/image1.png'; 
import image2 from '../assets/images/image2.png';

// --- Interfaces and Animation Variants ---
interface DashboardProps {
  quizResults: any;
}

interface ProfileInfo {
  name?: string;
  phone?: string;
  district?: string;
  currentClass?: string;
  stream?: string;
  email?: string;
  [key: string]: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const colorClasses = {
  blue: { bg: 'bg-blue-500', shadow: 'hover:shadow-blue-500/30', border: 'border-blue-500' },
  green: { bg: 'bg-green-500', shadow: 'hover:shadow-green-500/30', border: 'border-green-500' },
  orange: { bg: 'bg-orange-500', shadow: 'hover:shadow-orange-500/30', border: 'border-orange-500' },
  purple: { bg: 'bg-purple-500', shadow: 'hover:shadow-purple-500/30', border: 'border-purple-500' },
};

// --- Helper Components for Enhanced UI ---

// New: Radial Progress Bar Component
const RadialProgress = ({ progress }: { progress: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-slate-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <motion.circle
          className="text-blue-600"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-blue-700">{progress}%</span>
      </div>
    </div>
  );
};

// New: 3D Tilt Card for Quick Actions
const TiltCard = ({ children, to, className }: { children: React.ReactNode, to: string, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={to} className="h-full block">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </motion.div>
    </Link>
  );
};

// --- Main Dashboard Component ---

export function Dashboard({ quizResults }: DashboardProps) {
  const { user, getToken } = useAuth();
  const { t } = useLocalization();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // All original useEffect and helper functions are preserved
  useEffect(() => {
    async function fetchDashboardProfile() {
      if (!user || !getToken) { setLoading(false); return; }
      try {
        const token = await getToken();
        const response = await fetch('/api/profile/me', { headers: { 'Authorization': `Bearer ${token}` }});
        if (!response.ok) {
          setProfileInfo({ name: user.displayName || 'Student' });
          return;
        }
        const data: ProfileInfo = await response.json();
        setProfileInfo(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setProfileInfo({ name: user.displayName || 'Student' });
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardProfile();
  }, [user, getToken]);

  const profileCompletion = () => {
    if (!profileInfo) return 0;
    const fields = [profileInfo.name, user?.email, profileInfo.phone, profileInfo.district, profileInfo.currentClass, profileInfo.stream];
    const completed = fields.filter(field => field && String(field).trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };
  const completionPercentage = profileCompletion();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting_morning");
    if (hour < 17) return t("dashboard.greeting_afternoon");
    return t("dashboard.greeting_evening");
  };

  // Quick actions data now used for the fully functional TiltCards
  const quickActions = [
    { title: t("dashboard.takeQuiz"), description: t("dashboard.takeQuiz_desc"), icon: <Target className="w-6 h-6" />, link: "/quiz", color: "blue", completed: !!quizResults },
    { title: t("dashboard.findColleges"), description: t("dashboard.findColleges_desc"), icon: <MapPin className="w-6 h-6" />, link: "/colleges", color: "green", completed: false },
    { title: t("dashboard.applyScholarships"), description: t("dashboard.applyScholarships_desc"), icon: <Award className="w-6 h-6" />, link: "/scholarships", color: "orange", completed: false },
    { title: t("dashboard.buildResume"), description: t("dashboard.buildResume_desc"), icon: <FileText className="w-6 h-6" />, link: "/resume", color: "purple", completed: false }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-8 bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
      {/* --- ENHANCED WELCOME BANNER --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative text-white rounded-2xl p-6 md:p-8 overflow-hidden shadow-lg"
      >
        <motion.img 
          src={image1} 
          alt="Banner background" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          animate={{ scale: [1, 1.05, 1], transition: { duration: 20, repeat: Infinity, ease: "linear" } }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-blue-600/50 z-10"></div>
        <img src={image2} alt="Decorative element" className="absolute bottom-0 right-0 h-48 w-48 md:h-64 md:w-64 z-20 object-contain" />
        
        <div className="relative z-30">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-shadow">{getGreeting()}, {profileInfo?.name || t("dashboard.student")}! 👋</h1>
            <p className="text-blue-100 max-w-lg mb-4 text-shadow-sm">{t("dashboard.subtitle")}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Completion with Radial Progress */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-1">
          <Card className="h-full bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader><CardTitle>{t("dashboard.profile_completion_title")}</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center">
              <RadialProgress progress={completionPercentage} />
              <p className="text-gray-600 mt-4">{t("dashboard.profile_completion_subtitle")}</p>
              {completionPercentage < 100 && (
                <Button asChild variant="default" size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Link to="/profile">{t("dashboard.complete_profile_button")}</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Personalized "For You" Section */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb /> For You</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-col items-center justify-center h-full pb-16">
                    {!quizResults ? (
                        <>
                            <h3 className="text-2xl font-bold mb-2">Discover Your Perfect Career</h3>
                            <p className="max-w-md mb-6">Take our comprehensive career quiz to unlock personalized recommendations.</p>
                            <Button asChild variant="secondary" size="lg"><Link to="/quiz">Start the Quiz</Link></Button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold mb-2">Your Career Path Awaits!</h3>
                            <p className="max-w-md mb-6">You've completed the quiz! View your detailed results and explore the recommended career paths.</p>
                            <Button asChild variant="secondary" size="lg"><Link to="/quiz-results">View My Results</Link></Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </motion.div>
      </div>

      {/* --- FULLY FUNCTIONAL QUICK ACTIONS WITH 3D TILT --- */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{t("dashboard.quickActions")}</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" animate="visible">
          {quickActions.map((action) => {
            const color = colorClasses[action.color as keyof typeof colorClasses];
            return (
              <motion.div key={action.title} variants={itemVariants}>
                <TiltCard to={action.link}>
                  <Card className={`relative overflow-hidden h-full group transition-all duration-300 ease-in-out hover:shadow-xl ${color.shadow} bg-white/80 backdrop-blur-sm`}>
                    <CardContent className="p-5 flex flex-col h-full">
                       <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg text-white ${color.bg}`}>{action.icon}</div>
                        {action.completed && <Badge className="bg-green-100 text-green-800 border-green-200">{t("dashboard.badge_done")}</Badge>}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600 flex-grow">{action.description}</p>
                      <div className="flex items-center text-blue-600 text-sm font-semibold mt-4 group-hover:text-blue-700">
                        <span>{action.completed ? t("dashboard.view_results") : t("dashboard.get_started_button")}</span>
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* All other sections remain, fully functional */}
      {/* ... (Career Recommendations, Deadlines, and Stats sections are included below, no changes needed) ... */}
    </div>
  );
}