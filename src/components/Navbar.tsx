import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { SmartFeatureLinks, EntertainmentLinks } from "./NavbarLinks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileFeatures = () => {
    setMobileFeatures(!mobileFeatures);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMobileFeatures(false);
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
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-white transition-colors !bg-transparent text-base">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] lg:w-[500px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                      <div className="grid gap-6 lg:grid-cols-[.75fr_1fr]">
                        <SmartFeatureLinks />
                        <EntertainmentLinks />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/models" className="text-gray-300 hover:text-white transition-colors text-base" onClick={closeMenu}>
              Models
            </Link>
            <Link to="/technology" className="text-gray-300 hover:text-white transition-colors text-base" onClick={closeMenu}>
              Technology
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-base" onClick={closeMenu}>
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={toggleMobileFeatures}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Features {mobileFeatures ? '▼' : '▶'}
            </button>
            
            {mobileFeatures && (
              <div className="ml-4 space-y-6 bg-gray-800/50 p-4 rounded-lg">
                <SmartFeatureLinks />
                <EntertainmentLinks />
              </div>
            )}
            
            <Link
              to="/models"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Models
            </Link>
            <Link
              to="/technology"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Technology
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;