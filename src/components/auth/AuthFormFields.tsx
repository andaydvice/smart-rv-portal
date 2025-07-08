
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { isPasswordAcceptable } from '@/utils/passwordUtils';

interface AuthFormFieldsProps {
  isSignUp: boolean;
  loading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  firstName?: string;
  setFirstName?: (firstName: string) => void;
  lastName?: string;
  setLastName?: (lastName: string) => void;
  passwordStrength: number;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const AuthFormFields = ({
  isSignUp,
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
  onSubmit,
}: AuthFormFieldsProps) => {
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {isSignUp && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName || ''}
              onChange={(e) => setFirstName?.(e.target.value)}
              placeholder="John"
              className="bg-[#1a2235] border-gray-700 text-white"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName || ''}
              onChange={(e) => setLastName?.(e.target.value)}
              placeholder="Doe"
              className="bg-[#1a2235] border-gray-700 text-white"
              disabled={loading}
            />
          </div>
        </div>
      )}
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
        
        {isSignUp && <PasswordStrengthMeter passwordStrength={passwordStrength} />}
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
  );
};

export default AuthFormFields;
