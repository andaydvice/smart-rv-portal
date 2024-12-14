import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import MenuButton from "./navigation/MenuButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling mobile menu, current state:", isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover-scale">
            <Logo />
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="block md:hidden z-50">
              <MenuButton isOpen={isOpen} onClick={toggleMenu} />
            </div>
            <div className="hidden md:block">
              <DesktopNavigation />
            </div>
          </div>
        </div>
      </div>

      <MobileNavigation isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;