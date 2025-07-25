
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [pendingOtpSession, setPendingOtpSession] = useState<any>(null);
  const { toast } = useToast();

  const { fetchLoginAttempts, setLoginAttempts, LOCKOUT_THRESHOLD, LOCKOUT_MINUTES } = useLoginAttempt();

  // Update password strength whenever password changes
  useEffect(() => {
    if (isSignUp) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password, isSignUp]);

  const handleOtpVerify = async (code: string): Promise<boolean> => {
    try {
      if (!pendingOtpSession || !email) {
        toast({
          title: "Error",
          description: "No active session for verification",
          variant: "destructive",
        });
        return false;
      }

      // Verify the OTP code using Supabase's built-in verification
      const { error, data } = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: 'email'
      });
      
      if (error) {
        toast({
          title: "Verification Failed",
          description: "Invalid or expired verification code. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Success
      setShowOtp(false);
      toast({
        title: "Authentication Successful",
        description: "Your identity has been verified",
      });
      
      onSuccess?.();
      return true;
    } catch (error) {
      console.error("OTP verification error:", error);
      toast({
        title: "Verification Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
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
          setError("Invalid email or password. Please try again.");
          setLoading(false);
          return;
        }

        // Note: Login attempt tracking is now handled after successful authentication
        // to ensure we have the user_id for proper security

        // Check for 2FA - use Supabase's built-in email OTP
        const { user } = data || {};
        const twofactorEnabled = user?.user_metadata?.twofactor_enabled;

        if (twofactorEnabled) {
          // Send OTP email using Supabase's built-in functionality
          const { error: otpError } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
              shouldCreateUser: false // Don't create new user, just send OTP
            }
          });
          
          if (otpError) {
            console.error("OTP send error:", otpError);
            // Continue with normal login if OTP fails
          } else {
            setPendingOtpSession(data?.session || null);
            setShowOtp(true);
            toast({
              title: "2FA Required",
              description: "We've sent a verification code to your email. Please check your inbox.",
            });
            return;
          }
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
    passwordStrength,
    error,
    showOtp,
    handleSubmit,
    handleOtpVerify,
    handleCancelOtp
  };
};
