
import React, { ReactNode, useEffect } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface LayoutProps {
  children: ReactNode;
  noFooter?: boolean;
  className?: string;
  noNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  noFooter = false, 
  className = '',
  noNavbar = false
}) => {
  useEffect(() => {
    // Log that layout was rendered
    console.log('Layout component rendered');
    
    // Force scrolling to top on layout mount
    window.scrollTo(0, 0);
    
    // Ensure layout is visible and has proper background
    document.body.style.backgroundColor = '#080F1F';
    
    const layoutElement = document.querySelector('.layout');
    if (layoutElement instanceof HTMLElement) {
      layoutElement.style.visibility = 'visible';
      layoutElement.style.opacity = '1';
      layoutElement.style.backgroundColor = '#080F1F';
    }
  }, []);
  
  return (
    <div className={`layout flex flex-col min-h-screen bg-[#080F1F] ${className}`} data-main-content="true">
      {!noNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
