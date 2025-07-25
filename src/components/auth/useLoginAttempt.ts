
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
  // Fetch login attempts for current user
  const fetchLoginAttempts = async (email: string): Promise<LoginAttemptData | null> => {
    // For security, we can only fetch login attempts for authenticated users
    // This will be called after sign-in attempt, so we check by email first
    // Note: This is a temporary approach - in production, you'd want to handle this differently
    const { data, error } = await supabase
      .from("login_attempts")
      .select("*")
      .eq("user_id", "auth.uid()")  // This will be replaced with actual user_id after auth
      .single();
    if (error) return null;
    return data;
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
    setLoginAttempts,
    LOCKOUT_THRESHOLD,
    LOCKOUT_MINUTES,
  };
};
