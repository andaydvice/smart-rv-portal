/**
 * Service Worker for improved caching and performance
 * Implements aggressive caching for static assets and smart caching for dynamic content
 */

const CACHE_NAME = 'smart-rv-tech-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/og-image.svg',
  '/favicon.ico'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Static assets - cache first with long TTL
  static: {
    pattern: /\.(js|css|woff2?|png|jpg|jpeg|webp|svg|ico)$/,
    strategy: 'cacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  
  // API responses - network first with fallback
  api: {
    pattern: /\/api\//,
    strategy: 'networkFirst',
    maxAge: 5 * 60 * 1000 // 5 minutes
  },
  
  // Pages - network first with cache fallback
  pages: {
    pattern: /^https:\/\/.*\.lovable\.app\/(?!api)/,
    strategy: 'networkFirst',
    maxAge: 60 * 60 * 1000 // 1 hour
  }
};

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Install failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Determine caching strategy
  let strategy = null;
  for (const [name, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(request.url)) {
      strategy = config;
      break;
    }
  }

  if (!strategy) {
    // Default to network first for unmatched requests
    strategy = CACHE_STRATEGIES.pages;
  }

  event.respondWith(
    handleRequest(request, strategy)
  );
});

// Handle requests based on strategy
async function handleRequest(request, strategy) {
  const cacheName = getCacheName(request);
  
  try {
    if (strategy.strategy === 'cacheFirst') {
      return await cacheFirst(request, cacheName, strategy.maxAge);
    } else if (strategy.strategy === 'networkFirst') {
      return await networkFirst(request, cacheName, strategy.maxAge);
    }
  } catch (error) {
    console.error('Service Worker: Request handling failed', error);
    
    // Fallback to cache if available
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Ultimate fallback for navigation requests
    if (request.mode === 'navigate') {
      const fallbackCache = await caches.open(STATIC_CACHE);
      return await fallbackCache.match('/') || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Cache first strategy
async function cacheFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone response before caching
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached version even if expired
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network first strategy
async function networkFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone response before caching
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Utility functions
function getCacheName(request) {
  const url = new URL(request.url);
  
  if (CACHE_STRATEGIES.static.pattern.test(request.url)) {
    return STATIC_CACHE;
  }
  
  return DYNAMIC_CACHE;
}

function isExpired(response, maxAge) {
  if (!maxAge) return false;
  
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const responseDate = new Date(dateHeader);
  const now = new Date();
  
  return (now.getTime() - responseDate.getTime()) > maxAge;
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(
      // Handle any pending offline actions here
      Promise.resolve()
    );
  }
});

// Handle push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('Service Worker: Push notification received', data);
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/og-image.svg',
        badge: '/favicon.ico'
      })
    );
  }
});