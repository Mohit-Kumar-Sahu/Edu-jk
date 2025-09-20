// File: hooks/useAuth.tsx (Corrected Version)

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification, updateProfile } from 'firebase/auth';

// Firebase config (your config is correct)
const firebaseConfig = {
  apiKey: "AIzaSyB26YTFS0P8G_stmbRAHK1uIkRqXHyZFQY",
  authDomain: "edu2career-a2bca.firebaseapp.com",
  projectId: "edu2career-a2bca",
  storageBucket: "edu2career-a2bca.firebasestorage.app",
  messagingSenderId: "780465557538",
  appId: "1:780465557538:web:e19dda74960888eb2efa7b",
  measurementId: "G-7PWES2NN46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Your User interface is correct
interface User {
  id: string;
  email: string | null;
  // ... other properties
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  getToken: () => Promise<string | null>; // <-- ADD THIS: Define the function's type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid, // This correctly maps uid to id
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName,
          phoneNumber: firebaseUser.phoneNumber,
          user_metadata: {}
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- ADD THIS FUNCTION ---
  // This is the function that securely gets the user's "ID card" (token).
  const getToken = async (): Promise<string | null> => {
    if (auth.currentUser) {
      // The 'true' argument forces a refresh if the token is about to expire.
      return await auth.currentUser.getIdToken(true);
    }
    return null;
  };

  const signIn = async (email: string, password: string) => { /* ...your existing code... */ };
  const signUp = async (email: string, password: string, metadata: any) => { /* ...your existing code... */ };
  const signOut = async () => { /* ...your existing code... */ };
  const forgotPassword = async (email: string) => { /* ...your existing code... */ };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    getToken, // <-- ADD THIS: Make the function available to your app
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { auth };