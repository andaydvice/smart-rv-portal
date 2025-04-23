
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
  // Helper to generate user_id from email (base64/URL safe up to 22 chars)
  const getUserId = (email: string) => btoa(email).slice(0, 22);

  // Fetch login attempts for email
  const fetchLoginAttempts = async (email: string): Promise<LoginAttemptData | null> => {
    const user_id = getUserId(email);
    const { data, error } = await supabase
      .from("login_attempts")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (error) return null;
    return data;
  };

  // Upsert (insert/update) login attempts for user
  const setLoginAttempts = async ({
    email,
    failed_attempts,
    lockout_until,
  }: {
    email: string;
    failed_attempts: number;
    lockout_until: string | null;
  }) => {
    const user_id = getUserId(email);
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
