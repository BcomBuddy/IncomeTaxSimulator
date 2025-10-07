import { useState, useEffect } from 'react';
import { CombinedAuthService, CombinedUserData } from '../services/authService';
import { onAuthStateChanged } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<CombinedUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authType, setAuthType] = useState<'firebase' | 'sso' | null>(null);

  useEffect(() => {
    // Initialize authentication on app load
    const initializeAuth = () => {
      const userData = CombinedAuthService.initializeAuth();
      setUser(userData);
      setAuthType(userData?.authType || null);
      setLoading(false);
    };

    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      // Only update if we're not using SSO authentication
      if (!CombinedAuthService.getAuthType() || CombinedAuthService.getAuthType() === 'firebase') {
        if (firebaseUser) {
          const userData: CombinedUserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || undefined,
            authType: 'firebase',
            firebaseUser: firebaseUser
          };
          setUser(userData);
          setAuthType('firebase');
        } else {
          setUser(null);
          setAuthType(null);
        }
        setLoading(false);
      }
    });

    // Initialize auth
    initializeAuth();

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await CombinedAuthService.logout();
      setUser(null);
      setAuthType(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isAuthenticated = () => {
    return CombinedAuthService.isAuthenticated();
  };

  const getCurrentAuthType = () => {
    return CombinedAuthService.getAuthType();
  };

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    authType: getCurrentAuthType(),
    logout,
    // Helper methods
    isSSO: authType === 'sso',
    isFirebase: authType === 'firebase'
  };
};
