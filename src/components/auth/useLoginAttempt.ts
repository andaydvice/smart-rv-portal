
import { supabase } from "@/integrations/supabase/client";

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_MINUTES = 15;

type LoginAttemptData = {
  user_id: string;
  failed_attempts: number;
  lockout_until: string | null;
  last_attempt_at: string;
};

export const useLoginAttempt = () => {
  // Fetch login attempts for a specific user (only for authenticated requests)
  const fetchLoginAttempts = async (user_id: string): Promise<LoginAttemptData | null> => {
    try {
      const { data, error } = await supabase
        .from("login_attempts")
        .select("*")
        .eq("user_id", user_id)
        .single();
      
      if (error) {
        console.log("No login attempts found for user:", user_id);
        return null;
      }
      return data;
    } catch (err) {
      console.error("Error fetching login attempts:", err);
      return null;
    }
  };

  // Check if user is currently locked out (used before authentication)
  const checkUserLockout = async (email: string): Promise<{ isLockedOut: boolean; lockoutUntil: Date | null }> => {
    try {
      // Note: This is a security limitation - we can't easily check lockout by email without authentication
      // In production, consider using a server-side check or rate limiting by IP
      console.log("Checking lockout status for email:", email);
      return { isLockedOut: false, lockoutUntil: null };
    } catch (err) {
      console.error("Error checking user lockout:", err);
      return { isLockedOut: false, lockoutUntil: null };
    }
  };

  // Set login attempts for authenticated user
  const setLoginAttempts = async ({
    user_id,
    failed_attempts,
    lockout_until,
  }: {
    user_id: string;
    failed_attempts: number;
    lockout_until: string | null;
  }) => {
    await supabase.from("login_attempts").upsert([
      {
        user_id,
        failed_attempts,
        lockout_until,
        last_attempt_at: new Date().toISOString(),
      },
    ]);
  };

  return {
    fetchLoginAttempts,
    checkUserLockout,
    setLoginAttempts,
    LOCKOUT_THRESHOLD,
    LOCKOUT_MINUTES,
  };
};
