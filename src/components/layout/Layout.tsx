
import React, { ReactNode } from 'react';
import Footer from '../Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import GlobalAutoRefreshControl from '../ui/GlobalAutoRefreshControl';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  hideFooter?: boolean;
}

const Layout = ({ children, className = '', hideFooter = false }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-[#080F1F] text-white ${className}`}>
      <ScrollArea className="h-screen">
        <main className="min-h-[calc(100vh-200px)]">
          {children}
        </main>
        {!hideFooter && <Footer />}
        
        {/* Global auto-refresh indicator in corner */}
        <GlobalAutoRefreshControl />
      </ScrollArea>
    </div>
  );
};

export default Layout;
