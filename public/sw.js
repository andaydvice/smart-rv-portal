const CACHE_NAME = 'rv-affiliate-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html'
];

const AFFILIATE_PAGES = [
  '/rv-apps-hub',
  '/rv-emergency-center', 
  '/solar-power-guide',
  '/calculators',
  '/blog'
];

const CRITICAL_RESOURCES = [
  '/calculators',
  '/storage-preparation-checklist',
  '/documentation',
  '/calculators/fuel',
  '/calculators/power',
  '/calculators/rv'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    // Cache-first strategy for static assets
    if (request.url.includes('/static/') || 
        request.url.includes('/lovable-uploads/') ||
        request.url.includes('.css') ||
        request.url.includes('.js')) {
      
      event.respondWith(
        caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            return fetch(request).then((response) => {
              // Cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return response;
            });
          })
      );
    }
    
    // Network-first strategy for affiliate pages
    else if (AFFILIATE_PAGES.some(page => request.url.includes(page))) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Fallback to cache if network fails
            return caches.match(request).then((cachedResponse) => {
              return cachedResponse || caches.match('/offline.html');
            });
          })
      );
    }
    
    // Default: network-first with cache fallback
    else {
      event.respondWith(
        fetch(request).catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/offline.html');
          });
        })
      );
    }
  }
});

// Enhanced background sync
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'affiliate-form-submission') {
    event.waitUntil(syncOfflineForms());
  } else if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineData());
  } else if (event.tag === 'calculator-results') {
    event.waitUntil(syncCalculatorResults());
  } else if (event.tag === 'checklist-progress') {
    event.waitUntil(syncChecklistProgress());
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New RV deals available!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Deals',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('RV Affiliate Hub', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/rv-apps-hub')
    );
  }
});

// Helper function to sync offline forms
async function syncOfflineForms() {
  const cache = await caches.open(CACHE_NAME);
  const offlineRequests = await cache.match('/offline-forms');
  
  if (offlineRequests) {
    const forms = await offlineRequests.json();
    
    for (const form of forms) {
      try {
        await fetch(form.url, {
          method: 'POST',
          headers: form.headers,
          body: form.body
        });
        console.log('Offline form synced successfully');
      } catch (error) {
        console.error('Failed to sync offline form:', error);
      }
    }
    
    // Clear synced forms
    await cache.delete('/offline-forms');
  }
}

// Sync offline calculator results and checklist progress
async function syncOfflineData() {
  try {
    // Get offline data from IndexedDB via message
    const clients = await self.clients.matchAll();
    if (clients.length > 0) {
      clients[0].postMessage({ type: 'SYNC_OFFLINE_DATA' });
    }
  } catch (error) {
    console.error('Failed to sync offline data:', error);
  }
}

async function syncCalculatorResults() {
  console.log('Syncing calculator results...');
  // Implementation handled by main app background sync service
}

async function syncChecklistProgress() {
  console.log('Syncing checklist progress...');
  // Implementation handled by main app background sync service
}

// Enhanced push notification with action buttons
self.addEventListener('push', (event) => {
  console.log('Enhanced push notification received:', event);
  
  let notificationData = {};
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = { body: event.data.text() };
    }
  }

  const options = {
    body: notificationData.body || 'New RV deals and updates available!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100, 50, 100],
    data: {
      url: notificationData.url || '/rv-apps-hub',
      type: notificationData.type || 'general',
      dateOfArrival: Date.now(),
      ...notificationData.data
    },
    actions: [
      {
        action: 'view',
        title: notificationData.actionText || 'View Details',
        icon: '/icons/view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/close.png'
      }
    ],
    tag: notificationData.tag || 'rv-hub-notification',
    renotify: true,
    requireInteraction: notificationData.requireInteraction || false
  };
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title || 'RV Affiliate Hub', options)
  );
});

// Enhanced notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/rv-apps-hub';
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Check if there's already a window/tab open with the target URL
          for (const client of clientList) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          
          // If no existing window, open a new one
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
  
  // Track notification interaction
  event.waitUntil(
    fetch('/api/analytics/notification-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: event.action || 'click',
        type: event.notification.data?.type || 'unknown',
        timestamp: Date.now()
      })
    }).catch(() => {}) // Silently fail analytics
  );
});