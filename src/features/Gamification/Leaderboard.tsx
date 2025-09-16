import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getLeaderboard } from '../../api/achievements';

interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  achievements: number;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 border-yellow-300';
      case 2:
        return 'bg-gray-100 border-gray-300';
      case 3:
        return 'bg-orange-100 border-orange-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

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
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h3 className="text-lg font-semibold">Top Performers</h3>
          <p className="text-blue-100">Earn points by completing activities and earning achievements</p>
        </div>

        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.userId}
              className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                user && entry.userId === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRankColor(entry.rank)} border-2`}>
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{entry.name}</h4>
                  <p className="text-sm text-gray-500">{entry.achievements} achievements</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{entry.points}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>

        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No data yet</h3>
            <p className="text-gray-500">Be the first to earn points and appear on the leaderboard!</p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">How Points Work</h3>
        <ul className="text-green-700 space-y-1">
          <li>• Complete career quiz: +50 points</li>
          <li>• Enroll in skill gap course: +30 points</li>
          <li>• Apply to college: +25 points</li>
          <li>• Update profile: +10 points</li>
          <li>• Daily app usage: +5 points</li>
          <li>• Achievement unlocked: +20-100 points (varies)</li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
