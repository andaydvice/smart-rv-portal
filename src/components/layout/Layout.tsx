
import React from "react";
import Footer2 from "../ui/Footer2";
import Navbar from "../Navbar";
import { Helmet } from "react-helmet-async";
import { RouteOptimizer } from "@/hooks/useRouteOptimization";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  
  // Detect if this is a bot/crawler for immediate content delivery
  const isBot = typeof navigator !== 'undefined' && /bot|crawler|spider|crawling/i.test(navigator.userAgent);
  
  return (
    <div className="min-h-screen bg-deeper-background overflow-x-hidden w-full">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080F1F" />
        <meta property="og:type" content="website" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.lovable.dev" />
        <link rel="dns-prefetch" href="https://cdn.lovable.dev" />
        
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
        className="w-full max-w-full pt-16 overflow-x-hidden bg-deeper-background"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      <Footer2 />
    </div>
  );
};

export default Layout;
