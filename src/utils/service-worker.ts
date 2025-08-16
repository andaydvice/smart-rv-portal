/**
 * Service Worker registration and management
 * Handles caching, offline functionality, and performance improvements
 */

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | undefined> => {
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    try {
      console.log('Registering service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Always check for updates
      });

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          console.log('New service worker found, installing...');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              console.log('New content is available; please refresh.');
              
              // Optional: Show update notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('App Update Available', {
                  body: 'New content is available. Refresh to update.',
                  icon: '/og-image.svg'
                });
              }
            }
          });
        }
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

      console.log('Service worker registered successfully');
      
      // Initialize background sync
      if ('sync' in registration) {
        console.log('Background sync is supported');
      }

      return registration;
      
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  } else {
    console.log('Service workers not supported or not on HTTPS');
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.unregister()));
      console.log('Service workers unregistered');
    } catch (error) {
      console.error('Service worker unregistration failed:', error);
    }
  }
};

export const clearAllCaches = async (): Promise<void> => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('All caches cleared');
    } catch (error) {
      console.error('Cache clearing failed:', error);
    }
  }
};

export const getServiceWorkerStatus = (): string => {
  if (!('serviceWorker' in navigator)) {
    return 'not_supported';
  }

  if (!navigator.serviceWorker.controller) {
    return 'not_registered';
  }

  return navigator.serviceWorker.controller.state;
};

// Preload critical resources
export const preloadCriticalResources = (): void => {
  const criticalResources = [
    { href: '/og-image.svg', as: 'image' },
    { href: '/favicon.ico', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.as === 'style') {
      link.onload = () => {
        link.rel = 'stylesheet';
      };
    }
    
    document.head.appendChild(link);
  });
};

// Performance monitoring integration
export const trackServiceWorkerPerformance = (): void => {
  if ('serviceWorker' in navigator && 'performance' in window) {
    navigator.serviceWorker.ready.then(() => {
      // Measure service worker activation time
      const swActivationTime = performance.now();
      console.log(`Service Worker ready after ${swActivationTime.toFixed(2)}ms`);
      
      // Track cache hit rates
      let cacheHits = 0;
      let cacheMisses = 0;
      
      // Monitor network requests to track cache effectiveness
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            
            // Estimate cache hits based on response time
            if (resourceEntry.duration < 50) { // Very fast response likely from cache
              cacheHits++;
            } else {
              cacheMisses++;
            }
          }
        });
        
        const cacheHitRate = cacheHits / (cacheHits + cacheMisses);
        if (cacheHitRate > 0) {
          console.log(`Cache hit rate: ${(cacheHitRate * 100).toFixed(1)}%`);
        }
      });
      
      try {
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.log('Performance observer not supported');
      }
    });
  }
};