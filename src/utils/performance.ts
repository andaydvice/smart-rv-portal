
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
 * Generates a tiny SVG placeholder for an image
 * @param width Image width
 * @param height Image height
 * @param color Background color (hex without #)
 * @returns Base64 encoded SVG
 */
export const generateImagePlaceholder = (
  width = 100, 
  height = 100, 
  color = '131a2a'
): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${color}'/%3E%3C/svg%3E`;
};

/**
 * Preloads critical images
 * @param images Array of image URLs to preload
 */
export const preloadCriticalImages = (images: string[]): void => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Determines appropriate image sizes attribute for responsive images
 * @param defaultWidth Default width of the image in pixels
 * @returns Sizes attribute string
 */
export const getResponsiveSizes = (defaultWidth = 800): string => {
  return `(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 60vw, ${defaultWidth}px`;
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
