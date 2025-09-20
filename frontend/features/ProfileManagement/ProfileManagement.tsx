// File: ProfileManagement.tsx

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
  // Make sure your useAuth hook provides getToken, just like we planned.
  const { user, getToken } = useAuth(); // <-- CHANGE: Destructure getToken

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
    // This function now uses the secure endpoint and sends a token.
    async function fetchProfileAndAchievements() {
      // The `user` object from Firebase Auth has a `uid` property, not `id`.
      // We'll use getToken which is more direct.
      if (!user || !getToken) return; 
      
      setLoading(true);
      try {
        // --- FIX #1: FETCHING DATA SECURELY ---
        const token = await getToken(); // <-- CHANGE: Get the auth token first.

        // Fetch profile data from the new, secure endpoint.
        const res = await fetch(`/api/profile/me`, { // <-- CHANGE: URL is now /api/profile/me
          headers: {
            // Send the token in the header so our middleware can verify it.
            'Authorization': `Bearer ${token}` // <-- CHANGE: Added auth header
          }
        });

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

        // Fetch achievements (assuming getUserAchievements also uses the token now)
        // If getUserAchievements needs to be updated, you'd pass the token into it.
        const userAchievements = await getUserAchievements(user.uid); // Use user.uid
        setAchievements(userAchievements);

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileAndAchievements();
  }, [user, getToken]); // <-- CHANGE: Added getToken to dependency array

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      if (!user || !getToken) throw new Error('User not authenticated');

      // --- FIX #2: SAVING DATA SECURELY ---
      const token = await getToken(); // <-- CHANGE: Get the auth token first.

      const res = await fetch(`/api/profile/me`, { // <-- CHANGE: URL is now /api/profile/me
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Send the token to prove we have permission to save.
          'Authorization': `Bearer ${token}` // <-- CHANGE: Added auth header
        },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to save profile');
      setSuccess('Profile updated successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4 text-center">Loading profile...</p>;

  return (
    // Your JSX for the form and achievements section is perfect and does not need to change.
    // The `value={profile.name}` will correctly use the state we fetched from the API.
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text" name="name"
            value={profile.name || ''} // Using || '' is a good safety measure
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* ... all your other input fields ... */}
        <div>
          <label className="block mb-1 font-medium">School/College</label>
          <input
            type="text" name="schoolCollege"
            value={profile.schoolCollege || ''}
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

      {/* Achievements Section is correct */}
      <div className="mt-8 border-t pt-6">
        {/* ... your achievements JSX ... */}
      </div>
    </div>
  );
};

export default ProfileManagement;