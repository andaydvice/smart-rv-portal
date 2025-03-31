
import { useEffect, useState } from 'react';
import { startAutoRefresh, stopAutoRefresh, toggleAutoRefresh } from '@/utils/autoRefresh';

/**
 * Hook for controlling the auto-refresh functionality
 */
export function useAutoRefresh(initialEnabled: boolean = false) { // Changed default to false
  const [isEnabled, setIsEnabled] = useState<boolean>(initialEnabled);
  
  useEffect(() => {
    // Start auto-refresh on mount if enabled
    if (initialEnabled) {
      const controls = startAutoRefresh();
      
      // Clean up on unmount
      return () => {
        stopAutoRefresh();
      };
    }
    
    return undefined;
  }, [initialEnabled]);
  
  // Toggle function that updates state
  const toggle = () => {
    const newState = toggleAutoRefresh();
    setIsEnabled(newState);
    return newState;
  };
  
  return {
    isEnabled,
    toggle
  };
}

export default useAutoRefresh;
