
import { useState, useEffect } from "react";
import NavbarContainer from "./navbar/NavbarContainer";
import MobileMenu from "./navbar/MobileMenu";
import { useAuth } from "./auth/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Navbar effect - Menu state:", isOpen);
  }, [isOpen]);
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    core: false,
    features: false,
    vehicles: false,
    support: false,
    customer: false,
    tools: false
  });

  const toggleMenu = () => {
    console.log("Toggling mobile menu, previous state:", isOpen);
    setIsOpen(prevState => {
      const newState = !prevState;
      console.log("Menu will update to:", newState);
      return newState;
    });
  };

  const toggleSection = (section: string) => {
    console.log(`Toggling section: ${section}, current state:`, openSections[section]);
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // Log after state update
    setTimeout(() => {
      console.log(`Section ${section} new state:`, !openSections[section]);
    }, 0);
  };

  console.log("Navbar rendering, isOpen:", isOpen);

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
