
import React, { useEffect, useState } from 'react';

/**
 * Emergency debug component that displays regardless of styling issues
 * to help diagnose blank previews
 */
const EmergencyDebug = () => {
  const [mounted, setMounted] = useState(false);
  const [routes, setRoutes] = useState<string[]>([]);
  
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    // Get all available routes from window object if available
    if ((window as any).routesAvailable) {
      try {
        const routePaths = (window as any).allRoutes?.map((r: any) => r.path) || [];
        setRoutes(routePaths);
      } catch (e) {
        console.error('Failed to get routes:', e);
      }
    }
    
    // Log for debugging
    console.log('EmergencyDebug mounted!');
    console.log('Current URL:', window.location.href);
    console.log('Current path:', window.location.pathname);
    
    // Force visibility of body and root
    document.body.style.display = 'block';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'block';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }
  }, []);

  // Styles that will override any CSS to ensure visibility
  const debugStyles: React.CSSProperties = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 10000,
    background: 'rgba(255, 0, 0, 0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    fontFamily: 'monospace',
    fontSize: '12px'
  };

  return (
    <div style={debugStyles}>
      <h3 style={{ margin: '0 0 10px 0' }}>Emergency Debug Panel</h3>
      <div>
        <p>Component mounted: {mounted ? 'YES' : 'NO'}</p>
        <p>Current path: {window.location.pathname}</p>
        <p>Available routes: {routes.length || 'Unknown'}</p>
        <button 
          onClick={() => window.location.href = '/'} 
          style={{
            background: '#fff',
            color: '#000',
            border: 'none',
            padding: '5px',
            borderRadius: '3px',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          Go to Home
        </button>
        <button 
          onClick={() => console.log('DOM:', document.body.innerHTML)}
          style={{
            background: '#fff',
            color: '#000',
            border: 'none',
            padding: '5px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Log DOM
        </button>
      </div>
    </div>
  );
};

export default EmergencyDebug;
