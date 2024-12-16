import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MenuButton from "./navigation/MenuButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    alert("Menu toggled: " + !isOpen);  // Keep this for debugging
    console.log("Toggling mobile menu, previous state:", isOpen);
    setIsOpen(!isOpen);
    // Log after state update to verify the change
    setTimeout(() => {
      console.log("Menu state after update:", !isOpen);
    }, 0);
  };

  return (
    <div className="relative">
      <nav className="relative z-[9999] fixed top-0 left-0 right-0 bg-[#080F1F]/95 backdrop-blur-sm border-b border-[#1E2A3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hover-scale">
              <Logo />
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <MenuButton isOpen={isOpen} onClick={toggleMenu} />
              </div>
              <div className="hidden md:block">
                <DesktopNavigation />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Render mobile menu with absolute positioning */}
      {isOpen && (
        <div className="fixed inset-0 pt-16 bg-black text-white z-[9998]">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <p>Test content</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;