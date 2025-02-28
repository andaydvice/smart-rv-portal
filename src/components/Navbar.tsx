
import { useState } from "react";
import NavbarContainer from "./navbar/NavbarContainer";
import MobileMenu from "./navbar/MobileMenu";
import { useAuth } from "./auth/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  console.log("Navbar - Current user:", user); // Debug log
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    core: false,
    features: false,
    vehicles: false,
    support: false,
    customer: false,
    tools: false // Ensuring this is properly initialized
  });

  const toggleMenu = () => {
    console.log("Toggling mobile menu, previous state:", isOpen);
    setIsOpen(!isOpen);
    setTimeout(() => {
      console.log("Menu state after update:", !isOpen);
    }, 0);
  };

  const toggleSection = (section: string) => {
    console.log(`Toggling section: ${section}, current state:`, openSections[section]);
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="relative">
      <NavbarContainer isOpen={isOpen} toggleMenu={toggleMenu} />
      <MobileMenu 
        isOpen={isOpen}
        openSections={openSections}
        toggleSection={toggleSection}
      />
    </div>
  );
};

export default Navbar;
