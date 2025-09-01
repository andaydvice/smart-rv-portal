
import { supabase } from "@/integrations/supabase/client";

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_MINUTES = 15;

type LoginAttemptData = {
  email: string;
  failed_attempts: number;
  lockout_until: string | null;
  last_attempt_at: string;
};

export const useLoginAttempt = () => {
  // Log security event
  const logSecurityEvent = async (eventType: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium', details: Record<string, any> = {}) => {
    try {
      await supabase.rpc('log_security_event', {
        event_type: eventType,
        severity,
        details
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  // Check if user is currently locked out (used before authentication)
  const checkUserLockout = async (email: string): Promise<{ isLockedOut: boolean; lockoutUntil: Date | null; remainingAttempts: number }> => {
    try {
      const { data, error } = await supabase
        .from("login_attempts")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle();
      
      if (error) {
        console.error("Error checking user lockout:", error);
        return { isLockedOut: false, lockoutUntil: null, remainingAttempts: LOCKOUT_THRESHOLD };
      }

      if (!data) {
        return { isLockedOut: false, lockoutUntil: null, remainingAttempts: LOCKOUT_THRESHOLD };
      }

      // Check if currently locked out
      if (data.lockout_until) {
        const lockoutTime = new Date(data.lockout_until);
        const now = new Date();
        
        if (lockoutTime > now) {
          await logSecurityEvent('login_attempt_during_lockout', 'high', { email, lockout_until: data.lockout_until });
          return { 
            isLockedOut: true, 
            lockoutUntil: lockoutTime,
            remainingAttempts: 0
          };
        } else {
          // Lockout expired, reset attempts
          await resetLoginAttempts(email);
          return { isLockedOut: false, lockoutUntil: null, remainingAttempts: LOCKOUT_THRESHOLD };
        }
      }

      const remainingAttempts = Math.max(0, LOCKOUT_THRESHOLD - data.failed_attempts);
      return { 
        isLockedOut: false, 
        lockoutUntil: null,
        remainingAttempts
      };
    } catch (err) {
      console.error("Error checking user lockout:", err);
      return { isLockedOut: false, lockoutUntil: null, remainingAttempts: LOCKOUT_THRESHOLD };
    }
  };

  // Record failed login attempt
  const recordFailedAttempt = async (email: string) => {
    try {
      const normalizedEmail = email.toLowerCase();
      const { data: existing } = await supabase
        .from("login_attempts")
        .select("*")
        .eq("email", normalizedEmail)
        .maybeSingle();

      const failedAttempts = (existing?.failed_attempts || 0) + 1;
      const shouldLockout = failedAttempts >= LOCKOUT_THRESHOLD;
      const lockoutUntil = shouldLockout 
        ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString()
        : null;

      await supabase.from("login_attempts").upsert({
        email: normalizedEmail,
        failed_attempts: failedAttempts,
        lockout_until: lockoutUntil,
        last_attempt_at: new Date().toISOString(),
      });

      // Log security event
      if (shouldLockout) {
        await logSecurityEvent('account_locked_failed_attempts', 'critical', { 
          email: normalizedEmail, 
          failed_attempts: failedAttempts,
          lockout_until: lockoutUntil
        });
      } else {
        await logSecurityEvent('failed_login_attempt', 'medium', { 
          email: normalizedEmail, 
          failed_attempts: failedAttempts,
          remaining_attempts: LOCKOUT_THRESHOLD - failedAttempts
        });
      }

      return { failedAttempts, isLockedOut: shouldLockout, lockoutUntil };
    } catch (error) {
      console.error("Error recording failed attempt:", error);
      await logSecurityEvent('login_attempt_recording_failed', 'high', { email, error: error.message });
      throw error;
    }
  };

  // Reset login attempts after successful login
  const resetLoginAttempts = async (email: string) => {
    try {
      const normalizedEmail = email.toLowerCase();
      await supabase.from("login_attempts").delete().eq("email", normalizedEmail);
      await logSecurityEvent('login_attempts_reset', 'low', { email: normalizedEmail });
    } catch (error) {
      console.error("Error resetting login attempts:", error);
    }
  };

  // Record successful login
  const recordSuccessfulLogin = async (email: string) => {
    try {
      await resetLoginAttempts(email);
      await logSecurityEvent('successful_login', 'low', { email: email.toLowerCase() });
    } catch (error) {
      console.error("Error recording successful login:", error);
    }
  };

  return {
    checkUserLockout,
    recordFailedAttempt,
    resetLoginAttempts,
    recordSuccessfulLogin,
    logSecurityEvent,
    LOCKOUT_THRESHOLD,
    LOCKOUT_MINUTES,
  };
};
