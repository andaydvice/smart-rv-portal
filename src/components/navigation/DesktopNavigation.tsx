
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";
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

  const MenuLink = ({ to, icon: Icon, children }: { to: string; icon?: any; children: React.ReactNode }) => (
    <Link 
      to={to} 
      className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2"
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );

  return (
    <div className="hidden md:flex md:items-center md:space-x-8">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-2">
          {!isHomePage && (
            <NavigationMenuItem>
              <MenuLink to="/" icon={Home}>Home</MenuLink>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Technology
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <SmartFeaturesLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Systems
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <CoreSystemsLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-blue-400 transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Models
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <VehicleSelectionLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <MenuLink to="/calculators" icon={Calculator}>RV Tools</MenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <MenuLink to="/blog" icon={BookOpen}>Blog</MenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
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

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User className="h-4 w-4" />
              <span className="text-base">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2"
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
