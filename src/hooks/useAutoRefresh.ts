
import { useEffect, useState } from 'react';
import { startAutoRefresh, stopAutoRefresh, toggleAutoRefresh, isAutoRefreshEnabled } from '@/utils/autoRefresh';

/**
 * Hook for controlling the auto-refresh functionality
 */
export function useAutoRefresh(initialEnabled: boolean = false) {
  // Initialize with the current state from the utility
  const [isEnabled, setIsEnabled] = useState<boolean>(isAutoRefreshEnabled());
  
  useEffect(() => {
    // Only start auto-refresh if initialEnabled is true and it's not already running
    if (initialEnabled && !isEnabled) {
      startAutoRefresh();
      setIsEnabled(true);
    }
    
    // Clean up on unmount
    return () => {
      if (isEnabled) {
        stopAutoRefresh();
      }
    };
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
