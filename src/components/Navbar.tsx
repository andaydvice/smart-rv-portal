import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { 
  CoreSystemsLinks, 
  SmartFeaturesLinks, 
  VehicleSelectionLinks,
  SupportLinks,
  CustomerSupportLinks
} from "./NavbarLinks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen === false) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover-scale">
            <Logo />
          </Link>
          
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-blue-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
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
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <div className="space-y-6 p-4">
            <SmartFeaturesLinks />
            <CoreSystemsLinks />
            <VehicleSelectionLinks />
            <SupportLinks />
            <CustomerSupportLinks />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;