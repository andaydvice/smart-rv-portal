
import { Button } from "@/components/ui/button";

interface AuthTabsProps {
  isSignUp: boolean;
  setIsSignUp: (v: boolean) => void;
}

const AuthTabs = ({ isSignUp, setIsSignUp }: AuthTabsProps) => (
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
);

export default AuthTabs;
