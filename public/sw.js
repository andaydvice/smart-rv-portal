/**
 * Optimized Service Worker for Cache Management
 * Only clears caches when version changes, not on every load
 */

const DEPLOYMENT_VERSION = 'revolutionising-20250830';
const CACHE_NAME = `smartrvhub-${DEPLOYMENT_VERSION}`;

// Install event - only clear outdated caches
self.addEventListener('install', function(event) {
  console.log('SW Install: Checking for cache updates');
  self.skipWaiting();
  
  event.waitUntil(
    clearOutdatedCaches().then(() => {
      console.log('SW Install: Outdated caches cleared');
    })
  );
});

// Activate event - take control but don't aggressively clear
self.addEventListener('activate', function(event) {
  console.log('SW Activate: Taking control');
  
  event.waitUntil(
    Promise.all([
      clearOutdatedCaches(),
      self.clients.claim()
    ]).then(() => {
      console.log('SW Activate: Ready');
      return self.clients.matchAll();
    }).then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_READY',
          version: DEPLOYMENT_VERSION
        });
      });
    })
  );
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests and chrome-extension
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Don't cache errors or non-successful responses
        if (!response.ok) {
          return response;
        }

        // Clone response for caching
        const responseToCache = response.clone();
        
        // Cache static assets only
        if (event.request.url.includes('/assets/') || 
            event.request.url.includes('.js') || 
            event.request.url.includes('.css')) {
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache for static assets
        return caches.match(event.request);
      })
  );
});

// Message handler for cache operations
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Clear only outdated caches (not current version)
function clearOutdatedCaches() {
  return caches.keys().then(function(cacheNames) {
    const outdatedCaches = cacheNames.filter(name => !name.includes(DEPLOYMENT_VERSION));
    console.log('SW: Clearing', outdatedCaches.length, 'outdated caches');
    
    return Promise.all(
      outdatedCaches.map(function(cacheName) {
        console.log('SW: Deleting outdated cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
  }).then(() => {
    console.log('SW: Outdated caches cleared');
  }).catch(error => {
    console.error('SW: Error clearing outdated caches:', error);
  });
}

// Clear all caches function (for manual clearing)
function clearAllCaches() {
  return caches.keys().then(function(cacheNames) {
    console.log('SW: Force clearing all', cacheNames.length, 'caches');
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  }).then(() => {
    console.log('SW: All caches cleared');
  }).catch(error => {
    console.error('SW: Error clearing all caches:', error);
  });
}