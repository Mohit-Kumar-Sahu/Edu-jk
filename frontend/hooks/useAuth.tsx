// File: hooks/useAuth.tsx (Full, Corrected, and Final Version)

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  updateProfile 
} from 'firebase/auth';

// Your Firebase configuration is correct and remains unchanged.
const firebaseConfig = {
  apiKey: "AIzaSyB26YTFS0P8G_stmbRAHK1uIkRqXHyZFQY",
  authDomain: "edu2career-a2bca.firebaseapp.com",
  projectId: "edu2career-a2bca",
  storageBucket: "edu2career-a2bca.firebasestorage.app",
  messagingSenderId: "780465557538",
  appId: "1:780465557538:web:e19dda74960888eb2efa7b",
  measurementId: "G-7PWES2NN46"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// This interface defines the shape of our user object, based on Firebase's auth state.
interface User {
  id: string; // Firebase's UID
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  phoneNumber: string | null;
}

// This interface defines all the values and functions our AuthProvider will share.
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  getToken: () => Promise<string | null>; // The crucial function to get the auth token
}

// Create the context that components will consume.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The AuthProvider component wraps your entire application to provide auth state.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This effect listens for changes in Firebase's authentication state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // When a user logs in, create our simplified user object.
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName,
          phoneNumber: firebaseUser.phoneNumber,
        });
      } else {
        // When a user logs out, set the user to null.
        setUser(null);
      }
      // We are finished checking the auth state.
      setLoading(false);
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  // --- THIS IS THE KEY ADDITION ---
  // This function gets the user's ID token, which is needed to authenticate with your backend.
  // We wrap it in `useCallback` to make it stable and prevent re-renders in other components.
  const getToken = useCallback(async (): Promise<string | null> => {
    if (auth.currentUser) {
      // The 'true' argument forces a token refresh if the current one is expired.
      return await auth.currentUser.getIdToken(true);
    }
    return null; // Return null if no user is logged in.
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    if (!firebaseUser.emailVerified) {
      throw new Error('Please verify your email before signing in.');
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await sendEmailVerification(firebaseUser);

    if (metadata.name) {
      await updateProfile(firebaseUser, { displayName: metadata.name });
    }

    // This call to your backend creates the user's profile in MongoDB.
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firebaseUid: firebaseUser.uid, // Use firebaseUid to match your backend model
        email: firebaseUser.email,
        ...metadata
      })
    });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // This is the "value" object that all other components in your app will receive.
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    getToken, // We've added getToken here, making it available everywhere.
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This is the custom hook that your components will use to easily access auth state.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export the auth instance if it's needed directly elsewhere.
export { auth };