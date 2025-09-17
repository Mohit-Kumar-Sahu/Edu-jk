import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Corrected import
import {
  GraduationCap,
  Home,
  Target,
  MapPin,
  Award,
  FileText,
  Bell,
  User,
  LogOut,
  MessageCircle,
  Briefcase,
  BookOpen,
  Trophy
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocalization } from '../hooks/useLocalization';
import { Button } from './ui/button';
import LanguageSwitcher from './LanguageSwitcher';

export function Navigation() {
  const { user, signOut } = useAuth();
  const { t } = useLocalization();
  const location = useLocation();

  const navigationItems = [
    { name: t('navigation.dashboard'), href: '/dashboard', icon: Home },
    { name: t('navigation.careerQuiz'), href: '/quiz', icon: Target },
    { name: t('navigation.skillGapCourses'), href: '/skill-gap-courses', icon: BookOpen },
    { name: t('navigation.gamification'), href: '/gamification', icon: Trophy },
    { name: t('navigation.colleges'), href: '/colleges', icon: MapPin },
    { name: t('navigation.scholarships'), href: '/scholarships', icon: Award },
    { name: t('navigation.applications'), href: '/applications', icon: Briefcase },
    { name: t('navigation.resume'), href: '/resume', icon: FileText },
    { name: t('navigation.notifications'), href: '/notifications', icon: Bell },
    { name: t('navigation.profile'), href: '/profile', icon: User },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-40 border-r border-gray-200"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Edu2Career J&K</h1>
                <p className="text-xs text-gray-600">Career Navigator</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.user_metadata?.name || 'Student'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user?.user_metadata?.district || 'Jammu & Kashmir'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* AI Chatbot Link */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">AI Career Assistant</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              Get instant answers to your career questions
            </p>
            <div className="flex items-center text-xs text-blue-600">
              <span>Available 24/7</span>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('navigation.logout')}</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}