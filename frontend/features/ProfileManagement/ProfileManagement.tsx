import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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

const ProfileManagement = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    district: '',
    currentClass: '',
    stream: '',
    schoolCollege: ''
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchProfileAndAchievements() {
      if (!user) return;
      setLoading(true);
      try {
        // Fetch profile data
        const res = await fetch(`/api/users/${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile({
          name: data.name || '',
          phone: data.phone || '',
          district: data.district || '',
          currentClass: data.currentClass || '',
          stream: data.stream || '',
          schoolCollege: data.schoolCollege || ''
        });
        setTotalPoints(data.totalPoints || 0);

        // Fetch achievements
        const userAchievements = await getUserAchievements(user.id);
        setAchievements(userAchievements);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfileAndAchievements();
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      if (!user) throw new Error('User not authenticated');
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to save profile');
      setSuccess('Profile updated successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">District</label>
          <input
            type="text"
            name="district"
            value={profile.district}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Current Class</label>
          <input
            type="text"
            name="currentClass"
            value={profile.currentClass}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Stream</label>
          <input
            type="text"
            name="stream"
            value={profile.stream}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">School/College</label>
          <input
            type="text"
            name="schoolCollege"
            value={profile.schoolCollege}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Achievements Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>

        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">Total Points</span>
            <span className="text-2xl font-bold text-blue-600">{totalPoints}</span>
          </div>
        </div>

        {achievements.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Recent Achievements</h4>
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{achievement.title}</h5>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">+{achievement.points}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(achievement.earnedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            {achievements.length > 3 && (
              <p className="text-sm text-gray-500 text-center">
                And {achievements.length - 3} more achievements...
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <div className="text-4xl mb-2">🏆</div>
            <p>No achievements yet. Start exploring the app to earn your first badge!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;
