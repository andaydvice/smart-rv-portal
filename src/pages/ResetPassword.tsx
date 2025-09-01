import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';
import { checkPasswordStrength, isPasswordAcceptable } from '@/utils/passwordUtils';
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Check for access token in URL
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      toast({
        title: "Invalid Reset Link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [accessToken, refreshToken, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!isPasswordAcceptable(password)) {
        setError("Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Set the session using the tokens from the URL
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken!,
        refresh_token: refreshToken!,
      });

      if (sessionError) throw sessionError;

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setSuccess(true);
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/auth');
      }, 2000);

    } catch (err: any) {
      console.error("Password reset error:", err);
      
      let errorMessage = err.message || "Failed to update password";
      if (errorMessage.includes("New password should be different")) {
        errorMessage = "New password must be different from your current password";
      }
      
      setError(errorMessage);
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-connectivity-darkBg flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-connectivity-darkBg border-gray-700">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Password Updated!</h2>
            <p className="text-blue-200 mb-4">
              Your password has been successfully updated. You'll be redirected to sign in shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-connectivity-darkBg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-connectivity-darkBg border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Set New Password</CardTitle>
          <CardDescription className="text-blue-200">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-md mb-4">
              <p className="text-sm text-white">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                className="bg-[#1a2235] border-gray-700 text-white"
                disabled={loading}
              />
              <PasswordStrengthMeter passwordStrength={passwordStrength} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                className="bg-[#1a2235] border-gray-700 text-white"
                disabled={loading}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full font-medium"
              disabled={loading || !isPasswordAcceptable(password) || password !== confirmPassword}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Updating Password...
                </span>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;