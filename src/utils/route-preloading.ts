/**
 * Route preloading strategies for improved perceived performance
 */

interface PreloadConfig {
  routes: string[];
  priority: 'high' | 'low';
  condition?: () => boolean;
}

class RoutePreloader {
  private preloadedRoutes = new Set<string>();
  private preloadPromises = new Map<string, Promise<any>>();
  private observers: IntersectionObserver[] = [];

  // Preload critical routes immediately
  preloadCriticalRoutes() {
    const criticalRoutes: PreloadConfig[] = [
      {
        routes: ['/about', '/features', '/models'],
        priority: 'high',
        condition: () => {
          const connection = (navigator as any).connection;
          return !connection || connection.effectiveType !== 'slow-2g';
        }
      },
      {
        routes: ['/blog', '/products'],
        priority: 'low',
        condition: () => {
          const connection = (navigator as any).connection;
          return !connection || connection.effectiveType === '4g';
        }
      }
    ];

    criticalRoutes.forEach(config => {
      if (!config.condition || config.condition()) {
        this.schedulePreload(config.routes, config.priority);
      }
    });
  }

  // Schedule preloading based on priority
  private schedulePreload(routes: string[], priority: 'high' | 'low') {
    const delay = priority === 'high' ? 0 : 2000;
    
    setTimeout(() => {
      routes.forEach((route, index) => {
        setTimeout(() => {
          this.preloadRoute(route);
        }, index * 500); // Stagger preloading
      });
    }, delay);
  }

  // Preload individual route
  async preloadRoute(route: string): Promise<void> {
    if (this.preloadedRoutes.has(route)) return;

    try {
      let preloadPromise: Promise<any>;

      // Map routes to their component imports
      switch (route) {
        case '/about':
          preloadPromise = import('@/pages/About');
          break;
        case '/features':
          preloadPromise = import('@/pages/Features');
          break;
        case '/models':
          preloadPromise = import('@/pages/Models');
          break;
        case '/blog':
          preloadPromise = import('@/pages/Blog');
          break;
        case '/products':
          preloadPromise = import('@/pages/Products');
          break;
        default:
          return;
      }

      this.preloadPromises.set(route, preloadPromise);
      await preloadPromise;
      this.preloadedRoutes.add(route);
      
      console.log(`✅ Preloaded route: ${route}`);
    } catch (error) {
      console.warn(`Failed to preload route ${route}:`, error);
    }
  }

  // Preload routes when user hovers over links
  setupHoverPreloading() {
    const linkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          const href = link.getAttribute('href');
          
          if (href && href.startsWith('/')) {
            // Setup hover preloading for visible links
            link.addEventListener('mouseenter', () => {
              this.preloadRoute(href);
            }, { once: true });
          }
        }
      });
    }, { rootMargin: '100px' });

    // Observe all internal links
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => linkObserver.observe(link));
    this.observers.push(linkObserver);
  }

  // Preload based on user intent (mouse movement towards links)
  setupIntentPreloading() {
    let hoverTimeout: NodeJS.Timeout;
    
    document.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement;
      
      if (link) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          const href = link.getAttribute('href');
          if (href) {
            this.preloadRoute(href);
          }
        }, 100); // Small delay to avoid unnecessary preloads
      }
    });
  }

  // Get preload status for debugging
  getPreloadStatus() {
    return {
      preloadedRoutes: Array.from(this.preloadedRoutes),
      pendingPreloads: Array.from(this.preloadPromises.keys())
    };
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const routePreloader = new RoutePreloader();

// Initialize preloading
export const initializePreloading = () => {
  if (typeof window === 'undefined') return;

  // Wait for initial load to complete
  if (document.readyState === 'complete') {
    startPreloading();
  } else {
    window.addEventListener('load', startPreloading);
  }
};

const startPreloading = () => {
  // Use requestIdleCallback for non-blocking preloading
  const schedulePreloading = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 5000 });
    } else {
      setTimeout(callback, 0);
    }
  };

  schedulePreloading(() => {
    routePreloader.preloadCriticalRoutes();
    routePreloader.setupHoverPreloading();
    routePreloader.setupIntentPreloading();
  });
};