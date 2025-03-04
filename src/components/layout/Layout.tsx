
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";

// Enhanced scroll to top component with smooth behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isReady, setIsReady] = useState(false);
  
  // Ensure content is visible after hydration
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col bg-[#080F1F] ${isReady ? 'opacity-100' : 'opacity-0'}`} 
         style={{ transition: 'opacity 0.3s ease-in-out' }}>
      <ScrollToTop />
      <main className="flex-grow content-visibility-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
