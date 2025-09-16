import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { HelpCenter } from './components/HelpCenter';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Feedback } from './components/Feedback';
import { AuthPage } from './components/AuthPage';
import { CareerQuizContainer } from './features/CareerQuiz/CareerQuizContainer';
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
import { Dashboard } from './components/Dashboard';
import OfflineIndicator from './components/OfflineIndicator';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useLocalStorage } from './hooks/useLocalStorage';

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

  // PWA Installation prompt
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
          <p className="text-blue-600">Loading Edu2Career J&K...</p>
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
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard quizResults={quizResults} /> : <Navigate to="/auth" />} 
              />
              <Route
                path="/quiz"
                element={user ? <CareerQuizContainer /> : <Navigate to="/auth" />}
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
              {/* New public routes for footer pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/feedback" element={<Feedback />} />
              {/* Catch-all route for unknown paths */}
              <Route 
                path="*" 
                element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} 
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
      <AppContent />
    </AuthProvider>
  );
}

export default App;
