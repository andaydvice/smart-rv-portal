
import React from "react";
import Footer2 from "../ui/Footer2";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet-async";
import { RouteOptimizer } from "@/hooks/useRouteOptimization";
import { MobileGestureHandler } from "../mobile/MobileGestureHandler";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTouch } = useMobileOptimization();
  
  // Detect if this is a bot/crawler for immediate content delivery
  const isBot = typeof navigator !== 'undefined' && /bot|crawler|spider|crawling/i.test(navigator.userAgent);
  
  return (
    <MobileGestureHandler className="min-h-screen overflow-x-hidden w-full mobile-container">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#080F1F" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#080F1F" />
        <meta property="og:type" content="website" />
        
        {/* Mobile-specific optimizations */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Smart RV Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.lovable.dev" />
        <link rel="dns-prefetch" href="https://cdn.lovable.dev" />
        
        {/* Mobile-specific preloads based on connection */}
        {isMobile && (
          <>
            <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
            <link rel="modulepreload" href="/src/components/mobile/MobileOptimizedButton.tsx" />
          </>
        )}
        
        {/* SEO-friendly meta tags */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        
        {/* Performance hints */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/og-image.svg" />
      </Helmet>
      
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
      <Footer2 />
    </MobileGestureHandler>
  );
};

export default Layout;
