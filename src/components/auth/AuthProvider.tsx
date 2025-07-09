import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .rpc('is_admin', { _user_id: userId });
      
      if (error) {
        setError(error);
        return false;
      }
      
      return data || false;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setError(null);
        
        if (newSession?.user) {
          setTimeout(async () => {
            const adminStatus = await checkAdminStatus(newSession.user.id);
            setIsAdmin(adminStatus);
            setLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          setError(sessionError);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          
          if (data.session?.user) {
            const adminStatus = await checkAdminStatus(data.session.user.id);
            setIsAdmin(adminStatus);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setError(null);
      window.location.href = '/auth';
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      window.location.href = '/auth';
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isAdmin,
    loading,
    error,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};