/**
 * Enhanced prerendering utilities for improved SEO
 * Serves optimized content to bots while maintaining SPA functionality
 */

import { generateStaticHTML, pageMetadata } from './static-generator';

// More specific bot detection to avoid false positives
export const isBot = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  
  // Exclude common browsers first
  const browserPatterns = [
    /chrome\/\d+\.\d+/i,
    /firefox\/\d+\.\d+/i,
    /safari\/\d+\.\d+/i,
    /edge\/\d+\.\d+/i,
    /opera\/\d+\.\d+/i
  ];
  
  // If it looks like a regular browser, check for bot indicators
  if (browserPatterns.some(pattern => pattern.test(userAgent))) {
    const specificBotPatterns = [
      /googlebot\/\d+\.\d+/i,
      /bingbot\/\d+\.\d+/i,
      /headlesschrome/i,
      /phantomjs/i
    ];
    return specificBotPatterns.some(pattern => pattern.test(userAgent));
  }
  
  // More specific bot patterns
  const botPatterns = [
    /googlebot\/\d+\.\d+/i,
    /bingbot\/\d+\.\d+/i,
    /yahoo! slurp/i,
    /duckduckbot-https\/\d+\.\d+/i,
    /baiduspider\/\d+\.\d+/i,
    /yandexbot\/\d+\.\d+/i,
    /sogou\s+web\s+spider/i,
    /twitterbot\/\d+\.\d+/i,
    /facebookexternalhit\/\d+\.\d+/i,
    /whatsapp\/\d+\.\d+/i,
    /telegram.*bot/i,
    /linkedinbot\/\d+\.\d+/i,
    /slackbot.*link.*expanding/i,
    /discordbot/i,
    /applebot\/\d+\.\d+/i,
    /\bcrawler\b.*\bbot\b/i,
    /\bspider\b.*\bbot\b/i,
    /sitemapgenerator.*bot/i,
    /pinterestbot\/\d+\.\d+/i,
    /redditbot\/\d+\.\d+/i,
    /skypeuripreview/i
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
};

// Detect if this is a social media crawler
export const isSocialBot = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const socialBotPatterns = [
    /facebookexternalhit/i,
    /twitterbot/i,
    /whatsapp/i,
    /telegram/i,
    /linkedinbot/i,
    /slackbot/i,
    /discordbot/i,
    /pinterestbot/i,
    /redditbot/i,
    /skypeuripreview/i
  ];
  
  return socialBotPatterns.some(pattern => pattern.test(navigator.userAgent));
};

// Cache for prerendered content
const prerenderCache = new Map<string, string>();

/**
 * Get prerendered HTML for a route
 * Returns cached content or generates it dynamically for bots
 */
export const getPrerenderContent = (path: string): string | null => {
  const cached = prerenderCache.get(path);
  if (cached) return cached;
  
  // Generate static content for bots if not cached
  if (isBot() || isSocialBot()) {
    const staticHTML = generateStaticHTML(path);
    setPrerenderContent(path, staticHTML);
    return staticHTML;
  }
  
  return null;
};

/**
 * Set prerendered content for a route
 * This can be used to cache content for bots
 */
export const setPrerenderContent = (path: string, html: string): void => {
  prerenderCache.set(path, html);
};

/**
 * Generate static HTML snapshot of current page
 * This can be used for dynamic prerendering
 */
export const generatePageSnapshot = (): string => {
  if (typeof document === 'undefined') return '';
  
  const html = document.documentElement.outerHTML;
  
  // Clean up dynamic elements that shouldn't be in snapshots
  const cleanedHtml = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
    .replace(/data-react[^=]*="[^"]*"/g, '') // Remove React attributes
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
    
  return cleanedHtml;
};

/**
 * Enhanced bot-specific optimizations
 * This should be called early in the application lifecycle
 */
export const handleBotOptimizations = (): void => {
  if (!isBot() && !isSocialBot()) return;

  console.log('Bot detected, applying optimizations...');

  // Remove loading screens and spinners immediately for bots
  const loadingElements = document.querySelectorAll(
    '.loading-fallback, .loading-screen, .spinner, [class*="animate-pulse"], [class*="animate-spin"]'
  );
  loadingElements.forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });

  // Add comprehensive bot-specific meta tags
  const botMeta = [
    { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' },
    { name: 'googlebot', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' },
    { name: 'bingbot', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' }
  ];

  botMeta.forEach(({ name, content }) => {
    if (!document.querySelector(`meta[name="${name}"]`)) {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });

  // Ensure all lazy-loaded images are loaded immediately for bots
  const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"], img[class*="lazy"]');
  lazyImages.forEach(img => {
    const image = img as HTMLImageElement;
    if (image.dataset.src) {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    }
    image.removeAttribute('loading');
    image.loading = 'eager';
  });

  // Force load any React Suspense fallbacks for bots
  setTimeout(() => {
    const suspenseElements = document.querySelectorAll('[data-testid="suspense-fallback"]');
    suspenseElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  }, 100);

  // Add structured data to the page if not already present
  if (!document.querySelector('script[type="application/ld+json"]')) {
    const currentPath = window.location.pathname;
    const metadata = pageMetadata[currentPath];
    if (metadata?.structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(metadata.structuredData);
      document.head.appendChild(script);
    }
  }
};

/**
 * Netlify/Vercel-style prerendering detection
 * These services can detect and prerender pages for bots
 */
export const shouldPrerender = (): boolean => {
  return isBot() || isSocialBot();
};

/**
 * Generate prerender configuration for build tools
 * This helps build tools know which routes to prerender
 */
export const getPrerenderRoutes = (): string[] => {
  return [
    '/',
    '/about',
    '/products', 
    '/pricing',
    '/contact',
    '/blog',
    '/features',
    '/models',
    '/models/compact',
    '/models/luxury', 
    '/models/adventure',
    '/models/compare',
    '/technology',
    '/documentation',
    '/calculators',
    '/troubleshooting'
  ];
};