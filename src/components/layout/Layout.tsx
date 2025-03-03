
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Ensure root element is visible
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.display = 'block';
      rootElement.style.visibility = 'visible';
      rootElement.style.opacity = '1';
    }
    
    // Force visibility of any hero sections
    const heroSections = document.querySelectorAll('.hero-section');
    heroSections.forEach(section => {
      if (section instanceof HTMLElement) {
        section.style.display = 'flex';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#080F1F]">
      <ScrollToTop />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
