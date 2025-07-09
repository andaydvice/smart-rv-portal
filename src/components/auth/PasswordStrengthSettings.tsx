
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, AlertCircle, Lock } from "lucide-react";
import {
  checkPasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
  isPasswordAcceptable
} from "@/utils/passwordUtils";

const PasswordStrengthSettings = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { toast } = useToast();

  // Update password strength whenever password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (!isPasswordAcceptable(newPassword)) {
      setError("Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: currentPassword,
      });

      if (signInError) {
        setError("Current password is incorrect");
        setLoading(false);
        return;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
      });
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the password");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 max-w-md mx-auto my-6">
      <div className="flex items-center mb-4">
        <Lock className="text-blue-400 w-6 h-6 mr-2" />
        <h3 className="text-lg font-bold text-white">Password Management</h3>
      </div>
      
      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password" className="text-white">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-[#1a2235] border-gray-700 text-white"
            required
            disabled={loading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-password" className="text-white">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="bg-[#1a2235] border-gray-700 text-white"
            required
            disabled={loading}
          />
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white">Password strength: </span>
              <span className="text-xs font-semibold text-white">
                {getPasswordStrengthLabel(passwordStrength)}
              </span>
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
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#1a2235] border-gray-700 text-white"
            required
            disabled={loading}
          />
        </div>
        
        {error && (
          <div className="flex items-center bg-red-900/20 border border-red-500/40 text-white rounded px-3 py-2 gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={loading || !currentPassword || !isPasswordAcceptable(newPassword) || newPassword !== confirmPassword}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PasswordStrengthSettings;
