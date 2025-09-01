
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { SecurityEnhancements, setupCSPViolationReporting, enhanceSessionSecurity } from './SecurityEnhancements';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null,
  session: null, 
  loading: true, 
  error: null 
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("AuthProvider initializing...");
    
    // Initialize security enhancements
    setupCSPViolationReporting();
    const { startSessionMonitoring, stopSessionMonitoring } = enhanceSessionSecurity();
    
    // Set up auth state change listener FIRST to prevent missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", { event, session: newSession?.user?.email || 'No user' });
      
      // Update state with the new session
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Manage session monitoring based on auth state
      if (newSession) {
        startSessionMonitoring();
        // Log successful session establishment
        (async () => {
          try {
            await supabase.rpc('log_security_event', {
              event_type: 'session_established',
              severity: 'low',
              details: { event, user_id: newSession.user.id }
            });
          } catch (error) {
            console.error('Failed to log security event:', error);
          }
        })();
      } else {
        stopSessionMonitoring();
        // Log session termination
        if (event === 'SIGNED_OUT') {
          (async () => {
            try {
              await supabase.rpc('log_security_event', {
                event_type: 'session_terminated',
                severity: 'low',
                details: { event }
              });
            } catch (error) {
              console.error('Failed to log security event:', error);
            }
          })();
        }
      }
      
      // Clear any errors on successful auth state change
      setError(null);
      setLoading(false);
    });

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError.message);
          // Don't throw here, just set the error state
          setError(sessionError);
        } else {
          console.log("Initial session check:", data.session ? "Session found" : "No session");
          setSession(data.session);
          setUser(data.session?.user ?? null);
          
          // Start session monitoring if user is authenticated
          if (data.session) {
            startSessionMonitoring();
          }
        }
      } catch (err) {
        console.error("Error getting initial auth state:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    // Initialize auth
    initializeAuth();

    // Cleanup subscription
    return () => {
      stopSessionMonitoring();
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, error }}>
      <SecurityEnhancements />
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
