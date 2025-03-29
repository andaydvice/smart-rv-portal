
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks, RVToolsLinks } from "./links";
import { Link, useLocation } from "react-router-dom";
import { Home, Calculator, CloudSun, Warehouse, ClipboardCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import AuthButtons from "./AuthButtons";
import HoverDropdownMenu from "./HoverDropdownMenu";

const DesktopNavigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Define RV Tools links for the hover dropdown with icons and specific colors
  const rvToolsLinks = [
    { 
      text: "RV Calculators", 
      href: "/calculators", 
      icon: <Calculator size={16} className="text-[#F59E0B]" /> 
    },
    { 
      text: "RV Weather", 
      href: "/rv-weather", 
      icon: <CloudSun size={16} className="text-[#3B82F6]" /> 
    },
    { 
      text: "Storage Facilities", 
      href: "/storage-facilities", 
      icon: <Warehouse size={16} className="text-[#8B5CF6]" /> 
    },
    { 
      text: "Storage Checklist", 
      href: "/storage-preparation-checklist", 
      icon: <ClipboardCheck size={16} className="text-[#10B981]" /> 
    }
  ];

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
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg p-6">
                <SmartFeaturesLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              RV Systems
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg p-6">
                <CoreSystemsLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Models
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg p-6">
                <VehicleSelectionLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Custom hover dropdown with colored icons */}
          <HoverDropdownMenu 
            trigger="RV Tools" 
            links={rvToolsLinks}
          />

          <NavigationMenuItem>
            <Link 
              to="/blog" 
              className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
            >
              Blog
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
              Support
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg p-6">
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
