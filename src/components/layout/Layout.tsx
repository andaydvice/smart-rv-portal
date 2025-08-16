
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
        {/* Language and Document Meta Tags */}
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        
        {/* Basic Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes" />
        <meta name="theme-color" content="#5B9BD5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Smart RV Tech Hub" />
        <meta name="application-name" content="Smart RV Technology Hub" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="generator" content="Smart RV Technology Hub - Lovable Platform" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* PWA and Mobile Optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#5B9BD5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#5B9BD5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#151A22" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Smart RV Technology Hub" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_CA" />
        <meta property="og:locale:alternate" content="en_GB" />
        
        {/* Enhanced Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@smartrvtech" />
        <meta name="twitter:creator" content="@smartrvtech" />
        <meta name="twitter:dnt" content="on" />
        
        {/* Enhanced Robots and SEO */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="slurp" content="index,follow" />
        <meta name="msnbot" content="index,follow" />
        
        {/* Geographic and Business Meta */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="39.8283, -98.5795" />
        <meta name="geo.position" content="39.8283;-98.5795" />
        
        {/* Content Classification */}
        <meta name="rating" content="general" />
        <meta name="audience" content="all" />
        <meta name="distribution" content="global" />
        <meta name="classification" content="business" />
        <meta name="category" content="Technology, RV, Travel" />
        
        {/* Performance and Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://api.lovable.dev" />
        <link rel="dns-prefetch" href="https://cdn.lovable.dev" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5B9BD5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* SEO Resource Files */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" title="Smart RV Technology Hub RSS" href="/rss.xml" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" as="image" href="/og-image.svg" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-var.woff2" crossOrigin="anonymous" />
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
