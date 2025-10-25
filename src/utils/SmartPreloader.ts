/**
 * Smart Preloading System for SEO-aware resource optimization
 * Preloads critical SEO resources and implements intelligent prefetching
 */

import { pageMetadata } from './static-generator';

interface PreloadConfig {
  enableIntersectionObserver?: boolean;
  prefetchOnHover?: boolean;
  prioritizeSEORoutes?: boolean;
  maxConcurrentPreloads?: number;
  delayMs?: number;
}

class SmartPreloader {
  private preloadedResources = new Set<string>();
  private intersectionObserver?: IntersectionObserver;
  private hoverTimeouts = new Map<string, number>();
  private config: Required<PreloadConfig>;
  private preloadQueue: string[] = [];
  private activePreloads = 0;

  constructor(config: PreloadConfig = {}) {
    this.config = {
      enableIntersectionObserver: true,
      prefetchOnHover: true,
      prioritizeSEORoutes: true,
      maxConcurrentPreloads: 5, // Increased for better performance
      delayMs: 200, // Reduced delay for faster response
      ...config
    };

    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Preload critical SEO resources immediately
    this.preloadCriticalSEOResources();
    
    // Preload critical homepage assets for faster initial load
    this.preloadHomepageAssets();

    // Set up intersection observer for viewport-based preloading
    if (this.config.enableIntersectionObserver) {
      this.setupIntersectionObserver();
    }

    // Set up hover-based prefetching
    if (this.config.prefetchOnHover) {
      this.setupHoverPrefetching();
    }

    // Preload high-priority routes
    if (this.config.prioritizeSEORoutes) {
      this.preloadSEORoutes();
    }
  }

  /**
   * Preload critical SEO resources like sitemaps and structured data
   */
  private preloadCriticalSEOResources() {
    const criticalResources = [
      '/sitemap.xml',
      '/robots.txt',
      '/rss.xml',
      '/manifest.json'
    ];

    criticalResources.forEach(resource => {
      this.preloadResource(resource, 'fetch');
    });
  }

  /**
   * Preload critical homepage assets for faster initial render
   */
  private preloadHomepageAssets() {
    // Only preload on homepage or when likely to navigate to homepage
    const isHomepage = window.location.pathname === '/';
    const isLikelyToVisitHomepage = document.referrer === '' || !document.referrer.includes(window.location.hostname);
    
    if (isHomepage || isLikelyToVisitHomepage) {
      const homepageAssets = [
        // Hero section background images
        '/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.webp',
        // Features section backgrounds
        '/lovable-uploads/03ccf137-16cb-41a0-bfb5-2179fe20eb79.webp',
        // Technology section backgrounds
        '/lovable-uploads/0a22c848-dff2-43f4-b1eb-800fa123a904.webp',
        // Sustainability section background
        '/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.webp',
      ];

      homepageAssets.forEach(asset => {
        this.preloadResource(asset, 'image');
      });

      // Preload Google Fonts for faster text rendering
      this.preloadResource('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', 'style');
    }
  }

