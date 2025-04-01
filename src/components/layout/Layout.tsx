
import React, { ReactNode, useEffect } from 'react';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  noFooter?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, noFooter = false, className = '' }) => {
  useEffect(() => {
    // Log that layout was rendered
    console.log('Layout component rendered');
    
    // Force scrolling to top on layout mount
    window.scrollTo(0, 0);
    
    // Ensure layout is visible
    const layoutElement = document.querySelector('.layout');
    if (layoutElement instanceof HTMLElement) {
      layoutElement.style.visibility = 'visible';
      layoutElement.style.opacity = '1';
    }
  }, []);
  
  return (
    <div className={`layout flex flex-col min-h-screen ${className}`} data-main-content="true">
      <main className="flex-grow">
        {children}
      </main>
      
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
