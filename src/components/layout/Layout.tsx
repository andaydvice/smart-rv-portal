
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";

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
  console.log('Rendering Layout component with children');
  
  useEffect(() => {
    // Force visibility when layout mounts
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Ensure scroll position is at the top
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
