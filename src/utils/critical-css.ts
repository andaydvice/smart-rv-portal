const criticalCSS = `
  /* Global Styles */
  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: #080f1f;
    color: #fff;
    line-height: 1.6;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  /* Layout */
  .container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Buttons */
  .button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;
  }

  .button-primary {
    background-color: #007bff;
    color: #fff;
  }

  .button-primary:hover {
    background-color: #0056b3;
  }

  /* Navigation */
  nav {
    background-color: #131a2a;
    padding: 1rem 0;
  }

  nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  nav li {
    margin-left: 1.5rem;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  nav a:hover {
    color: #007bff;
  }

  /* Footer */
  footer {
    background-color: #131a2a;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    margin-top: 3rem;
  }

  /* Image Styles */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form Styles */
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #4a5568;
    border-radius: 0.375rem;
    background-color: #1a202c;
    color: #fff;
    transition: border-color 0.2s ease-in-out;
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  textarea {
    resize: vertical;
  }
`;

const deferNonCriticalCSS = (): void => {
  const preloadLink = document.createElement('link');
  preloadLink.href = '/index.css';
  preloadLink.rel = 'preload';
  preloadLink.as = 'style';
  document.head.appendChild(preloadLink);

  preloadLink.onload = () => {
    const styleLink = document.createElement('link');
    styleLink.href = '/index.css';
    styleLink.rel = 'stylesheet';
    document.head.appendChild(styleLink);
  };
};

const injectCriticalCSS = (): void => {
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

export const injectLCPOptimizations = (): void => {
  const style = document.createElement('style');
  style.textContent = `
    /* Critical LCP optimizations */
    section.relative.w-full.min-h-screen {
      contain: layout style paint;
    }
    
    img[loading="eager"][fetchpriority="high"] {
      content-visibility: auto;
    }
    
    /* Prevent layout shifts for hero section */
    .min-h-screen {
      min-height: 100vh;
      min-height: 100dvh;
    }
  `;
  document.head.appendChild(style);
};

export const initializeCriticalCSS = (): void => {
  try {
    // Inject critical CSS first
    injectCriticalCSS();
    
    // Add LCP optimizations
    injectLCPOptimizations();
    
    // Defer non-critical CSS loading
    deferNonCriticalCSS();
    
    if (import.meta.env.DEV) {
      console.log('Critical CSS and LCP optimizations initialized');
    }
  } catch (error) {
    console.warn('Failed to initialize critical CSS:', error);
  }
};
