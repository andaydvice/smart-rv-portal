
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarContainer from "./navbar/NavbarContainer";
import MobileNavigation from "./navigation/MobileNavigation";
import { scrollToTop } from "@/utils/scrollToTop";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    scrollToTop();
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <NavbarContainer isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      <MobileNavigation isOpen={isMobileMenuOpen} />
    </>
  );
};

export default Navbar;
