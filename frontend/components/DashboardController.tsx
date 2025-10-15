import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

// Import all three of your dashboard components
import { Dashboard as StudentDashboard } from './Dashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { InstitutionDashboard } from './InstitutionDashboard';

interface ProfileInfo {
  role?: 'student' | 'teacher' | 'institution';
  [key: string]: any;
}

export function DashboardController() {
  const { user, getToken } = useAuth();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileRole() {
      if (!user || !getToken) {
        setLoading(false);
        return;
      }
      try {
        const token = await getToken();
        const response = await fetch('/api/profile/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data: ProfileInfo = await response.json();
          // The 'data.role' from your database will now be used directly.
          setProfile(data); 
        } else {
          // Default to student if profile fetch fails or doesn't exist
          console.warn("Could not fetch user profile. Defaulting to student role.");
          setProfile({ role: 'student' });
        }
      } catch (error) {
        console.error("Failed to fetch profile role:", error);
        setProfile({ role: 'student' }); // Default to student on any error
      } finally {
        setLoading(false);
      }
    }

    fetchProfileRole();
  }, [user, getToken]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading Your Personalized Dashboard...</div>;
  }

  // This will now correctly check the role from the database and render the right dashboard.
  switch (profile?.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'institution':
      return <InstitutionDashboard />;
    case 'student':
    default:
      // We pass `quizResults={null}` as a placeholder prop as the student dashboard expects it.
      return <StudentDashboard quizResults={null} />;
  }
}
