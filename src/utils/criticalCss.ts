/**
 * Critical CSS utilities for performance optimization
 */

// Critical CSS that should be inlined
export const CRITICAL_CSS = `
  /* Critical above-the-fold styles */
  body {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background-color: #080F1F;
    color: white;
  }
  
  .hero-section {
    min-height: 100vh;
    background: linear-gradient(135deg, #080F1F 0%, #151A22 100%);
  }
  
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(10px);
  }
  
  .loading-spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Prevent layout shift */
  .image-placeholder {
    background-color: #131a2a;
    display: block;
  }
`;

/**
 * Inject critical CSS into document head
 */
export const injectCriticalCSS = () => {
  const style = document.createElement('style');
  style.textContent = CRITICAL_CSS;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Load non-critical CSS asynchronously
 */
export const loadNonCriticalCSS = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Remove unused CSS at runtime
 */
export const removeUnusedCSS = () => {
  if (process.env.NODE_ENV !== 'production') return;
  
  const usedSelectors = new Set<string>();
  
  // Track used CSS selectors
  const observer = new MutationObserver(() => {
    document.querySelectorAll('*').forEach(el => {
      if (el.className) {
        el.className.split(' ').forEach(cls => {
          if (cls.trim()) usedSelectors.add(`.${cls}`);
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
  
  // Log unused selectors after 5 seconds
  setTimeout(() => {
    observer.disconnect();
    console.log(`Tracked ${usedSelectors.size} used CSS selectors`);
  }, 5000);
};

/**
 * Optimize CSS delivery
 */
export const optimizeCSSDelivery = () => {
  injectCriticalCSS();
  removeUnusedCSS();
  
  // Load non-critical styles after page load
  window.addEventListener('load', () => {
    const nonCriticalStyles = [
      '/assets/animations.css',
      '/assets/forms.css',
      '/assets/utilities.css'
    ];
    
    nonCriticalStyles.forEach(loadNonCriticalCSS);
  });
};