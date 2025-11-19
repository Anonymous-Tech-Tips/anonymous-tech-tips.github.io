import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    if (user) {
      inactivityTimerRef.current = setTimeout(async () => {
        await signOut(auth);
      }, INACTIVITY_TIMEOUT);
    }
  }, [user, INACTIVITY_TIMEOUT]);

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [user, resetInactivityTimer]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = async () => {
      try {
        // Ensure session-only persistence is set BEFORE Firebase restores any existing session
        await setPersistence(auth, browserSessionPersistence);

        // Clear any auth state that may have been stored with previous persistence settings
        try {
          sessionStorage.removeItem("firebase:authUser");
        } catch (e) {
          console.warn("Unable to access sessionStorage to clear Firebase auth state", e);
        }
        try {
          localStorage.removeItem("firebase:authUser");
          localStorage.removeItem("firebase:authToken");
        } catch (e) {
          console.warn("Unable to access localStorage to clear Firebase auth state", e);
        }
      } catch (error) {
        console.error("Failed to set Firebase auth persistence", error);
      } finally {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);
        });
      }
    };

    void initAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Set session-only persistence - user will be logged out when tab/browser closes
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.code === 'auth/invalid-credential' 
          ? 'Invalid email or password' 
          : error.message || 'Login failed. Please try again.'
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!user, 
      user,
      loading,
      login, 
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
