/**
 * Service Worker for SEO Content Caching and Progressive Enhancement
 * Provides offline-first SEO caching strategy and performance optimization
 */

/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'seo-cache-v1';
const CRITICAL_CACHE_NAME = 'critical-seo-v1';
const STATIC_CACHE_NAME = 'static-assets-v1';

// Assets to cache immediately (critical for SEO)
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/index.html',
  // Add critical CSS and JS files
];

// Static assets to cache
const STATIC_ASSETS = [
  '/favicon.ico',
  '/og-image.svg',
  // Add images and fonts
];

// API endpoints to cache for SEO data
const SEO_API_ENDPOINTS = [
  '/api/seo/meta',
  '/api/seo/schema',
  '/api/sitemap.xml',
  '/robots.txt'
];

class SEOServiceWorker {
  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Install event - cache critical assets
    self.addEventListener('install', (event) => {
      event.waitUntil(
        this.installHandler()
      );
    });

    // Activate event - clean up old caches
    self.addEventListener('activate', (event) => {
      event.waitUntil(
        this.activateHandler()
      );
    });

    // Fetch event - implement caching strategies
    self.addEventListener('fetch', (event) => {
      event.respondWith(
        this.fetchHandler(event.request)
      );
    });

    // Message event - handle commands from main thread
    self.addEventListener('message', (event) => {
      this.messageHandler(event);
    });

