
import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import DesktopNavigation from "../navigation/DesktopNavigation";
import MenuButton from "../navigation/MenuButton";

interface NavbarContainerProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavbarContainer = ({ isOpen, toggleMenu }: NavbarContainerProps) => {

  return (
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
  );
};

export default NavbarContainer;
