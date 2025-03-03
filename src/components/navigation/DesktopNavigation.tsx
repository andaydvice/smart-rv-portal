
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks, RVToolsLinks } from "./links";
import { Link, useLocation } from "react-router-dom";
import { Calculator, BookOpen, Home, LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DesktopNavigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
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
    <div className="flex items-center space-x-8">
      <NavigationMenu className="relative">
        <NavigationMenuList className="flex items-center space-x-2 whitespace-nowrap">
          {!isHomePage && (
            <NavigationMenuItem className="flex">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem className="flex">
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Intelligence
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <SmartFeaturesLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex">
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Systems
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <CoreSystemsLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex">
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Models
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <VehicleSelectionLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex">
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <RVToolsLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex">
            <Link 
              to="/blog" 
              className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2"
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex">
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Support
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <div className="grid gap-6 grid-cols-2">
                  <SupportLinks />
                  <CustomerSupportLinks />
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-4 flex-shrink-0">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300 whitespace-nowrap overflow-hidden">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="text-base truncate max-w-[200px]">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2 whitespace-nowrap"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopNavigation;
