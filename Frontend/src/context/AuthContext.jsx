import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../utils/firebase"; // Firebase setup
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial auth check
  const [authLoading, setAuthLoading] = useState(false); // For signup/login button states
  const [error, setError] = useState(null); // For auth errors

  // Save JWT to localStorage
  const saveToken = async (firebaseUser) => {
    if (!firebaseUser) return;
    const token = await firebaseUser.getIdToken();
    localStorage.setItem("jwt", token);
  };

  // Signup function
  const signup = async (email, password) => {
    setAuthLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await saveToken(result.user);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setAuthLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveToken(result.user);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveToken(result.user);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("jwt");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Check if user is already logged in (on mount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await saveToken(firebaseUser);
        setUser(firebaseUser);
      } else {
        setUser(null);
        localStorage.removeItem("jwt");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    login,
    loginWithGoogle,
    logout,
    authLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
