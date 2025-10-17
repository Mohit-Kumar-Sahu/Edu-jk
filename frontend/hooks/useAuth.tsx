// File: hooks/useAuth.tsx (Updated to handle roles without a backend)

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  initializeApp
} from 'firebase/app';
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

// MODIFIED: Added 'role' to the User interface
interface User {
  id: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  role: 'student' | 'teacher' | 'institution'; // This is the key addition
}

// MODIFIED: Updated signIn and signUp signatures to accept a role
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, role: 'student' | 'teacher' | 'institution') => Promise<void>;
  signUp: (email: string, password: string, metadata: any, role: 'student' | 'teacher' | 'institution') => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // MODIFIED: When a user logs in, read the role from browser memory
        const savedRole = localStorage.getItem('userRole') as User['role'] || 'student';

        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName,
          role: savedRole, // Assign the saved role here
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getToken = useCallback(async (): Promise<string | null> => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken(true);
    }
    return null;
  }, []);

  // MODIFIED: signIn now accepts a 'role' and saves it
  const signIn = async (email: string, password: string, role: 'student' | 'teacher' | 'institution') => {
    // Save the selected role to browser memory BEFORE trying to log in
    localStorage.setItem('userRole', role);
    
    // For now, we'll bypass the real Firebase login to make it always work.
    // In the future, you can uncomment the line below.
    // await signInWithEmailAndPassword(auth, email, password);
    
    // This part simulates a successful login for the demo
    const mockFirebaseUser = {
      uid: "mock-uid-" + Math.random(),
      email: email,
      emailVerified: true,
      displayName: email.split('@')[0],
      phoneNumber: null,
    };
    
    setUser({ ...mockFirebaseUser, id: mockFirebaseUser.uid, role });
  };

  // MODIFIED: signUp now accepts a 'role' and saves it
  const signUp = async (email: string, password: string, metadata: any, role: 'student' | 'teacher' | 'institution') => {
    // Save the role to browser memory
    localStorage.setItem('userRole', role);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    await sendEmailVerification(firebaseUser);
    if (metadata.name) {
      await updateProfile(firebaseUser, {
        displayName: metadata.name
      });
    }

    // We comment out the backend call for now
    /*
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        role: role, // Also send role to backend in the future
        ...metadata
      })
    });
    */
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    // MODIFIED: Clear the saved role on logout
    localStorage.removeItem('userRole');
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    getToken,
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

export {
  auth
};
