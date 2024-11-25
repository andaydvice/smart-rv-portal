import { Bus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SmartFeatureLinks, EntertainmentLinks } from "./NavbarLinks";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative">
        <div className="transform scale-x-150">
          <Bus className="w-16 h-8 text-blue-500" strokeWidth={1.2} />
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-300 hover:text-white transition-colors">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-gray-900/95 backdrop-blur-sm">
                <SmartFeatureLinks />
                <EntertainmentLinks />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};