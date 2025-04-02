
/**
 * Utility for mounting the React application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../App';
import { createRootElement } from './createRootElement';

/**
 * Mounts the React application to the DOM
 */
export function mountReactApp(): void {
  const rootElement = createRootElement();
  
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React application successfully mounted');
  } catch (error) {
    console.error('Failed to mount React application:', error);
  }
}
