import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'

console.log('[MAIN] Application starting...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('[MAIN] Root element not found!');
} else {
  console.log('[MAIN] Root element found, mounting React...');
  
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    );
    console.log('[MAIN] ✅ App mounted successfully');
  } catch (error) {
    console.error('[MAIN] ❌ Mount failed:', error);
  }
}
