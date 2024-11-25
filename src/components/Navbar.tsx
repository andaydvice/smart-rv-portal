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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover-scale">
            <Logo />
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 md:ml-auto">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-white transition-colors !bg-transparent text-base">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-0 z-[100]">
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-gray-900/95 backdrop-blur-sm rounded-lg mt-2">
                      <SmartFeatureLinks />
                      <EntertainmentLinks />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/models" className="text-gray-300 hover:text-white transition-colors text-base">
              Models
            </Link>
            <Link to="/technology" className="text-gray-300 hover:text-white transition-colors text-base">
              Technology
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-base">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/features"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/models"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Models
          </Link>
          <Link
            to="/technology"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Technology
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
        <div className="px-4 py-6 space-y-6 bg-gray-800/50">
          <SmartFeatureLinks />
          <EntertainmentLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;