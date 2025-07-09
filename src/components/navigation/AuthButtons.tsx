
import { Link } from "react-router-dom";
import { LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const AuthButtons = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center space-x-4 ml-4">
      {user ? (
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-gray-300">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate max-w-[150px]">{user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-sm flex items-center gap-2 whitespace-nowrap px-3 py-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      ) : (
        <Link
          to="/auth"
          className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-sm flex items-center gap-2 whitespace-nowrap px-3 py-2"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
