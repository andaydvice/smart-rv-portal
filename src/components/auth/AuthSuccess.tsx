import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthSuccessProps {
  email: string;
  onBackToSignIn: () => void;
}

const AuthSuccess = ({ email, onBackToSignIn }: AuthSuccessProps) => {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Account Created Successfully!</h2>
          <p className="text-white/80">
            We've sent a verification email to:
          </p>
          <p className="text-connectivity-accent font-medium break-all">
            {email}
          </p>
        </div>
      </div>

      <div className="space-y-4 p-4 bg-connectivity-darkBg/50 rounded-lg border border-white/10">
        <div className="flex items-center gap-2 justify-center text-connectivity-accent">
          <Mail className="h-5 w-5" />
          <span className="font-medium">Next Steps</span>
        </div>
        
        <div className="space-y-2 text-sm text-white/80">
          <p>1. Check your email inbox (and spam folder)</p>
          <p>2. Click the verification link in the email</p>
          <p>3. Return here to sign in to your account</p>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={onBackToSignIn}
          variant="outline"
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Button>
        
        <p className="text-xs text-white/60">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
};

export default AuthSuccess;