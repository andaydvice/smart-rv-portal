
import React, { useEffect } from 'react';

interface ForceRenderProps {
  pageName?: string;
  children: React.ReactNode;
}

/**
 * A component that forces the UI to render by applying
 * critical styling directly to the DOM
 */
const ForceRender: React.FC<ForceRenderProps> = ({ 
  pageName = 'current', 
  children 
}) => {
  useEffect(() => {
    console.log(`ForceRender component mounted for ${pageName} page`);
    
    // Force document styles
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    document.body.style.display = 'block';
    
    // Force root element styles
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.opacity = '1';
      root.style.backgroundColor = '#080F1F';
      root.style.display = 'block';
    }
    
    // Use the forceRouteUpdate global function if available
    if (typeof window !== 'undefined' && window.forceRouteUpdate) {
      console.log(`Forcing update for ${pageName} page`);
      window.forceRouteUpdate(pageName);
    }
    
    // Create style element with critical CSS
    const style = document.createElement('style');
    style.textContent = `
      main, section, div, .layout, .min-h-screen {
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, [pageName]);
  
  return (
    <div className="force-render-wrapper" data-page={pageName}>
      {children}
    </div>
  );
};

export default ForceRender;
