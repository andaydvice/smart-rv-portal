
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, ShieldX, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TwoFactorSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    !!user?.user_metadata?.twofactor_enabled
  );
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToggle2FA = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          twofactor_enabled: !status,
        },
      });
      if (updateError) {
        setError("Failed to update 2FA settings. Please try again.");
        return;
      }
      setStatus(!status);
      toast({
        title: !status ? "2FA Enabled" : "2FA Disabled",
        description: !status
          ? "Two-factor authentication via email is now enabled for your account."
          : "Two-factor authentication has been disabled.",
      });
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to update 2FA settings. Please check your connection."
      );
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
        {status ? (
          <ShieldCheck className="text-green-400 w-6 h-6 mr-2" />
        ) : (
          <ShieldX className="text-yellow-400 w-6 h-6 mr-2" />
        )}
        <h3 className="text-lg font-bold text-white">
          Two-Factor Authentication (2FA)
        </h3>
      </div>
      <p className="text-white mb-4">
        {status
          ? "Two-factor authentication is enabled for your account. You will be required to enter a 6-digit code sent to your email when signing in."
          : "Two-factor authentication is currently disabled. Enable this for extra account security via email OTP during login."}
      </p>
      {error && (
        <div className="flex items-center bg-red-900/20 border border-red-500/40 text-white rounded px-3 py-2 mb-3 gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      <Button
        type="button"
        onClick={handleToggle2FA}
        className="w-full mt-2"
        disabled={loading}
        variant={status ? "destructive" : "default"}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4 mr-2" />
            Updating...
          </>
        ) : status ? (
          "Disable 2FA"
        ) : (
          "Enable 2FA"
        )}
      </Button>
    </div>
  );
};

export default TwoFactorSettings;
