
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
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [pendingOtpSession, setPendingOtpSession] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { toast } = useToast();

  const { checkUserLockout, recordFailedAttempt, recordSuccessfulLogin, logSecurityEvent, LOCKOUT_THRESHOLD, LOCKOUT_MINUTES } = useLoginAttempt();

  // Update password strength whenever password changes
  useEffect(() => {
    if (isSignUp) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password, isSignUp]);

  const handleOtpVerify = async (code: string): Promise<boolean> => {
    try {
      if (!email) {
        toast({
          title: "Error",
          description: "Email not found for verification",
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
      
      if (!data.session || !data.user) {
        toast({
          title: "Verification Failed",
          description: "Failed to establish session after verification.",
          variant: "destructive",
        });
        return false;
      }
      
      // Success - user is now authenticated with 2FA
      setShowOtp(false);
      setEmail("");
      setPassword("");
      toast({
        title: "Authentication Successful",
        description: "You have been successfully logged in with 2FA.",
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

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Reset email sent",
        description: "Check your email for the password reset link",
      });
      
      setIsPasswordReset(false);
    } catch (err: any) {
      console.error("Password reset error:", err);
      
      let errorMessage = err.message || "Failed to send reset email";
      if (errorMessage.includes("User not found")) {
        errorMessage = "No account found with this email address";
      }
      
      setError(errorMessage);
      toast({
        title: "Reset failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Account lockout protection (only on Sign In, not on Sign Up)
      if (!isSignUp) {
        const lockoutCheck = await checkUserLockout(email);
        if (lockoutCheck.isLockedOut) {
          const lockoutTime = lockoutCheck.lockoutUntil;
          const remainingTime = lockoutTime ? Math.ceil((lockoutTime.getTime() - Date.now()) / 60000) : 0;
          setError(`Account is locked due to too many failed attempts. Please try again in ${remainingTime} minutes.`);
          setLoading(false);
          return;
        }

        if (lockoutCheck.remainingAttempts <= 2 && lockoutCheck.remainingAttempts > 0) {
          setError(`Warning: ${lockoutCheck.remainingAttempts} login attempts remaining before account lockout.`);
        }
      }

      if (isSignUp && !isPasswordAcceptable(password)) {
        setError("Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.");
        setLoading(false);
        return;
      }

      if (isSignUp) {
        // Determine the correct redirect URL based on environment
        const getRedirectUrl = () => {
          const currentOrigin = window.location.origin;
          
          // If we're on the production domain, always redirect to production
          if (currentOrigin.includes('smartrvhub.com')) {
            return 'https://smartrvhub.com/auth';
          }
          
          // For development/preview environments, use current origin
          return currentOrigin + '/auth';
        };

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getRedirectUrl(),
          }
        });
        
        if (signUpError) throw signUpError;
        
        // Clear form fields and show success message
        setEmail("");
        setPassword("");
        setShowSuccessMessage(true);
        
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
          // Record failed attempt
          try {
            const failedAttemptResult = await recordFailedAttempt(email);
            if (failedAttemptResult.isLockedOut) {
              setError(`Account locked due to too many failed attempts. Please try again in ${LOCKOUT_MINUTES} minutes.`);
            } else {
              const remaining = LOCKOUT_THRESHOLD - failedAttemptResult.failedAttempts;
              setError(`Invalid email or password. ${remaining} attempts remaining before account lockout.`);
            }
          } catch (attemptError) {
            console.error('Failed to record login attempt:', attemptError);
            setError("Invalid email or password. Please try again.");
          }
          setLoading(false);
          return;
        }

        // Record successful login
        await recordSuccessfulLogin(email);

        // Note: Login attempt tracking is now handled after successful authentication
        // to ensure we have the user_id for proper security

        // Check for 2FA - use Supabase's built-in email OTP
        const { user } = data || {};
        const twofactorEnabled = user?.user_metadata?.twofactor_enabled;

        if (twofactorEnabled) {
          // Sign out the user first, then require OTP verification
          await supabase.auth.signOut();
          
          // Send OTP email using Supabase's built-in functionality
          const { error: otpError } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
              shouldCreateUser: false // Don't create new user, just send OTP
            }
          });
          
          if (otpError) {
            console.error("OTP send error:", otpError);
            setError("Failed to send verification code. Please try again.");
            return;
          }
          
          // Store email for OTP verification (don't store session yet)
          setPendingOtpSession(null);
          setShowOtp(true);
          toast({
            title: "2FA Required",
            description: "We've sent a verification code to your email. Please check your inbox.",
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
    isPasswordReset,
    setIsPasswordReset,
    loading,
    email,
    setEmail,
    password, 
    setPassword,
    passwordStrength,
    error,
    showOtp,
    showSuccessMessage,
    setShowSuccessMessage,
    handleSubmit,
    handlePasswordReset,
    handleOtpVerify,
    handleCancelOtp
  };
};
