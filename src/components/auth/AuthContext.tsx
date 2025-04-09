
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  error: null 
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        // First try to get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        console.log("Initial session:", session); // Debug log
        
        if (session?.user) {
          console.log("Setting initial user from session:", session.user);
          setUser(session.user);
        } else {
          // If no session, try to get user
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            throw userError;
          }
          
          console.log("Got user data:", user); // Debug log
          setUser(user);
        }
      } catch (error) {
        console.error("Error getting initial auth state:", error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    };

    // Initialize auth state
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", { event, session }); // Debug log
      
      if (event === 'SIGNED_IN') {
        console.log("User signed in:", session?.user);
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED') {
        console.log("Token refreshed:", session?.user);
        setUser(session?.user ?? null);
      }
      
      setLoading(false);
      setError(null); // Clear any previous errors on successful auth state change
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
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
