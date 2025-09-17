import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Target, 
  MapPin, 
  Award, 
  User
} from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization';

export function MobileNavigation() {
  const { t } = useLocalization();
  const location = useLocation();

  // Move the navigationItems array inside the component.
  // This ensures the translations update on every render.
  const navigationItems = [
    { name: t('nav_home'), href: '/dashboard', icon: Home },
    { name: t('nav_quiz'), href: '/quiz', icon: Target },
    { name: t('nav_colleges'), href: '/colleges', icon: MapPin },
    { name: t('nav_scholarships'), href: '/scholarships', icon: Award },
    { name: t('nav_profile'), href: '/profile', icon: User },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
    >
      <nav className="flex">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-blue-600' : ''}`} />
              <span className={`text-xs ${isActive ? 'text-blue-600 font-medium' : ''}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </NavLink>
          );
        })}
      </nav>
    </motion.div>
  );
}