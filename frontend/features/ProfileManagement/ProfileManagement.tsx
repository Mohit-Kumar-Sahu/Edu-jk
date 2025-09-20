// File: src/components/ProfileManagement.tsx (Final Updated Version)

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserAchievements } from '../../api/achievements';

// Interface for the structure of an achievement object
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
}

const ProfileManagement = () => {
  // Destructure 'user' and the essential 'getToken' function from your auth hook
  const { user, getToken } = useAuth();

  // State to hold the user's profile data for the form
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    district: '',
    currentClass: '',
    stream: '',
    schoolCollege: ''
  });

  // States for managing achievements, loading status, and messages
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // This effect runs when the component loads to fetch all necessary data
  useEffect(() => {
    async function fetchProfileAndAchievements() {
      if (!user || !getToken) return; // Wait until user and getToken are available
      
      setLoading(true);
      setError(''); // Clear previous errors

      try {
        // 1. Get the authentication token (the "ID card")
        const token = await getToken();

        // 2. Fetch profile data from the secure '/api/profile/me' endpoint
        const profileRes = await fetch(`/api/profile/me`, {
          headers: {
            'Authorization': `Bearer ${token}` // Provide the token for verification
          }
        });

        if (!profileRes.ok) throw new Error('Failed to fetch your profile data.');
        
        const data = await profileRes.json();

        // 3. Populate the form with the fetched data
        setProfile({
          name: data.name || '',
          phone: data.phone || '',
          district: data.district || '',
          currentClass: data.currentClass || '',
          stream: data.stream || '',
          schoolCollege: data.schoolCollege || ''
        });
        setTotalPoints(data.totalPoints || 0);

        // 4. Fetch achievements using the user's ID
        const userAchievements = await getUserAchievements(user.id);
        setAchievements(userAchievements);

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfileAndAchievements();
  }, [user, getToken]); // Rerun this effect if the user or getToken function changes

  // Handles changes in any of the form's input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handles the form submission to save the profile data
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !getToken) {
      setError('You are not authenticated.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // 1. Get the authentication token
      const token = await getToken();

      // 2. Send the updated profile data to the secure endpoint
      const res = await fetch(`/api/profile/me`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Provide the token to authorize the save
        },
        body: JSON.stringify(profile)
      });

      if (!res.ok) throw new Error('Failed to save your profile. Please try again.');
      
      setSuccess('Profile updated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // Display a loading message while fetching initial data
  if (loading) {
    return <p className="p-4 text-center">Loading your profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
      {error && <p className="text-red-600 mb-2 p-3 bg-red-50 rounded">{error}</p>}
      {success && <p className="text-green-600 mb-2 p-3 bg-green-50 rounded">{success}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={profile.phone || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="district" className="block mb-1 font-medium">District</label>
          <input
            id="district"
            type="text"
            name="district"
            value={profile.district || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="currentClass" className="block mb-1 font-medium">Current Class</label>
          <input
            id="currentClass"
            type="text"
            name="currentClass"
            value={profile.currentClass || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="stream" className="block mb-1 font-medium">Stream</label>
          <input
            id="stream"
            type="text"
            name="stream"
            value={profile.stream || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="schoolCollege" className="block mb-1 font-medium">School/College</label>
          <input
            id="schoolCollege"
            type="text"
            name="schoolCollege"
            value={profile.schoolCollege || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <div className="text-4xl mb-2">🏆</div>
            <p>No achievements yet. Start exploring to earn your first badge!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;