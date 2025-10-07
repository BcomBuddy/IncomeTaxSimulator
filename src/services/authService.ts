import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signOut,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '../firebase';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// SSO User Data Interface
export interface SSOUserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain?: string;
  microAppDomain?: string;
}

// Combined User Data Interface
export interface CombinedUserData {
  uid: string;
  email: string;
  name?: string;
  yearOfStudy?: string;
  role?: string;
  isAdmin?: boolean;
  shellDomain?: string;
  microAppDomain?: string;
  authType: 'firebase' | 'sso';
  firebaseUser?: User;
}

// Error messages mapping
export const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked. Please allow popups and try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};

// Email/Password Authentication
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Google Sign-In Authentication
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Create new account with email/password
export const createAccount = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};

// SSO Authentication Service
export class SSOAuthService {
  private static readonly USER_KEY = 'sso_user_data';
  private static readonly AUTH_TYPE_KEY = 'auth_type';

  // Validate JWT token from URL parameters
  static validateTokenFromShell(): SSOUserData | null {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isSSO = urlParams.get('sso') === 'true';

    if (!token || !isSSO) {
      return null;
    }

    try {
      const tokenData = JSON.parse(decodeURIComponent(token));
      
      // Validate required fields
      if (!tokenData.uid || !tokenData.email) {
        console.error('Invalid token: missing required fields');
        return null;
      }

      // Check token expiration
      if (tokenData.exp && tokenData.exp < Math.floor(Date.now() / 1000)) {
        console.error('Token has expired');
        return null;
      }

      const userData: SSOUserData = {
        uid: tokenData.uid,
        email: tokenData.email,
        name: tokenData.name || 'User',
        yearOfStudy: tokenData.yearOfStudy || 'Unknown',
        role: tokenData.role || 'student',
        isAdmin: tokenData.isAdmin || false,
        shellDomain: tokenData.shellDomain,
        microAppDomain: tokenData.microAppDomain
      };

      // Store user data and auth type
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      localStorage.setItem(this.AUTH_TYPE_KEY, 'sso');
      
      // Clean URL parameters
      this.cleanUrl();
      
      console.log('✅ SSO Login successful:', userData);
      return userData;
    } catch (error) {
      console.error('Error validating SSO token:', error);
      return null;
    }
  }

  // Get stored SSO user data
  static getSSOUserData(): SSOUserData | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  // Check if user is authenticated via SSO
  static isSSOAuthenticated(): boolean {
    return this.getSSOUserData() !== null && localStorage.getItem(this.AUTH_TYPE_KEY) === 'sso';
  }

  // Logout from SSO and redirect to shell
  static logoutFromSSO(): void {
    const userData = this.getSSOUserData();
    const shellDomain = userData?.shellDomain || 
                       new URLSearchParams(window.location.search).get('shell') || 
                       process.env.REACT_APP_SHELL_DOMAIN || 
                       'https://bcombuddy.netlify.app';
    
    // Clear SSO data
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.AUTH_TYPE_KEY);
    
    // Redirect to shell app
    window.location.href = shellDomain;
  }

  // Clean URL parameters after successful authentication
  private static cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('sso');
    url.searchParams.delete('shell');
    window.history.replaceState({}, document.title, url.toString());
  }
}

// Combined Authentication Service
export class CombinedAuthService {
  // Get current user data (either Firebase or SSO)
  static getCurrentUserData(): CombinedUserData | null {
    // Check SSO first
    if (SSOAuthService.isSSOAuthenticated()) {
      const ssoUser = SSOAuthService.getSSOUserData();
      if (ssoUser) {
        return {
          uid: ssoUser.uid,
          email: ssoUser.email,
          name: ssoUser.name,
          yearOfStudy: ssoUser.yearOfStudy,
          role: ssoUser.role,
          isAdmin: ssoUser.isAdmin,
          shellDomain: ssoUser.shellDomain,
          microAppDomain: ssoUser.microAppDomain,
          authType: 'sso'
        };
      }
    }

    // Check Firebase
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || undefined,
        authType: 'firebase',
        firebaseUser: firebaseUser
      };
    }

    return null;
  }

  // Check if user is authenticated (either method)
  static isAuthenticated(): boolean {
    return SSOAuthService.isSSOAuthenticated() || !!auth.currentUser;
  }

  // Get authentication type
  static getAuthType(): 'firebase' | 'sso' | null {
    if (SSOAuthService.isSSOAuthenticated()) return 'sso';
    if (auth.currentUser) return 'firebase';
    return null;
  }

  // Logout from current authentication method
  static async logout(): Promise<void> {
    const authType = this.getAuthType();
    
    if (authType === 'sso') {
      SSOAuthService.logoutFromSSO();
    } else if (authType === 'firebase') {
      await signOutUser();
    }
  }

  // Initialize authentication (check for SSO token on app load)
  static initializeAuth(): CombinedUserData | null {
    // First check for SSO token in URL
    const ssoUser = SSOAuthService.validateTokenFromShell();
    if (ssoUser) {
      return {
        uid: ssoUser.uid,
        email: ssoUser.email,
        name: ssoUser.name,
        yearOfStudy: ssoUser.yearOfStudy,
        role: ssoUser.role,
        isAdmin: ssoUser.isAdmin,
        shellDomain: ssoUser.shellDomain,
        microAppDomain: ssoUser.microAppDomain,
        authType: 'sso'
      };
    }

    // Return current Firebase user if available
    return this.getCurrentUserData();
  }
}
