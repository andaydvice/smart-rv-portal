
/**
 * Utility to fix navigation issues and blank screens
 */

/**
 * Tries to fix blank screens when navigating
 */
export const fixBlankScreen = () => {
  console.log('Attempting to fix blank screen');
  
  // Force body and html to have dark background
  document.body.style.backgroundColor = '#080F1F';
  document.documentElement.style.backgroundColor = '#080F1F';
  
  // Force root element to be visible
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';
    rootElement.style.display = 'block';
    rootElement.style.backgroundColor = '#080F1F';
    rootElement.style.minHeight = '100vh';
  }
  
  // Force all direct children of root to be visible
  if (rootElement) {
    Array.from(rootElement.children).forEach(child => {
      if (child instanceof HTMLElement) {
        child.style.visibility = 'visible';
        child.style.opacity = '1';
        child.style.display = 'block';
        child.style.backgroundColor = '#080F1F';
      }
    });
  }
  
  // Force all container elements to be visible
  document.querySelectorAll('.container, main, .content, [role="main"], #content').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.opacity = '1';
      el.style.backgroundColor = '#080F1F';
    }
  });
  
  // Force reload React components by triggering a window resize event
  try {
    window.dispatchEvent(new Event('resize'));
  } catch (e) {
    console.error('Error dispatching resize event', e);
  }
};

/**
 * Ensures navigation doesn't result in blank screens
 */
export const setupNavigationFixes = () => {
  console.log('Setting up navigation fixes');
  
  // Monitor visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      console.log('Page became visible, ensuring content is displayed');
      fixBlankScreen();
    }
  });
  
  // Monitor hash changes
  window.addEventListener('hashchange', () => {
    console.log('Hash changed, ensuring content is displayed');
    fixBlankScreen();
  });
  
  // Fix when history state changes
  window.addEventListener('popstate', () => {
    console.log('History state changed, ensuring content is displayed');
    fixBlankScreen();
  });
};
