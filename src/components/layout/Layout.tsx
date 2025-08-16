
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
        {/* Basic Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5B9BD5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="generator" content="Smart RV Technology Hub" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Smart RV Technology Hub" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@smartrvtech" />
        <meta name="twitter:creator" content="@smartrvtech" />
        
        {/* Robots and SEO */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow" />
        <meta name="bingbot" content="index,follow" />
        
        {/* Performance and Preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://api.lovable.dev" />
        <link rel="dns-prefetch" href="https://cdn.lovable.dev" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/og-image.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
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
