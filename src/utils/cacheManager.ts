/**
 * Client-side cache management and version checking
 */

const CURRENT_VERSION = 'revolutionising-20250830';
const VERSION_KEY = 'smartrv-version';
const FORCE_RELOAD_KEY = 'smartrv-force-reload';

export class CacheManager {
  static init() {
    this.checkVersion();
    this.clearAllCaches();
    this.setupServiceWorkerListener();
  }

  static checkVersion() {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    if (storedVersion && storedVersion !== CURRENT_VERSION) {
      console.log(`Version change detected: ${storedVersion} -> ${CURRENT_VERSION}`);
      this.forceReload();
      return;
    }
    
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }

  static clearAllCaches() {
    return Promise.all([
      this.clearBrowserCaches(),
      this.clearStorages(),
      this.clearServiceWorkerCaches()
    ]);
  }

  static clearBrowserCaches() {
    if ('caches' in window) {
      return caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      });
    }
    return Promise.resolve();
  }

  static clearStorages() {
    try {
      // Keep essential data but clear cache-related items
      const keysToKeep = ['user-preferences', 'auth-token'];
      
      if (localStorage) {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (!keysToKeep.some(keepKey => key.includes(keepKey))) {
            localStorage.removeItem(key);
          }
        });
      }
      
      if (sessionStorage) {
        sessionStorage.clear();
      }
    } catch (error) {
      console.warn('Storage clearing error:', error);
    }
  }

  static clearServiceWorkerCaches() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data);
        };
        
        navigator.serviceWorker.controller.postMessage(
          { type: 'CLEAR_ALL_CACHES' },
          [messageChannel.port2]
        );
      });
    }
    return Promise.resolve();
  }

  static setupServiceWorkerListener() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_CLEARED') {
          console.log('Service worker cleared caches, version:', event.data.version);
          if (event.data.version !== CURRENT_VERSION) {
            this.forceReload();
          }
        }
      });
    }
  }

  static forceReload() {
    localStorage.setItem(FORCE_RELOAD_KEY, Date.now().toString());
    
    // Use multiple reload methods for maximum compatibility
    if (window.location.reload) {
      window.location.reload();
    } else {
      window.location.href = window.location.href + '?cache-bust=' + Date.now();
    }
  }

  static invalidateOnDeploy() {
    // This would be called by a deployment webhook
    localStorage.removeItem(VERSION_KEY);
    this.clearAllCaches().then(() => {
      this.forceReload();
    });
  }
}

// Auto-initialize on module load
CacheManager.init();
