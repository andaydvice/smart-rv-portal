import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import MenuButton from "./navigation/MenuButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen === false) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover-scale">
            <Logo />
          </Link>
          
          <MenuButton isOpen={isOpen} onClick={toggleMenu} />
          <DesktopNavigation />
        </div>
      </div>

      <MobileNavigation isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;