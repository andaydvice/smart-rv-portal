
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
    // Set content as loaded after a short delay
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-[#080F1F] text-white ${className}`}>
      <ScrollArea className="h-screen">
        {!contentLoaded ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size="md" />
          </div>
        ) : (
          <>
            <main className="min-h-[calc(100vh-200px)]">
              {children}
            </main>
            {!hideFooter && <Footer />}
          </>
        )}
        
        {/* Global auto-refresh indicator in corner */}
        <GlobalAutoRefreshControl />
      </ScrollArea>
    </div>
  );
};

export default Layout;
