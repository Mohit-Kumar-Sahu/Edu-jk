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
          // For now, we will manually set the role for demonstration
          // In a real app, 'data.role' would come from your database
          
          // ---- FOR TESTING ----
          // Uncomment one of these lines to test different dashboards
          data.role = 'student'; 
          // data.role = 'teacher';
          // data.role = 'institution';
          // -------------------

          setProfile(data);
        } else {
          // Default to student if profile fetch fails
          setProfile({ role: 'student' });
        }
      } catch (error) {
        console.error("Failed to fetch profile role:", error);
        setProfile({ role: 'student' }); // Default to student on error
      } finally {
        setLoading(false);
      }
    }

    fetchProfileRole();
  }, [user, getToken]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading dashboard...</div>;
  }

  // This is where the magic happens!
  // We check the role and render the correct component.
  switch (profile?.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'institution':
      return <InstitutionDashboard />;
    case 'student':
    default:
      // We pass the `quizResults` prop to the student dashboard as it expects it
      return <StudentDashboard quizResults={null} />;
  }
}
