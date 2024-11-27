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
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen === false) {
      setIsMobileFeaturesOpen(false);
    }
  };

  const toggleMobileFeatures = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileFeaturesOpen(!isMobileFeaturesOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsMobileFeaturesOpen(false);
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
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-white transition-colors data-[state=open]:text-white data-[active]:text-white data-[state=open]:bg-transparent !bg-transparent text-base">
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
            <Link to="/models" className="text-gray-300 hover:text-white transition-colors text-base" onClick={handleLinkClick}>
              Models
            </Link>
            <Link to="/technology" className="text-gray-300 hover:text-white transition-colors text-base" onClick={handleLinkClick}>
              Technology
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-base" onClick={handleLinkClick}>
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={toggleMobileFeatures}
            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors flex items-center justify-between"
            aria-expanded={isMobileFeaturesOpen}
          >
            <span>Features</span>
            <span className="text-sm">{isMobileFeaturesOpen ? '▼' : '▶'}</span>
          </button>
          
          {/* Mobile Features Menu */}
          <div className={`transition-all duration-200 ${isMobileFeaturesOpen ? 'block' : 'hidden'}`}>
            <div className="ml-4 space-y-6 bg-gray-800/50 p-4 rounded-lg">
              <SmartFeatureLinks />
              <EntertainmentLinks />
            </div>
          </div>
          
          <Link
            to="/models"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={handleLinkClick}
          >
            Models
          </Link>
          <Link
            to="/technology"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={handleLinkClick}
          >
            Technology
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;