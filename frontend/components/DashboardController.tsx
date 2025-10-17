import React from 'react';
import { useAuth } from '../hooks/useAuth';

// Import all three of your dashboard components
import { Dashboard as StudentDashboard } from './Dashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { InstitutionDashboard } from './InstitutionDashboard';

export function DashboardController() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading Dashboard...</div>;
  }

  // This will now correctly check the role from the logged-in user object
  // and render the right dashboard.
  switch (user?.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'institution':
      return <InstitutionDashboard />;
    case 'student':
    default:
      // We pass `quizResults={null}` as the student dashboard expects it.
      return <StudentDashboard quizResults={null} />;
  }
}
