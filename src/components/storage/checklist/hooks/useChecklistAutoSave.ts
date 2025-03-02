
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
  
  // Track if data has changed since last save
  const hasDataChanged = useCallback(() => {
    const currentData = JSON.stringify({ progress, startDate, endDate, notes });
    return currentData !== lastSaveDataRef.current;
  }, [progress, startDate, endDate, notes]);
  
  // Debounced save function to prevent excessive saves
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Only save if data has actually changed
    if (hasDataChanged()) {
      saveTimeoutRef.current = setTimeout(() => {
        console.log("Executing debounced auto-save");
        const saveTime = saveDataWrapper(false);
        lastSavedTimeRef.current = saveTime;
        // Update last saved data reference
        lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
        saveTimeoutRef.current = null;
      }, 2000); // Increased debounce time to 2 seconds for better performance
    }
  }, [saveDataWrapper, hasDataChanged, progress, startDate, endDate, notes]);

  // Format last saved message - memoized to prevent unnecessary re-renders
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
    // Initialize the last saved data reference
    lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && hasDataChanged()) {
        console.log("Page visibility changed - saving data");
        const saveTime = saveDataWrapper(true);
        lastSavedTimeRef.current = saveTime;
        lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
      }
    };

    // Save when user navigates away or switches tabs
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle browser refresh/unload event
    const handleBeforeUnload = () => {
      if (hasDataChanged()) {
        console.log("Window unloading - final save");
        saveDataWrapper(true);
        lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Force periodic saves, but at a much lower frequency (120 seconds)
    const intervalId = setInterval(() => {
      if (hasDataChanged()) {
        console.log("Periodic save triggered");
        const saveTime = saveDataWrapper(true);
        lastSavedTimeRef.current = saveTime;
        lastSaveDataRef.current = JSON.stringify({ progress, startDate, endDate, notes });
      }
    }, 120000); // Save every 120 seconds instead of 60 seconds to reduce overhead
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - final save");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      if (hasDataChanged()) {
        saveDataWrapper(true);
      }
    };
  }, [saveDataWrapper, hasDataChanged, progress, startDate, endDate, notes]);

  return {
    getLastSavedMessage
  };
};
