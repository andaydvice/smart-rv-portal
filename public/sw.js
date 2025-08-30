/**
 * ULTRA AGGRESSIVE Cache-clearing Service Worker
 * This service worker immediately destroys all caches and itself
 */

const DEPLOYMENT_VERSION = 'revolutionising-20250830';

// Install event - skip waiting and clear everything immediately
self.addEventListener('install', function(event) {
  console.log('SW Install: Starting aggressive cache clearing');
  self.skipWaiting();
  
  event.waitUntil(
    clearAllCaches().then(() => {
      console.log('SW Install: All caches cleared');
    })
  );
});

// Activate event - take control and unregister
self.addEventListener('activate', function(event) {
  console.log('SW Activate: Taking control and clearing caches');
  
  event.waitUntil(
    Promise.all([
      clearAllCaches(),
      self.clients.claim()
    ]).then(() => {
      console.log('SW Activate: Cache clearing complete, unregistering');
      return self.registration.unregister();
    }).then(() => {
      console.log('SW: Successfully unregistered after cache clearing');
      // Notify all clients to reload
      return self.clients.matchAll();
    }).then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'CACHE_CLEARED',
          version: DEPLOYMENT_VERSION
        });
      });
    })
  );
});

// Fetch event - never cache, always network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request, {
      cache: 'no-store',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }).then(response => {
      // Clone response and add no-cache headers
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
      newHeaders.set('Pragma', 'no-cache');
      newHeaders.set('Expires', '0');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }).catch(() => {
      return new Response('Network error - cache cleared', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
    })
  );
});

// Message handler for manual cache clearing
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Clear all caches function
function clearAllCaches() {
  return caches.keys().then(function(cacheNames) {
    console.log('SW: Clearing', cacheNames.length, 'caches');
    return Promise.all(
      cacheNames.map(function(cacheName) {
        console.log('SW: Deleting cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
  }).then(() => {
    console.log('SW: All caches successfully deleted');
  }).catch(error => {
    console.error('SW: Error clearing caches:', error);
  });
}