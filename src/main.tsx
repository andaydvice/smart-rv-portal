
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'

import { setupLazyLoading, deferOperation } from './utils/performance.ts'
import { handleBotOptimizations, isBot, isSocialBot } from './utils/prerender'
import { CacheManager } from './utils/cacheManager'
import { initializeCriticalCSS } from './utils/critical-css'

// Initialize critical CSS immediately to prevent render blocking
initializeCriticalCSS();

// Enhanced bot detection
const isBotAgent = isBot() || isSocialBot();

// Mount the application with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found! Cannot mount React application.');
} else {
  try {
    // Initialize aggressive cache management
    CacheManager.init();
    
    // Apply bot optimizations before mounting
    if (isBotAgent) {
      handleBotOptimizations();
      console.log('Bot detected, optimizations applied');
    }

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    );
    
    // Performance optimizations for human users only
    if (!isBotAgent) {
      // After app is rendered, setup lazy loading for images
      deferOperation(() => {
        setupLazyLoading();
      }, 300);
    } else {
      // For bots, ensure immediate content visibility
      setTimeout(() => {
        handleBotOptimizations();
      }, 100);
    }

    // Idle prefetch select lazy routes to improve navigation speed
    deferOperation(() => {
      const idle = (cb: () => void) =>
        (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 5000 }) : setTimeout(cb, 2500);
      idle(() => {
        // Warm common lazy chunks without blocking the UI thread
        import('./pages/SearchResults').catch(() => {});
      });
    }, 2000);
    
  } catch (error) {
    console.error('Failed to mount React application:', error);
    
    // Emergency recovery attempt
    setTimeout(() => {
      try {
        ReactDOM.createRoot(rootElement).render(
          <App />
        );
      } catch (fallbackError) {
        console.error('Emergency mounting also failed:', fallbackError);
        
        // Display a basic error message
        rootElement.innerHTML = `
          <div style="padding: 20px; text-align: center;">
            <h2>Something went wrong</h2>
            <p>The application couldn't load properly. Please check the console for errors.</p>
          </div>
        `;
      }
    }, 1000);
  }
}
