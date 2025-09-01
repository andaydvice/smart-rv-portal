import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Security monitoring and enhancement component
export const SecurityEnhancements = () => {
  useEffect(() => {
    // Monitor for suspicious activity
    const monitorSecurityEvents = () => {
      // Track page visibility changes (potential session hijacking)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Log when user leaves the page with active session
          const session = supabase.auth.getSession();
          if (session) {
            logSecurityEvent('session_page_hidden', 'low');
          }
        }
      };

      // Track multiple tabs/windows (potential session sharing)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key?.includes('supabase.auth.token')) {
          logSecurityEvent('auth_token_storage_change', 'medium', {
            key: e.key,
            oldValue: !!e.oldValue,
            newValue: !!e.newValue
          });
        }
      };

      // Track potential XSS attempts
      const handleError = (event: ErrorEvent) => {
        if (event.message.includes('script') || event.message.includes('eval')) {
          logSecurityEvent('potential_xss_attempt', 'high', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno
          });
        }
      };

      // Add event listeners
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('error', handleError);

      // Cleanup
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('error', handleError);
      };
    };

    const cleanup = monitorSecurityEvents();
    return cleanup;
  }, []);

  // Security event logging function
  const logSecurityEvent = async (
    eventType: string, 
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    details: Record<string, any> = {}
  ) => {
    try {
      await supabase.rpc('log_security_event', {
        event_type: eventType,
        severity,
        details: {
          ...details,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          url: window.location.href,
          referrer: document.referrer
        }
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  return null; // This is a monitoring component with no UI
};

// Content Security Policy violation handler
export const setupCSPViolationReporting = () => {
  document.addEventListener('securitypolicyviolation', (e) => {
    const details = {
      blocked_uri: e.blockedURI,
      document_uri: e.documentURI,
      effective_directive: e.effectiveDirective,
      original_policy: e.originalPolicy,
      referrer: e.referrer,
      status_code: e.statusCode,
      violated_directive: e.violatedDirective
    };

    // Log CSP violation
    (async () => {
      try {
        await supabase.rpc('log_security_event', {
          event_type: 'csp_violation',
          severity: 'high',
          details
        });
      } catch (error) {
        console.error('Failed to log CSP violation:', error);
      }
    })();
  });
};

// Enhanced session management
export const enhanceSessionSecurity = () => {
  let sessionCheckInterval: NodeJS.Timeout;

  const startSessionMonitoring = () => {
    sessionCheckInterval = setInterval(async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          return;
        }

        if (session) {
          // Check if session is about to expire (within 5 minutes)
          const expiresAt = new Date(session.expires_at! * 1000);
          const now = new Date();
          const timeUntilExpiry = expiresAt.getTime() - now.getTime();
          
          if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
            // Try to refresh the session
            const { error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
              console.error('Session refresh failed:', refreshError);
              // Log security event for failed session refresh
              (async () => {
                try {
                  await supabase.rpc('log_security_event', {
                    event_type: 'session_refresh_failed',
                    severity: 'medium',
                    details: { error: refreshError.message }
                  });
                } catch (error) {
                  console.error('Failed to log security event:', error);
                }
              })();
            }
          }
        }
      } catch (error) {
        console.error('Session monitoring error:', error);
      }
    }, 60000); // Check every minute
  };

  const stopSessionMonitoring = () => {
    if (sessionCheckInterval) {
      clearInterval(sessionCheckInterval);
    }
  };

  return { startSessionMonitoring, stopSessionMonitoring };
};