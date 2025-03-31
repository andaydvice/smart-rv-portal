import React, { ReactNode, useEffect, useState } from 'react';
import Footer from '../Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import GlobalAutoRefreshControl from '../ui/GlobalAutoRefreshControl';
import { Spinner } from '../ui/spinner';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  hideFooter?: boolean;
}

const Layout = ({ children, className = '', hideFooter = false }: LayoutProps) => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Mark content as loaded immediately if document is already complete
    if (document.readyState === 'complete') {
      setContentLoaded(true);
    } else {
      // Otherwise wait for the DOMContentLoaded event
      const handleContentLoaded = () => {
        setContentLoaded(true);
      };
      
      // Set content as loaded after a short delay
      const timer = setTimeout(() => {
        setContentLoaded(true);
      }, 800);
      
      window.addEventListener('DOMContentLoaded', handleContentLoaded);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('DOMContentLoaded', handleContentLoaded);
      };
    }
  }, []);

  return (
    <div className={`min-h-screen bg-[#080F1F] text-white ${className}`}>
      <ScrollArea className="h-screen overflow-y-auto">
        {!contentLoaded ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Spinner size="md" className="mx-auto mb-4" />
              <p className="text-gray-300">Loading content...</p>
            </div>
          </div>
        ) : (
          <>
            <main className="min-h-[calc(100vh-200px)]">
              {children}
            </main>
            {!hideFooter && <Footer />}
          </>
        )}
        
        {/* Show auto-refresh control only after content is loaded */}
        {contentLoaded && <GlobalAutoRefreshControl className="fixed bottom-4 right-4 z-50" />}
      </ScrollArea>
    </div>
  );
};

export default Layout;
