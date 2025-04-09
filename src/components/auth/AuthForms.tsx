
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

interface AuthFormsProps {
  onSuccess?: () => void;
}

export const AuthForms = ({ onSuccess }: AuthFormsProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "We've sent you a verification link",
        });
      } else {
        console.log("Attempting to sign in with:", { email }); // Debug log
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        console.log("Sign in response:", { error, data }); // Debug log
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in",
        });
        onSuccess?.();
      }
    } catch (error: any) {
      console.error("Auth error:", error); // Debug log
      setError(error.message || "An unexpected error occurred");
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-2">
          <Button
            type="button"
            variant={!isSignUp ? "default" : "outline"}
            onClick={() => setIsSignUp(false)}
            className={`flex-1 ${!isSignUp ? "text-white" : "text-blue-400 hover:text-blue-300"}`}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant={isSignUp ? "default" : "outline"}
            onClick={() => setIsSignUp(true)}
            className={`flex-1 ${isSignUp ? "text-white" : "text-blue-400 hover:text-blue-300"}`}
          >
            Sign Up
          </Button>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-left">
          {isSignUp ? "Create Your Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-400 text-left">
          {isSignUp 
            ? "Join our community of RV enthusiasts" 
            : "Access your RV tools and saved preferences"}
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-md flex items-start gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-100">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            className="bg-[#1a2235] border-gray-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignUp ? "Create a secure password" : "Enter your password"}
            required
            className="bg-[#1a2235] border-gray-700"
          />
          {isSignUp && (
            <p className="text-xs text-gray-400 mt-1">
              Password must be at least 6 characters long
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};
