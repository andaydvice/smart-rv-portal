
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization with enhanced error handling...');

// Function to check for CSS loading errors with enhanced error handling
const monitorCssLoading = () => {
  console.log('Monitoring CSS loading with enhanced error recovery...');
  
  const styleSheets = document.styleSheets;
  console.log(`Found ${styleSheets.length} stylesheets`);
  
  try {
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i];
        console.log(`Sheet ${i}: ${sheet.href || 'inline'}`);
        try {
          const rules = sheet.cssRules || sheet.rules;
          console.log(`  Rules: ${rules.length}`);
        } catch (cssErr) {
          console.warn(`  Cannot access rules (likely CORS issue): ${cssErr}`);
          // Attempt to reload the stylesheet if it fails to load
          if (sheet.href) {
            console.log(`  Attempting to reload stylesheet: ${sheet.href}`);
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = sheet.href + '?reload=' + new Date().getTime();
            document.head.appendChild(link);
          }
        }
      } catch (sheetErr) {
        console.error(`Error accessing stylesheet ${i}:`, sheetErr);
      }
    }
  } catch (err) {
    console.error('Failed to monitor CSS:', err);
  }
};

// Ensure critical CSS is applied immediately for rendering
document.documentElement.style.visibility = 'visible';
document.documentElement.style.display = 'block';
document.documentElement.style.opacity = '1';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';
document.body.style.opacity = '1';

// Force style application before React initializes
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.minHeight = '100vh';
document.body.style.width = '100%';

// Attempt to detect and recover from websocket connection issues
const setupWebSocketErrorHandling = () => {
  console.log('Setting up WebSocket error recovery...');
  
  // Override WebSocket constructor to add error handling
  const OriginalWebSocket = window.WebSocket;
  
  // Create a properly typed constructor function
  const EnhancedWebSocket = function(this: WebSocket, url: string | URL, protocols?: string | string[]) {
    const socket = new OriginalWebSocket(url, protocols);
    
    socket.addEventListener('error', (event) => {
      console.error('WebSocket connection error:', event);
      console.log('Attempting to recover from WebSocket error...');
      
      // Schedule a reconnection attempt
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket to:', url);
        try {
          new OriginalWebSocket(url, protocols);
        } catch (e) {
          console.error('WebSocket reconnection failed:', e);
        }
      }, 3000);
    });
    
    return socket;
  } as unknown as typeof WebSocket;
  
  // Add properties from the original WebSocket
  EnhancedWebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
  EnhancedWebSocket.OPEN = OriginalWebSocket.OPEN;
  EnhancedWebSocket.CLOSING = OriginalWebSocket.CLOSING;
  EnhancedWebSocket.CLOSED = OriginalWebSocket.CLOSED;
  EnhancedWebSocket.prototype = OriginalWebSocket.prototype;
  
  // Replace the global WebSocket
  window.WebSocket = EnhancedWebSocket;
};

// Setup WebSocket error handling
setupWebSocketErrorHandling();

const startApp = () => {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    // Ensure root is visible
    rootElement.style.visibility = 'visible';
    rootElement.style.display = 'block';
    rootElement.style.opacity = '1';

    console.log('Root element found, creating React root...');
    
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('React root created, rendering App component...');
    
    // Monitor CSS loading with multiple retry attempts
    let cssMonitorAttempts = 0;
    const maxCssMonitorAttempts = 3;
    
    const monitorCssWithRetry = () => {
      if (cssMonitorAttempts < maxCssMonitorAttempts) {
        setTimeout(() => {
          cssMonitorAttempts++;
          console.log(`CSS monitoring attempt ${cssMonitorAttempts}/${maxCssMonitorAttempts}`);
          monitorCssLoading();
          monitorCssWithRetry();
        }, 500 * cssMonitorAttempts);
      }
    };
    
    monitorCssWithRetry();
    
    // Render with error boundary
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log('App component rendered successfully');

    if (import.meta.hot) {
      import.meta.hot.accept('./App', () => {
        console.log('HMR update detected, re-rendering App component...');
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      });
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    // Fallback error display with retry button
    document.body.innerHTML = `
      <div style="color: white; background: #333; padding: 20px; font-family: sans-serif;">
        <h1>Application Error</h1>
        <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="location.reload()">Reload</button>
        <button onclick="localStorage.clear(); location.reload();">Clear Cache & Reload</button>
      </div>
    `;
    
    throw error;
  }
};

// Add a small delay to ensure DOM is ready and attempt multiple starts if needed
let startAttempts = 0;
const maxStartAttempts = 3;

const attemptStart = () => {
  if (startAttempts < maxStartAttempts) {
    setTimeout(() => {
      startAttempts++;
      console.log(`Attempt ${startAttempts}/${maxStartAttempts} to start the application`);
      try {
        startApp();
      } catch (e) {
        console.error(`Start attempt ${startAttempts} failed:`, e);
        attemptStart();
      }
    }, 100 * startAttempts);
  }
};

attemptStart();
