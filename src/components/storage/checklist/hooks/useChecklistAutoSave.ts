
import { useEffect, useCallback, useRef } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for managing automatic saving of checklist data
 * Optimized for performance with debounced saves and reduced save frequency
 */
export const useChecklistAutoSave = (
  progress: {[key: string]: boolean},
  startDate: Date | undefined, 
  endDate: Date | undefined,
  notes: ChecklistNotes,
  saveDataWrapper: (manualSave?: boolean) => string
) => {
  // Refs to keep track of last saved message without causing re-renders
  const lastSavedTimeRef = useRef<string>("");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveDataRef = useRef<string>("");
  const isInitialRenderRef = useRef<boolean>(true);
  
  // Track if data has changed since last save
  const hasDataChanged = useCallback(() => {
    try {
      const currentData = JSON.stringify({ progress, startDate, endDate, notes });
      return currentData !== lastSaveDataRef.current;
    } catch (error) {
      console.error("Error checking for data changes:", error);
      return true; // If there's an error, assume data changed to be safe
    }
  }, [progress, startDate, endDate, notes]);
  
  // Debounced save function to prevent excessive saves
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Only save if data has actually changed
    if (hasDataChanged()) {
      saveTimeoutRef.current = setTimeout(() => {
        try {
          console.log("Executing debounced auto-save");
          const saveTime = saveDataWrapper(false);
          lastSavedTimeRef.current = saveTime;
          // Update last saved data reference
          lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
        } catch (error) {
          console.error("Error during debounced save:", error);
        } finally {
          saveTimeoutRef.current = null;
        }
      }, 3000); // Increased debounce time to 3 seconds for better performance
    }
  }, [saveDataWrapper, hasDataChanged, progress, startDate, endDate, notes]);

  // Format last saved message
  const getLastSavedMessage = useCallback(() => {
    // Use the ref value to avoid re-rendering components that use this value
    if (!lastSavedTimeRef.current) return "";
    
    try {
      const savedDate = new Date(lastSavedTimeRef.current);
      return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
    } catch (e) {
      console.error("Error formatting saved time:", e);
      return "Last auto-saved: just now";
    }
  }, []);

  // Efficient auto-save on data changes with debouncing and change detection
  useEffect(() => {
    // Skip the initial render to prevent unnecessary saves
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
      return;
    }
    
    if (hasDataChanged()) {
      console.log("Auto-save effect triggered by state change");
      debouncedSave();
    }
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [progress, startDate, endDate, notes, debouncedSave, hasDataChanged]);
  
  // Reduced frequency auto-save on visibility change and periodic interval
  useEffect(() => {
    // Set up save on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && hasDataChanged()) {
        try {
          console.log("Page visibility changed - saving data");
          const saveTime = saveDataWrapper(true);
          lastSavedTimeRef.current = saveTime;
          lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
        } catch (error) {
          console.error("Error saving on visibility change:", error);
        }
      }
    };

    // Handle browser refresh/unload event
    const handleBeforeUnload = () => {
      if (hasDataChanged()) {
        try {
          console.log("Window unloading - final save");
          saveDataWrapper(true);
          lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
        } catch (error) {
          console.error("Error saving on unload:", error);
        }
      }
    };
    
    // Initialize with current data
    lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
    
    // Add event listeners
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Force periodic saves, but at a much lower frequency (180 seconds)
    const intervalId = setInterval(() => {
      if (hasDataChanged()) {
        try {
          console.log("Periodic save triggered");
          const saveTime = saveDataWrapper(true);
          lastSavedTimeRef.current = saveTime;
          lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
        } catch (error) {
          console.error("Error during periodic save:", error);
        }
      }
    }, 180000); // Save every 180 seconds (3 minutes) to reduce overhead
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - performing cleanup");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      if (hasDataChanged()) {
        try {
          saveDataWrapper(true);
        } catch (error) {
          console.error("Error saving on unmount:", error);
        }
      }
    };
  }, [saveDataWrapper, hasDataChanged, progress, startDate, endDate, notes]);

  return {
    getLastSavedMessage
  };
};
