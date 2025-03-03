
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import { ensureVisibility } from "@/utils/visibility";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop effect triggered for path:', pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Ensure visibility of all critical elements on mount
    ensureVisibility();
    
    // Add additional check after a short delay to catch any late-rendering elements
    const timeoutId = setTimeout(() => {
      ensureVisibility();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#080F1F]">
      <ScrollToTop />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
