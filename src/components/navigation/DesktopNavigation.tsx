import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";
import { Link } from "react-router-dom";
import { Calculator, BookOpen } from "lucide-react";

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex md:items-center md:space-x-8">
      <NavigationMenu>
        <NavigationMenuList>
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
            <Link to="/calculators" className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2">
              <Calculator className="h-4 w-4" />
              RV Tools
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors text-base flex items-center gap-2 px-4 py-2">
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
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
    </div>
  );
};

export default DesktopNavigation;