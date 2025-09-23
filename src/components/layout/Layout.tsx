
import React from "react";
import Footer2 from "../ui/Footer2";
import Navbar from "../Navbar";
import { RouteOptimizer } from "@/hooks/useRouteOptimization";
import { MobileGestureHandler } from "../mobile/MobileGestureHandler";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTouch } = useMobileOptimization();
  
  // Detect if this is a bot/crawler for immediate content delivery
  const isBot = typeof navigator !== 'undefined' && /bot|crawler|spider|crawling/i.test(navigator.userAgent);
  
  return (
    <MobileGestureHandler className="min-h-screen overflow-x-hidden w-full mobile-container">
      <RouteOptimizer />
      <Navbar />
      <main 
        className={`w-full max-w-full overflow-x-hidden mobile-scroll ${isTouch ? 'touch-manipulation' : ''}`}
        role="main"
        aria-label="Main content"
        style={{
          paddingTop: isMobile ? 'var(--mobile-safe-area-top)' : undefined,
          paddingBottom: isMobile ? 'var(--mobile-safe-area-bottom)' : undefined,
        }}
      >
        {children}
      </main>
      
      <Footer2 siteName="Smart RV 2025" />
    </MobileGestureHandler>
  );
};

export default Layout;
