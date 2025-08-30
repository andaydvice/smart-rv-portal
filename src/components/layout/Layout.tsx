
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MobileGestureHandler } from '@/components/mobile/MobileGestureHandler';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Smart RV Portal - Revolutionary RV Technology", 
  description = "Discover cutting-edge smart RV technology, calculate optimal setups, and explore the future of mobile living with our comprehensive RV portal." 
}) => {
  return (
    <MobileGestureHandler>
      <div className="min-h-screen bg-gradient-to-b from-transparent to-connectivity-darkBg">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </div>
    </MobileGestureHandler>
  );
};

export default Layout;
