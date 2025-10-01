import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'

console.log('[MAIN] Starting application initialization...');

const rootElement = document.getElementById('root');
console.log('[MAIN] Root element:', rootElement);

if (!rootElement) {
  console.error('[MAIN] ERROR: Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">ERROR: Root element not found</div>';
} else {
  try {
    console.log('[MAIN] Importing App component...');
    
    import('./App.tsx').then((AppModule) => {
      console.log('[MAIN] App imported successfully');
      const App = AppModule.default;
      
      console.log('[MAIN] Importing HelmetProvider...');
      return import('react-helmet-async').then((HelmetModule) => {
        console.log('[MAIN] HelmetProvider imported');
        const { HelmetProvider } = HelmetModule;
        
        console.log('[MAIN] Creating React root...');
        const root = ReactDOM.createRoot(rootElement);
        
        console.log('[MAIN] Rendering application...');
        root.render(
          <React.StrictMode>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </React.StrictMode>
        );
        
        console.log('[MAIN] ✅ React application mounted successfully!');
      });
    }).catch((error) => {
      console.error('[MAIN] ❌ Failed to load application:', error);
      rootElement.innerHTML = `
        <div style="padding: 20px; background: #fee; border: 2px solid red; margin: 20px;">
          <h2 style="color: red;">Application Load Error</h2>
          <p><strong>Error:</strong> ${error.message}</p>
          <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error.stack}</pre>
        </div>
      `;
    });
  } catch (error) {
    console.error('[MAIN] ❌ Catastrophic error:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; background: #fee; border: 2px solid red;">
        <h2>Critical Error</h2>
        <p>${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
}
