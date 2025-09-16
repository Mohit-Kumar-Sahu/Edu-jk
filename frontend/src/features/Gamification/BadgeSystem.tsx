import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserAchievements } from '../../api/achievements';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
}

const BadgeSystem: React.FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;
      try {
        const data = await getUserAchievements(user.id);
        setAchievements(data);
      } catch (err) {
        setError('Failed to load achievements');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Achievements</h2>

      {achievements.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No achievements yet</h3>
          <p className="text-gray-500">Complete quizzes, courses, and other activities to earn badges!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>+{achievement.points} points</span>
                <span>{new Date(achievement.earnedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Earn More Badges</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Complete career assessment quizzes</li>
          <li>• Enroll in skill gap courses</li>
          <li>• Apply to colleges and scholarships</li>
          <li>• Update your profile information</li>
          <li>• Use the app regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default BadgeSystem;
