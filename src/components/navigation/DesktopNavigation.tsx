
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks, RVToolsLinks } from "./links";
import { Link, useLocation } from "react-router-dom";
import { Home, LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthButtons from "./AuthButtons";

const DesktopNavigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex items-center space-x-8">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-2 whitespace-nowrap">
          {!isHomePage && (
            <NavigationMenuItem>
              <Link 
                to="/" 
                className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Intelligence
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <SmartFeaturesLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Systems
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <CoreSystemsLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Models
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <VehicleSelectionLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                <RVToolsLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/blog" 
              className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
            >
              Blog
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/storage-facilities" 
              className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
            >
              Storage
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
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

      <AuthButtons />
    </div>
  );
};

export default DesktopNavigation;