    // Background sync for SEO data updates
    self.addEventListener('sync', (event: any) => {
      if (event.tag === 'seo-data-sync') {
        event.waitUntil(this.syncSEOData());
      }
    });
  }

  private async installHandler(): Promise<void> {
    try {
      // Cache critical assets immediately
      const criticalCache = await caches.open(CRITICAL_CACHE_NAME);
      await criticalCache.addAll(CRITICAL_ASSETS);

      // Cache static assets
      const staticCache = await caches.open(STATIC_CACHE_NAME);
      await staticCache.addAll(STATIC_ASSETS);

      // Skip waiting to activate immediately
      self.skipWaiting();
    } catch (error) {
      console.error('Service Worker install failed:', error);
    }
  }

  private async activateHandler(): Promise<void> {
    try {
      // Clean up old caches
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        !name.includes('v1') && 
        (name.includes('seo-cache') || name.includes('critical-seo') || name.includes('static-assets'))
      );

      await Promise.all(
        oldCaches.map(cacheName => caches.delete(cacheName))
      );

      // Take control of all clients immediately
      self.clients.claim();

      // Notify main thread that SW is ready
      this.notifyClients({ type: 'SW_ACTIVATED' });
    } catch (error) {
      console.error('Service Worker activation failed:', error);
    }
  }

  private async fetchHandler(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Handle different types of requests with appropriate caching strategies
    
    // 1. Critical SEO pages - Cache First strategy
    if (this.isCriticalSEOPage(url)) {
      return this.cacheFirstStrategy(request, CRITICAL_CACHE_NAME);
    }

    // 2. Static assets - Cache First strategy
    if (this.isStaticAsset(url)) {
      return this.cacheFirstStrategy(request, STATIC_CACHE_NAME);
    }

    // 3. SEO API endpoints - Network First with fallback
    if (this.isSEOAPIEndpoint(url)) {
      return this.networkFirstStrategy(request, CACHE_NAME);
    }

    // 4. Regular pages - Stale While Revalidate
    if (this.isNavigationRequest(request)) {
      return this.staleWhileRevalidateStrategy(request, CACHE_NAME);
    }

    // 5. Images - Cache First with expiration
    if (this.isImageRequest(request)) {
      return this.cacheFirstWithExpirationStrategy(request, STATIC_CACHE_NAME);
    }

    // Default: Network only
    return fetch(request);
  }

  private async messageHandler(event: any): Promise<void> {
    const { type, payload } = event.data;

    switch (type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;

      case 'CACHE_SEO_DATA':
        await this.cacheSEOData(payload);
        break;

      case 'CLEAR_CACHE':
        await this.clearCache(payload.cacheName);
        break;

      case 'GET_CACHE_STATUS':
        const status = await this.getCacheStatus();
        event.ports[0]?.postMessage({ type: 'CACHE_STATUS', payload: status });
        break;

      case 'PRELOAD_ROUTE':
        await this.preloadRoute(payload.url);
        break;
    }
  }

  // Caching Strategies

  private async cacheFirstStrategy(request: Request, cacheName: string): Promise<Response> {
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      const networkResponse = await fetch(request);
      
      // Cache successful responses
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    } catch (error) {
      // Return cached response if available, otherwise throw
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
      
      throw error;
    }
  }

  private async networkFirstStrategy(request: Request, cacheName: string): Promise<Response> {
    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    } catch (error) {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
      
      throw error;
    }
  }

  private async staleWhileRevalidateStrategy(request: Request, cacheName: string): Promise<Response> {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Start network request in background
    const networkResponsePromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });

    // Return cached response immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }

    // Otherwise wait for network response
    return networkResponsePromise;
  }

  private async cacheFirstWithExpirationStrategy(
    request: Request, 
    cacheName: string, 
    maxAge: number = 24 * 60 * 60 * 1000 // 24 hours
  ): Promise<Response> {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      const cachedDate = new Date(cachedResponse.headers.get('date') || '');
      const now = new Date();
      
      if (now.getTime() - cachedDate.getTime() < maxAge) {
        return cachedResponse;
      }
    }

    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    } catch (error) {
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }

  // Utility Methods

  private isCriticalSEOPage(url: URL): boolean {
    return CRITICAL_ASSETS.some(asset => url.pathname === asset);
  }

  private isStaticAsset(url: URL): boolean {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff', '.woff2'];
    return staticExtensions.some(ext => url.pathname.endsWith(ext));
  }

  private isSEOAPIEndpoint(url: URL): boolean {
    return SEO_API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint));
  }

  private isNavigationRequest(request: Request): boolean {
    return request.mode === 'navigate';
  }

  private isImageRequest(request: Request): boolean {
    return request.destination === 'image';
  }

  private async cacheSEOData(data: any): Promise<void> {
    const cache = await caches.open(CACHE_NAME);
    
    // Cache SEO metadata
    if (data.meta) {
      const metaResponse = new Response(JSON.stringify(data.meta), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put('/api/seo/meta', metaResponse);
    }

    // Cache schema data
    if (data.schema) {
      const schemaResponse = new Response(JSON.stringify(data.schema), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put('/api/seo/schema', schemaResponse);
    }
  }

  private async clearCache(cacheName?: string): Promise<void> {
    if (cacheName) {
      await caches.delete(cacheName);
    } else {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
  }

  private async getCacheStatus(): Promise<{
    caches: Array<{ name: string; size: number; }>;
    totalSize: number;
  }> {
    const cacheNames = await caches.keys();
    const cacheInfo = await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        return { name, size: keys.length };
      })
    );

    const totalSize = cacheInfo.reduce((sum, cache) => sum + cache.size, 0);

    return { caches: cacheInfo, totalSize };
  }

  private async preloadRoute(url: string): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await fetch(url);
      
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.error('Failed to preload route:', url, error);
    }
  }

  private async syncSEOData(): Promise<void> {
    try {
      // Sync critical SEO data in background
      const seoDataResponse = await fetch('/api/seo/data');
      if (seoDataResponse.ok) {
        const seoData = await seoDataResponse.json();
        await this.cacheSEOData(seoData);
      }
    } catch (error) {
      console.error('Background SEO data sync failed:', error);
    }
  }

  private notifyClients(message: any): void {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(message);
      });
    });
  }
}

// Initialize the service worker
new SEOServiceWorker();

// Export for TypeScript
export {};
