import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, LoginInput, RegisterInput } from '@emigrant/shared';
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  getStoredAuthToken,
} from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<{ success: boolean; error?: string }>;
  register: (input: RegisterInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  authModalPrompt: string | null;
  openAuthModal: (mode?: 'login' | 'register', onSuccess?: () => void, prompt?: string) => void;
  closeAuthModal: () => void;
  authModalOnSuccess: (() => void) | null;
  triggerPendingAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getStoredAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalPrompt, setAuthModalPrompt] = useState<string | null>(null);
  const [authModalOnSuccess, setAuthModalOnSuccess] = useState<(() => void) | null>(null);

  // Initialize Auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStoredAuthToken();
      if (storedToken) {
        setToken(storedToken);
        const res = await fetchCurrentUser();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (input: LoginInput) => {
    setIsLoading(true);
    const res = await loginUser(input);
    setIsLoading(false);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    }
    return { success: false, error: res.error || '登录失败' };
  };

  const handleRegister = async (input: RegisterInput) => {
    setIsLoading(true);
    const res = await registerUser(input);
    setIsLoading(false);
    if (res.success && res.user && res.token) {
      setUser(res.user);
      setToken(res.token);
      return { success: true };
    }
    return { success: false, error: res.error || '注册失败' };
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login', onSuccess?: () => void, prompt?: string) => {
    setAuthModalMode(mode);
    setAuthModalPrompt(prompt || null);
    setAuthModalOnSuccess(() => onSuccess || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalPrompt(null);
    setAuthModalOnSuccess(null);
  };

  const triggerPendingAction = () => {
    if (authModalOnSuccess) {
      authModalOnSuccess();
      setAuthModalOnSuccess(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        isAuthModalOpen,
        authModalMode,
        authModalPrompt,
        openAuthModal,
        closeAuthModal,
        authModalOnSuccess,
        triggerPendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
