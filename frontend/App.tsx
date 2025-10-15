import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage'; // Use the new landing page
import { AuthPage } from './components/AuthPage';
import { CareerQuiz } from './features/CareerQuiz/CareerQuiz';
import { CollegeLocator } from './features/CollegeLocator/CollegeLocator';
import { ScholarshipChecker } from './features/ScholarshipChecker/ScholarshipChecker';
import ProfileManagement from './features/ProfileManagement/ProfileManagement';
import { SkillGapCourses } from './features/SkillGapCourses/SkillGapCourses';
import { QuizResults } from './components/QuizResults';
import Gamification from './features/Gamification/Gamification';
import { CollegeComparison } from './features/CollegeComparison/CollegeComparison';
import { Navigation } from './components/Navigation';
import { MobileNavigation } from './components/MobileNavigation';
import { AICareerChatbot } from './components/AICareerChatbot';
import { ResumeBuilder } from './components/ResumeBuilder';
import { ApplicationTracker } from './components/ApplicationTracker';
import { NotificationCenter } from './components/NotificationCenter';
import { DashboardController } from './components/DashboardController'; // <-- STEP 1: Import the new controller
import OfflineIndicator from './components/OfflineIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useLocalStorage } from './hooks/useLocalStorage';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function AppContent() {
  const { user, loading } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [quizResults, setQuizResults] = useLocalStorage('quizResults', null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let deferredPrompt;
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          {/* STEP 2: Update branding for pan-India context */}
          <p className="text-blue-600">Loading Viksit Shiksha...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <OfflineIndicator />
        <AnimatePresence>
          {user && !isMobile && <Navigation />}
          
          <main className={`${user && !isMobile ? 'ml-64' : ''} ${user && isMobile ? 'pb-16' : ''}`}>
            <Routes>
              <Route 
                path="/" 
                element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
              />
              <Route 
                path="/auth" 
                element={user ? <Navigate to="/dashboard" /> : <AuthPage />} 
              />
              
              {/* STEP 3: Update the dashboard route to use the controller */}
              <Route 
                path="/dashboard" 
                element={user ? <DashboardController /> : <Navigate to="/auth" />} 
              />
              
              <Route
                path="/quiz"
                element={user ? <CareerQuiz onComplete={setQuizResults} /> : <Navigate to="/auth" />}
              />
              <Route 
                path="/quiz-results" 
                element={user ? <QuizResults results={quizResults} /> : <Navigate to="/auth" />} 
              />
              <Route 
                path="/colleges" 
                element={user ? <CollegeLocator /> : <Navigate to="/auth" />} 
              />
              <Route 
                path="/scholarships" 
                element={user ? <ScholarshipChecker /> : <Navigate to="/auth" />} 
              />
              <Route 
                path="/applications" 
                element={user ? <ApplicationTracker /> : <Navigate to="/auth" />} 
              />
              <Route 
                path="/resume" 
                element={user ? <ResumeBuilder /> : <Navigate to="/auth" />} 
              />
              <Route 
                path="/notifications" 
                element={user ? <NotificationCenter /> : <Navigate to="/auth" />} 
              />
              <Route
                path="/profile"
                element={user ? <ProfileManagement /> : <Navigate to="/auth" />}
              />
              <Route
                path="/skill-gap-courses"
                element={user ? <SkillGapCourses /> : <Navigate to="/auth" />}
              />
              <Route
                path="/gamification"
                element={user ? <Gamification /> : <Navigate to="/auth" />}
              />
              <Route
                path="/college-comparison"
                element={user ? <CollegeComparison /> : <Navigate to="/auth" />}
              />

              {/* Catch-all route for unknown paths */}
              <Route 
                path="*" 
                element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} 
              />
            </Routes>
          </main>

          {user && isMobile && <MobileNavigation />}
          
          {user && (
            <AICareerChatbot />
          )}
        </AnimatePresence>

        {/* Floating Chatbot Button */}
        {user && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChatbot(true)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.button>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <AppContent />
      </I18nextProvider>
    </AuthProvider>
  );
}

export default App;
