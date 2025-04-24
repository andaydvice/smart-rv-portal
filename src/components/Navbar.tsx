
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ResponsiveNavbar from "./navigation/ResponsiveNavbar";
import { scrollToTop } from "@/utils/scrollToTop";

const Navbar = () => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return <ResponsiveNavbar />;
};

export default Navbar;
