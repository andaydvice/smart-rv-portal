
import { Button } from "@/components/ui/button";

interface AuthTabsProps {
  isSignUp: boolean;
  setIsSignUp: (v: boolean) => void;
  isPasswordReset: boolean;
  setIsPasswordReset: (v: boolean) => void;
}

const AuthTabs = ({ isSignUp, setIsSignUp, isPasswordReset, setIsPasswordReset }: AuthTabsProps) => {
  const handleTabClick = (mode: 'signin' | 'signup' | 'reset') => {
    setIsSignUp(mode === 'signup');
    setIsPasswordReset(mode === 'reset');
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Button
        type="button"
        variant="default"
        onClick={() => handleTabClick('signin')}
        className={`flex-1 font-medium text-sm ${!isSignUp && !isPasswordReset ? "opacity-100" : "opacity-80"}`}
      >
        Sign In
      </Button>
      <Button
        type="button"
        variant="default"
        onClick={() => handleTabClick('signup')}
        className={`flex-1 font-medium text-sm ${isSignUp ? "opacity-100" : "opacity-80"}`}
      >
        Sign Up
      </Button>
      <Button
        type="button"
        variant="default"
        onClick={() => handleTabClick('reset')}
        className={`flex-1 font-medium text-sm ${isPasswordReset ? "opacity-100" : "opacity-80"}`}
      >
        Reset
      </Button>
    </div>
  );
};

export default AuthTabs;
