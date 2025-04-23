
/**
 * Defers non-critical JavaScript execution
 * @param callback Function to execute
 * @param delay Delay in milliseconds
 */
export const deferOperation = (callback: () => void, delay = 100): void => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => setTimeout(callback, delay));
  } else {
    setTimeout(callback, delay);
  }
};

/**
 * Prefetches resources that will be needed soon
 * @param urls Array of URLs to prefetch
 */
export const prefetchResources = (urls: string[]): void => {
  if (!window.requestIdleCallback) return;
  
  window.requestIdleCallback(() => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  });
};

/**
 * Lazy loads all images in the viewport
 */
export const setupLazyLoading = (): void => {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading') && !img.dataset.noLazy) {
        img.setAttribute('loading', 'lazy');
      }
    });
  } else {
    // Use IntersectionObserver as fallback
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }
};
