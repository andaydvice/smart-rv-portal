
import { Link } from "react-router-dom";
import { LogIn, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthButtons = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 text-gray-300">
            <User className="h-4 w-4" />
            <span className="text-sm max-w-[120px] truncate">{user.email}</span>
          </div>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-connectivity-accent transition-colors text-sm flex items-center gap-2 px-3 py-2 rounded-md"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-connectivity-accent transition-colors text-sm flex items-center gap-2 px-3 py-2 rounded-md"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <Link
          to="/auth"
          className="text-gray-300 hover:text-connectivity-accent transition-colors text-sm flex items-center gap-2 px-3 py-2 rounded-md"
        >
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
