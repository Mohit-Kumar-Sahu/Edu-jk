import React, { useState } from 'react';
import BadgeSystem from './BadgeSystem';
import Leaderboard from './Leaderboard';
import PointsTracker from './PointsTracker';
import AchievementNotifications, { useAchievementNotifications } from './AchievementNotifications';

const Gamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard'>('badges');
  const { notifications, addNotification, dismissNotification } = useAchievementNotifications();

  const tabs = [
    { id: 'badges', label: 'My Badges', icon: '🏆' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AchievementNotifications
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Gamification Center</h1>
          <p className="text-gray-600">Track your progress, earn achievements, and compete with others!</p>
        </div>

        {/* Points Tracker - Always visible */}
        <div className="mb-8">
          <PointsTracker />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'badges' | 'leaderboard')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {activeTab === 'badges' && <BadgeSystem />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Take Career Quiz</h3>
            <p className="text-sm text-gray-600 mb-4">Earn 50 points and unlock achievements</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Start Quiz
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="font-semibold text-gray-800 mb-2">Browse Courses</h3>
            <p className="text-sm text-gray-600 mb-4">Enroll and earn 30 points per course</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              View Courses
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">🏫</div>
            <h3 className="font-semibold text-gray-800 mb-2">Explore Colleges</h3>
            <p className="text-sm text-gray-600 mb-4">Apply and earn 25 points</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Find Colleges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
