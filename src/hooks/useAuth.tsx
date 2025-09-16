import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, type User as FirebaseUser } from 'firebase/auth';

// Firebase config
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

interface User {
  id: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  phoneNumber: string | null;
  user_metadata: {
    name?: string;
    phone?: string;
    district?: string;
    currentClass?: string;
    stream?: string;
    schoolCollege?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName,
          phoneNumber: firebaseUser.phoneNumber,
          user_metadata: {} // Will be populated from DB if needed
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Check if email is verified
    if (!firebaseUser.emailVerified) {
      throw new Error('Please verify your email before signing in.');
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Send email verification
      await sendEmailVerification(firebaseUser);

      // Update display name
      if (metadata.name) {
        await updateProfile(firebaseUser, { displayName: metadata.name });
      }

      // Store user data in MongoDB
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...metadata
        })
      });
    } catch (error) {
      console.error('Firebase signUp error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Store user data in MongoDB if new user
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        provider: 'google'
      })
    });
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Store user data in MongoDB if new user
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        provider: 'facebook'
      })
    });
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    signInWithGoogle,
    signInWithFacebook,
    resendVerificationEmail,
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

// Export auth client for other components
export { auth };
