import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../lib/auth';
import { User, supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    mobile?: string;
    role: 'client' | 'contractor' | 'architect' | 'inspector';
  }) => Promise<{ emailConfirmationRequired?: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser?.profile || null);
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    await authService.login({ email, password });
    await checkUser();
  }

  async function register(data: {
    email: string;
    password: string;
    fullName: string;
    mobile?: string;
    role: 'client' | 'contractor' | 'architect' | 'inspector';
  }) {
    const result = await authService.register(data);
    
    // Only check user if session exists (email confirmation not required)
    if (!result.emailConfirmationRequired) {
      await checkUser();
    }
    
    return { emailConfirmationRequired: result.emailConfirmationRequired };
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
