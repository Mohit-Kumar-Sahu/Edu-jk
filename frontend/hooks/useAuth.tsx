import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of our user object, including the role
interface User {
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'institution';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, role: UserRole) => void;
  signUp: (formData: any, role: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On initial load, check if a user is saved in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // DUMMY SIGN-IN: Ignores password, saves user to state and localStorage
  const signIn = (email: string, role: UserRole) => {
    const mockUser: User = { 
        email, 
        role,
        name: email.split('@')[0] // Simple name for demo
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  // DUMMY SIGN-UP: Same as sign-in for this demo
  const signUp = (formData: any, role: UserRole) => {
    const mockUser: User = {
        email: formData.email,
        name: formData.name,
        role: role
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, loading, signIn, signUp, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
