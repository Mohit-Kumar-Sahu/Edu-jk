import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface PointsData {
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  rank: number;
  nextMilestone: number;
}

const PointsTracker: React.FC = () => {
  const { user } = useAuth();
  const [pointsData, setPointsData] = useState<PointsData>({
    totalPoints: 0,
    weeklyPoints: 0,
    monthlyPoints: 0,
    rank: 0,
    nextMilestone: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real implementation, fetch from API
    if (user) {
      // Simulate API call
      setTimeout(() => {
        setPointsData({
          totalPoints: 245,
          weeklyPoints: 45,
          monthlyPoints: 120,
          rank: 12,
          nextMilestone: 300
        });
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  const progressPercentage = (pointsData.totalPoints / pointsData.nextMilestone) * 100;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Points</h3>
        <div className="text-2xl font-bold text-blue-600">{pointsData.totalPoints}</div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">This Week</span>
          <span className="font-semibold text-green-600">+{pointsData.weeklyPoints}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">This Month</span>
          <span className="font-semibold text-green-600">+{pointsData.monthlyPoints}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Current Rank</span>
          <span className="font-semibold">#{pointsData.rank}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress to next milestone</span>
          <span>{pointsData.totalPoints}/{pointsData.nextMilestone}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          {pointsData.nextMilestone - pointsData.totalPoints} more points to reach the next milestone!
        </p>
      </div>
    </div>
  );
};

export default PointsTracker;
