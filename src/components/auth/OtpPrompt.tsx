
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OtpPromptProps {
  email: string;
  onVerify: (code: string) => Promise<boolean>;
  onCancel: () => void;
}

const OtpPrompt = ({ email, onVerify, onCancel }: OtpPromptProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const ok = await onVerify(code);

    if (!ok) {
      setError("Invalid or expired code. Please try again.");
      toast({
        title: "OTP Verification Failed",
        description: "Please check your email for the latest code.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6">
      <h2 className="text-xl font-bold text-white text-left">Two-Factor Authentication</h2>
      <p className="text-white text-left text-sm">
        Enter the 6-digit code sent to <b>{email}</b>
      </p>

      <Input
        autoFocus
        type="text"
        inputMode="numeric"
        pattern="\d{6}"
        maxLength={6}
        minLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        className="bg-[#1a2235] border-gray-700 text-white w-full"
        placeholder="123456"
        disabled={loading}
      />

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 p-2 rounded-md flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-white">{error}</span>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          className="w-full font-medium"
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default OtpPrompt;

