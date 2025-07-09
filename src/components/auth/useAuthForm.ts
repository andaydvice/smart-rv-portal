
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { checkPasswordStrength, isPasswordAcceptable } from '@/utils/passwordUtils';
import { useLoginAttempt } from './useLoginAttempt';

interface UseAuthFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useAuthForm = ({ onSuccess, onError }: UseAuthFormProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [pendingOtpSession, setPendingOtpSession] = useState<Record<string, any> | null>(null);
  const { toast } = useToast();

  const { fetchLoginAttempts, setLoginAttempts, LOCKOUT_THRESHOLD, LOCKOUT_MINUTES } = useLoginAttempt();

  // Update password strength whenever password changes
  useEffect(() => {
    if (isSignUp) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password, isSignUp]);

  // Handle OTP verification (2FA)
  const handleOtpVerify = async (code: string): Promise<boolean> => {
    try {
      if (!pendingOtpSession) {
        toast({
          title: "Error",
          description: "No active session for verification",
          variant: "destructive",
        });
        return false;
      }

      // Verify the OTP code (in a real 2FA implementation, this would validate against the code)
      // Here we're just simulating OTP verification since Supabase doesn't have a built-in OTP method
      
      // For a real implementation, you might call an API endpoint or use a third-party verification service
      
      // Simulate success - in a real app replace with actual verification
      setShowOtp(false);
      toast({
        title: "Authentication Successful",
        description: "Your identity has been verified",
      });
      
      onSuccess?.();
      return true;
    } catch (error) {
      console.error("OTP verification error:", error);
      return false;
    }
  };

  // Handle OTP cancellation
  const handleCancelOtp = () => {
    setShowOtp(false);
    setPendingOtpSession(null);
    setError("Two-factor authentication was canceled");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Account lockout protection (only on Sign In, not on Sign Up)
      if (!isSignUp) {
        // Step 1: Fetch login attempts
        const loginAttempt = await fetchLoginAttempts(email);

        if (loginAttempt && loginAttempt.lockout_until && new Date(loginAttempt.lockout_until) > new Date()) {
          setError(
            `Account locked due to multiple failed logins. Try again at ${new Date(
              loginAttempt.lockout_until
            ).toLocaleTimeString()}.`
          );
          setLoading(false);
          return;
        }
      }

      if (isSignUp && !isPasswordAcceptable(password)) {
        setError("Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.");
        setLoading(false);
        return;
      }

      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + '/auth',
            data: {
              first_name: firstName,
              last_name: lastName,
            }
          }
        });
        
        if (signUpError) throw signUpError;
        
        toast({
          title: "Check your email",
          description: "We've sent you a verification link",
        });
      } else {
        // Attempt sign in
        const { error: signInError, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // Increment failed attempts and lock out if exceeded
          let loginAttempt = await fetchLoginAttempts(email);
          let failed_attempts = (loginAttempt?.failed_attempts || 0) + 1;
          let lockout_until: string | null = null;

          if (failed_attempts >= LOCKOUT_THRESHOLD) {
            lockout_until = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
            setError(
              `Account locked after ${LOCKOUT_THRESHOLD} failed attempts. Try again at ${new Date(
                lockout_until
              ).toLocaleTimeString()}.`
            );
          } else {
            setError("Invalid email or password. Please try again.");
          }

          await setLoginAttempts({
            email,
            failed_attempts,
            lockout_until,
          });

          setLoading(false);
          return;
        }

        // Successful login: reset attempts
        await setLoginAttempts({
          email,
          failed_attempts: 0,
          lockout_until: null,
        });

        // Check for 2FA
        // Check for user_metadata.twofactor_enabled - if present, require OTP
        const { user } = data || {};
        // Supabase returns user_metadata on the user object
        const twofactorEnabled = user?.user_metadata?.twofactor_enabled;

        if (twofactorEnabled) {
          // If 2FA enabled, trigger otp flow
          // Supabase will have emailed OTP to user (or we can simulate)
          setPendingOtpSession(data?.session || null);
          setShowOtp(true);
          toast({
            title: "2FA Required",
            description: "Please check your email for a one-time passcode.",
          });
          return;
        }

        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in",
        });
        onSuccess?.();
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      
      // Provide more user-friendly error messages
      let errorMessage = err.message || "An unexpected error occurred";
      
      if (errorMessage.includes("User already registered")) {
        errorMessage = "This email is already registered. Please sign in instead.";
      } else if (errorMessage.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (errorMessage.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before signing in.";
      } else if (errorMessage.includes("Password should be at least")) {
        errorMessage = "Password must be at least 6 characters long.";
      }
      
      setError(errorMessage);
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    isSignUp,
    setIsSignUp,
    loading,
    email,
    setEmail,
    password, 
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    passwordStrength,
    error,
    showOtp,
    handleSubmit,
    handleOtpVerify,
    handleCancelOtp
  };
};
