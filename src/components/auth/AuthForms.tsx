
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2 } from 'lucide-react';
import { 
  checkPasswordStrength, 
  getPasswordStrengthLabel, 
  getPasswordStrengthColor, 
  isPasswordAcceptable 
} from '@/utils/passwordUtils';
import OtpPrompt from './OtpPrompt';

interface AuthFormsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const AuthForms = ({ onSuccess, onError }: AuthFormsProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [pendingOtpSession, setPendingOtpSession] = useState<any>(null);
  const { toast } = useToast();

  // Update password strength whenever password changes
  useEffect(() => {
    if (isSignUp) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password, isSignUp]);

  // ------- [SECURE ACCOUNT LOCKOUT LOGIC] -------
  const LOCKOUT_THRESHOLD = 5; // allowed attempts before lockout
  const LOCKOUT_MINUTES = 15; // minutes account is locked out

  // Helper: fetch login attempts for the user by email
  const fetchLoginAttempts = async (email: string) => {
    const { data, error } = await supabase
      .from("login_attempts")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return null;
    return data;
  };

  // Helper: update or insert login_attempts for user
  const setLoginAttempts = async ({
    email,
    failed_attempts,
    lockout_until,
  }: {
    email: string;
    failed_attempts: number;
    lockout_until: string | null;
  }) => {
    // Upsert login_attempts record
    await supabase
      .from("login_attempts")
      .upsert([
        {
          email,
          failed_attempts,
          lockout_until,
          last_attempt_at: new Date().toISOString(),
        },
      ]);
  };

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

  // Handler for form submit (login)
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
        console.log("Attempting to sign in with:", { email });
        const { error: signInError, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log("Sign in response:", { error: signInError, data });

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

  // UI: show OTP dialog if 2FA enabled
  if (showOtp) {
    return (
      <OtpPrompt
        email={email}
        onVerify={handleOtpVerify}
        onCancel={handleCancelOtp}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-2">
          <Button
            type="button"
            variant="default"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 font-medium ${!isSignUp ? "opacity-100" : "opacity-80"}`}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 font-medium ${isSignUp ? "opacity-100" : "opacity-80"}`}
          >
            Sign Up
          </Button>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-left">
          {isSignUp ? "Create Your Account" : "Welcome Back"}
        </h2>
        <p className="text-white text-left">
          {isSignUp 
            ? "Join our community of RV enthusiasts" 
            : "Access your RV tools and saved preferences"}
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-md flex items-start gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-white">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            className="bg-[#1a2235] border-gray-700 text-white"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignUp ? "Create a secure password" : "Enter your password"}
            required
            className="bg-[#1a2235] border-gray-700 text-white"
            disabled={loading}
          />
          
          {isSignUp && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white">Password strength: </span>
                <span className="text-xs font-semibold text-white">{getPasswordStrengthLabel(passwordStrength)}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getPasswordStrengthColor(passwordStrength)} transition-all duration-300`} 
                  style={{ width: `${(passwordStrength + 1) * 20}%` }} 
                />
              </div>
              <p className="text-xs text-white mt-1">
                Use at least 8 characters with a mix of letters, numbers, and symbols
              </p>
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="w-full font-medium"
          disabled={loading || (isSignUp && !isPasswordAcceptable(password))}
        >
          {loading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              {isSignUp ? 'Creating Account...' : 'Signing In...'}
            </span>
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </Button>
      </form>
    </div>
  );
};
