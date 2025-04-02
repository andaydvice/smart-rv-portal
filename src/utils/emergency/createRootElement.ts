
/**
 * Utility for ensuring the root element exists
 */

/**
 * Creates a root element if it doesn't exist
 * @returns The root element
 */
export function createRootElement(): HTMLElement {
  let rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found! Cannot mount React application.');
    
    // Create root element if it doesn't exist
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    newRoot.style.backgroundColor = '#080F1F';
    newRoot.style.minHeight = '100vh';
    document.body.appendChild(newRoot);
    
    console.log('Created new root element');
    return newRoot;
  }
  
  return rootElement;
}
