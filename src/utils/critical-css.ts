/**
 * Critical CSS injection for above-the-fold content
 * Improves First Contentful Paint and reduces layout shift
 */

export const injectCriticalCSS = (): void => {
  if (typeof document === 'undefined') return;

  const criticalCSS = `
    /* Critical styles for immediate rendering */
    html, body {
      margin: 0;
      padding: 0;
      background-color: #080F1F;
      color: #ffffff;
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.5;
    }
    
    /* Navigation critical styles */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      height: 64px;
      background: rgba(8, 15, 31, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(26, 32, 44, 0.5);
    }
    
    /* Main content area */
    main {
      padding-top: 64px;
      min-height: calc(100vh - 64px);
      background: #080F1F;
    }
    
    /* Loading states */
    .loading-fallback {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #080F1F;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.3s ease-out;
    }
    
    .loading-fallback.loaded {
      opacity: 0;
      pointer-events: none;
    }
    
    /* Critical typography */
    h1, h2, h3 {
      color: #5B9BD5;
      margin: 0 0 1rem 0;
      font-weight: 600;
    }
    
    p {
      color: #E2E8FF;
      margin: 0 0 1rem 0;
    }
    
    /* Button base styles */
    button {
      cursor: pointer;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    /* Links */
    a {
      color: #5B9BD5;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    a:hover {
      color: #4B8FE3;
    }
    
    /* Container utilities */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    /* Grid utilities */
    .grid {
      display: grid;
    }
    
    .flex {
      display: flex;
    }
    
    .items-center {
      align-items: center;
    }
    
    .justify-center {
      justify-content: center;
    }
    
    /* Hide content for bots until loaded */
    .bot-detected .loading-fallback {
      display: none !important;
    }
    
    /* Prevent layout shift */
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Critical responsive utilities */
    @media (max-width: 768px) {
      .container {
        padding: 0 0.5rem;
      }
      
      nav {
        height: 56px;
      }
      
      main {
        padding-top: 56px;
      }
    }
  `;

  // Check if critical CSS is already injected
  if (document.querySelector('#critical-css')) return;

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.innerHTML = criticalCSS;
  
  // Insert at the beginning of head for highest priority
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Remove critical CSS after main styles are loaded
 */
export const removeCriticalCSS = (): void => {
  if (typeof document === 'undefined') return;
  
  const criticalStyle = document.querySelector('#critical-css');
  if (criticalStyle) {
    // Wait a bit to ensure main styles are loaded
    setTimeout(() => {
      criticalStyle.remove();
    }, 1000);
  }
};

/**
 * Preload critical fonts to prevent layout shift
 */
export const preloadCriticalFonts = (): void => {
  if (typeof document === 'undefined') return;

  const fonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];

  fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
};