/**
 * Cache-clearing Service Worker
 * This service worker immediately unregisters itself and clears all caches
 */

// On install, skip waiting to activate immediately
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// On activate, clear all caches and unregister
self.addEventListener('activate', function(event) {
  event.waitUntil(
    Promise.all([
      // Clear all caches
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            console.log('Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }),
      // Claim all clients to take control immediately
      self.clients.claim()
    ]).then(function() {
      // Unregister this service worker
      self.registration.unregister().then(function() {
        console.log('Service worker unregistered successfully');
      });
    })
  );
});

// Intercept fetch requests and always go to network (no caching)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request, {
      cache: 'no-store',
      credentials: 'same-origin'
    }).catch(function() {
      // If network fails, just return a network error
      return new Response('Network error', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    })
  );
});