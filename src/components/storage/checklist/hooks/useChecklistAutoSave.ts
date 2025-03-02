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
  
  // Debounced save function to prevent excessive saves
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      console.log("Executing debounced auto-save");
      const saveTime = saveDataWrapper(false);
      lastSavedTimeRef.current = saveTime;
      saveTimeoutRef.current = null;
    }, 1000);
  }, [saveDataWrapper]);

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

  // Efficient auto-save on data changes with debouncing
  useEffect(() => {
    console.log("Auto-save effect triggered by state change");
    debouncedSave();
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [progress, startDate, endDate, notes, debouncedSave]);
  
  // Reduced frequency auto-save on visibility change and periodic interval
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log("Page visibility changed - saving data");
        const saveTime = saveDataWrapper(true);
        lastSavedTimeRef.current = saveTime;
      }
    };

    // Save when user navigates away or switches tabs
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle browser refresh/unload event
    const handleBeforeUnload = () => {
      console.log("Window unloading - final save");
      saveDataWrapper(true);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Force periodic saves, but at a much lower frequency (60 seconds)
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      const saveTime = saveDataWrapper(true);
      lastSavedTimeRef.current = saveTime;
    }, 60000); // Save every 60 seconds instead of 3 seconds to reduce overhead
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - final save");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveDataWrapper(true);
    };
  }, [saveDataWrapper]);

  return {
    getLastSavedMessage
  };
};