  /**
   * Set up intersection observer for lazy preloading
   */
  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          if (link.href && !this.preloadedResources.has(link.href)) {
            this.queuePreload(link.href);
          }
        }
      });
    }, {
      rootMargin: '100px' // Start preloading 100px before the link enters viewport
    });

    // Observe all internal links
    this.observeLinks();
  }

  /**
   * Set up hover-based prefetching
   */
  private setupHoverPrefetching() {
    document.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement;
      
      if (link && this.isInternalLink(link.href)) {
        const href = link.href;
        
        // Clear any existing timeout for this link
        const existingTimeout = this.hoverTimeouts.get(href);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }

        // Set new timeout for delayed preloading
        const timeout = window.setTimeout(() => {
          this.queuePreload(href);
          this.hoverTimeouts.delete(href);
        }, this.config.delayMs);

        this.hoverTimeouts.set(href, timeout);
      }
    });

    // Cancel preload on mouse leave
    document.addEventListener('mouseout', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement;
      
      if (link && this.isInternalLink(link.href)) {
        const timeout = this.hoverTimeouts.get(link.href);
        if (timeout) {
          clearTimeout(timeout);
          this.hoverTimeouts.delete(link.href);
        }
      }
    });
  }

  /**
   * Preload high-priority SEO routes
   */
  private preloadSEORoutes() {
    // High-priority routes - now synchronous, so preload their assets
    const highPriorityRoutes = [
      '/',
      '/features',
      '/models',
      '/about',
      '/products',
      '/calculators',
      '/contact',
      '/pricing'
    ];

    // Medium-priority routes for hover preloading
    const mediumPriorityRoutes = [
      '/blog',
      '/documentation',
      '/technology',
      '/features/audio-system',
      '/features/smart-tv',
      '/models/compact',
      '/models/luxury',
      '/models/adventure'
    ];

    // Use idle time to preload high-priority route assets
    this.scheduleIdlePreloading(() => {
      this.preloadRouteAssets();
      
      // Setup enhanced navigation hover preloading
      this.setupNavigationHoverPreloading(mediumPriorityRoutes);
    });
  }

  /**
   * Queue a preload with concurrency control
   */
  private queuePreload(url: string) {
    if (this.preloadedResources.has(url)) return;

    this.preloadQueue.push(url);
    this.processPreloadQueue();
  }

  /**
   * Process the preload queue respecting concurrency limits
   */
  private processPreloadQueue() {
    while (this.preloadQueue.length > 0 && this.activePreloads < this.config.maxConcurrentPreloads) {
      const url = this.preloadQueue.shift()!;
      this.preloadPage(url);
    }
  }

  /**
   * Preload a specific resource
   */
  private preloadResource(href: string, as: string = 'document') {
    if (this.preloadedResources.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    // Add crossorigin for fetch requests
    if (as === 'fetch') {
      link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  /**
   * Preload a page using various strategies
   */
  private async preloadPage(url: string) {
    if (this.preloadedResources.has(url)) return;

    this.activePreloads++;
    this.preloadedResources.add(url);

    try {
      // Use prefetch for non-critical resources
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);

      // Also preload the page's critical CSS and JS if we know about it
      const pathname = new URL(url).pathname;
      const metadata = pageMetadata[pathname];
      
      if (metadata) {
        // Preload critical resources for this route
        // Page metadata doesn't include ogImage, so we'll preload standard assets
        console.log('Preloading route resources for:', pathname);
      }

    } catch (error) {
      console.warn('Failed to preload:', url, error);
    } finally {
      this.activePreloads--;
      
      // Process more items from the queue
      setTimeout(() => this.processPreloadQueue(), 100);
    }
  }

  /**
   * Observe all internal links for intersection-based preloading
   */
  private observeLinks() {
    if (!this.intersectionObserver) return;

    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const anchor = link as HTMLAnchorElement;
      if (this.isInternalLink(anchor.href)) {
        this.intersectionObserver!.observe(anchor);
      }
    });
  }

  /**
   * Check if a URL is an internal link
   */
  private isInternalLink(href: string): boolean {
    try {
      const url = new URL(href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  /**
   * Schedule preloading during idle time
   */
  private scheduleIdlePreloading(callback: () => void) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 5000 });
    } else {
      setTimeout(callback, 2000);
    }
  }

  /**
   * Preload critical above-the-fold resources
   */
  preloadCriticalResources(resources: string[]) {
    resources.forEach(resource => {
      this.preloadResource(resource, this.getResourceType(resource));
    });
  }

  /**
   * Get appropriate resource type for preloading
   */
  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'css':
        return 'style';
      case 'js':
        return 'script';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
      case 'svg':
        return 'image';
      case 'woff':
      case 'woff2':
        return 'font';
      case 'mp4':
      case 'webm':
        return 'video';
      default:
        return 'fetch';
    }
  }

  /**
   * Preload route-specific resources
   */
  preloadRoute(pathname: string) {
    const metadata = pageMetadata[pathname];
    if (!metadata) return;

    const resources = [];
    
    // Add standard OG image
    resources.push('/og-image.svg');

    // Preload the route itself
    resources.push(window.location.origin + pathname);

    this.preloadCriticalResources(resources);
  }

  /**
   * Enhanced hover preloading specifically for navigation
   */
  private setupNavigationHoverPreloading(mediumPriorityRoutes: string[]) {
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && this.isInternalLink(link.href)) {
        const url = new URL(link.href).pathname;
        
        // Immediate preload for medium-priority routes on hover
        if (mediumPriorityRoutes.includes(url)) {
          this.queuePreload(link.href);
        }
      }
    });
  }

  /**
   * Preload assets specific to high-priority routes
   */
  private preloadRouteAssets() {
    const routeAssets: Record<string, string[]> = {
      '/calculators': ['/images/calculator-bg.webp'],
      '/features': ['/images/features-hero.webp'],
      '/models': ['/images/models-hero.webp'],
      '/products': ['/images/products-hero.webp'],
      '/contact': ['/images/contact-bg.webp']
    };

    Object.entries(routeAssets).forEach(([route, assets]) => {
      assets.forEach(asset => {
        this.preloadResource(asset, this.getResourceType(asset));
      });
    });
  }

  /**
   * Clean up observers and timeouts
   */
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    this.hoverTimeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
    this.hoverTimeouts.clear();
  }
}

// Create singleton instance
export const smartPreloader = new SmartPreloader();

// Export convenience functions
export const preloadRoute = smartPreloader.preloadRoute.bind(smartPreloader);
export const preloadCriticalResources = smartPreloader.preloadCriticalResources.bind(smartPreloader);
export const destroyPreloader = smartPreloader.destroy.bind(smartPreloader);