/**
 * Bundle optimization utilities
 * Implements code splitting, tree shaking, and performance monitoring
 */

// Dynamic imports for route-based code splitting
export const lazyLoadRoute = (importFn: () => Promise<any>) => {
  return importFn().catch(error => {
    console.error('Route loading failed:', error);
    // Fallback to error page
    return import('@/pages/ErrorPage');
  });
};

// Preload critical routes during idle time
export const preloadCriticalRoutes = () => {
  if (typeof window === 'undefined') return;

  const routes = [
    () => import('@/pages/About'),
    () => import('@/pages/Products'),
    () => import('@/pages/Blog'),
    () => import('@/pages/Features')
  ];

  const preloadRoute = (importFn: () => Promise<any>) => {
    return importFn().catch(() => {
      // Silently fail preloading
    });
  };

  // Use requestIdleCallback for non-blocking preloading
  const idle = (callback: IdleRequestCallback) => {
    if ('requestIdleCallback' in window) {
      return requestIdleCallback(callback, { timeout: 5000 });
    } else {
      return setTimeout(callback, 0);
    }
  };

  // Preload routes one by one during idle time
  routes.forEach((route, index) => {
    idle(() => {
      setTimeout(() => {
        preloadRoute(route);
      }, index * 1000); // Stagger loading
    });
  });
};

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (typeof window === 'undefined' || typeof performance === 'undefined') return;

  // Monitor resource sizes
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  let totalJS = 0;
  let totalCSS = 0;
  let totalImages = 0;

  resources.forEach(resource => {
    const size = resource.transferSize || 0;
    
    if (resource.name.includes('.js')) {
      totalJS += size;
    } else if (resource.name.includes('.css')) {
      totalCSS += size;
    } else if (/\.(png|jpg|jpeg|webp|svg|gif)/.test(resource.name)) {
      totalImages += size;
    }
  });

  const bundleInfo = {
    totalJS: Math.round(totalJS / 1024), // KB
    totalCSS: Math.round(totalCSS / 1024), // KB
    totalImages: Math.round(totalImages / 1024), // KB
    totalSize: Math.round((totalJS + totalCSS + totalImages) / 1024) // KB
  };

  console.log('Bundle Size Analysis:', bundleInfo);

  // Performance budgets (from performance-config.ts)
  const budgets = {
    js: 150, // KB
    css: 50, // KB
    images: 200, // KB per image
    total: 300 // KB
  };

  // Check against budgets
  const warnings = [];
  if (bundleInfo.totalJS > budgets.js) {
    warnings.push(`⚠️ JS bundle (${bundleInfo.totalJS}KB) exceeds budget (${budgets.js}KB)`);
  }
  if (bundleInfo.totalCSS > budgets.css) {
    warnings.push(`⚠️ CSS bundle (${bundleInfo.totalCSS}KB) exceeds budget (${budgets.css}KB)`);
  }
  if (bundleInfo.totalSize > budgets.total) {
    warnings.push(`⚠️ Total bundle (${bundleInfo.totalSize}KB) exceeds budget (${budgets.total}KB)`);
  }

  if (warnings.length > 0) {
    console.warn('Performance Budget Warnings:', warnings);
  } else {
    console.log('✅ All performance budgets met');
  }

  return bundleInfo;
};

// Tree shaking detector
export const detectUnusedCode = () => {
  if (typeof window === 'undefined') return;

  // Monitor which modules are actually used
  const usedModules = new Set<string>();
  
  // Track module usage
  const originalImport = window.eval('import');
  if (originalImport) {
    (window as any).import = function(modulePath: string) {
      usedModules.add(modulePath);
      return originalImport.call(this, modulePath);
    };
  }

  // Report unused imports after a delay
  setTimeout(() => {
    console.log('Used modules:', Array.from(usedModules));
  }, 10000);
};

// Critical resource hints
export const addResourceHints = () => {
  if (typeof document === 'undefined') return;

  const hints = [
    // Preconnect to external domains
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    
    // DNS prefetch for external resources
    { rel: 'dns-prefetch', href: 'https://api.lovable.dev' },
    { rel: 'dns-prefetch', href: 'https://cdn.lovable.dev' },
    
    // Preload critical assets
    { rel: 'preload', href: '/og-image.svg', as: 'image' },
    { rel: 'preload', href: '/favicon.ico', as: 'image' }
  ];

  hints.forEach(hint => {
    const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      Object.assign(link, hint);
      document.head.appendChild(link);
    }
  });
};

// Image optimization utilities
export const optimizeImages = () => {
  if (typeof document === 'undefined') return;

  // Add loading="lazy" to images below the fold
  const images = document.querySelectorAll('img:not([loading])');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (!img.loading) {
          img.loading = 'lazy';
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  images.forEach(img => {
    // Only lazy load images that are not in the viewport
    const rect = img.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      observer.observe(img);
    }
  });

  // Convert images to WebP when supported
  if ('HTMLCanvasElement' in window) {
    const canvas = document.createElement('canvas');
    const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (supportsWebP) {
      document.documentElement.classList.add('webp-supported');
    }
  }
};

// CSS optimization
export const optimizeCSS = () => {
  if (typeof document === 'undefined') return;

  // Remove unused CSS classes (basic detection)
  const stylesheets = Array.from(document.styleSheets);
  const usedClasses = new Set<string>();

  // Collect used classes
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    if (el.className) {
      el.className.split(' ').forEach(cls => {
        if (cls.trim()) usedClasses.add(cls.trim());
      });
    }
  });

  console.log('Used CSS classes:', usedClasses.size);
  
  // This is just monitoring - actual CSS purging should be done at build time
  return {
    usedClasses: usedClasses.size,
    totalElements: elements.length
  };
};