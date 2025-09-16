import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  timestamp: number;
}

interface AchievementNotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const AchievementNotifications: React.FC<AchievementNotificationsProps> = ({
  notifications,
  onDismiss
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 max-w-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{notification.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 font-semibold text-sm">
                    +{notification.points} points
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing achievement notifications
export const useAchievementNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(newNotification.id);
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    dismissNotification
  };
};

export default AchievementNotifications;
