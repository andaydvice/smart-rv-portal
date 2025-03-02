
import { useEffect, useCallback, useRef } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for managing automatic saving of checklist data with optimized performance
 */
export const useChecklistAutoSave = (
  progress: {[key: string]: boolean},
  startDate: Date | undefined, 
  endDate: Date | undefined,
  notes: ChecklistNotes,
  saveDataWrapper: (manualSave?: boolean) => string
) => {
  // Use ref to track last save time to prevent excessive saves
  const lastSaveTimeRef = useRef<number>(Date.now());
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Format last saved message
  const getLastSavedMessage = useCallback(() => {
    const lastSavedAt = saveDataWrapper(false);
    if (!lastSavedAt) return "";
    
    const savedDate = new Date(lastSavedAt);
    return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
  }, [saveDataWrapper]);

  // Debounced save function to prevent excessive saves
  const debouncedSave = useCallback((manualSave: boolean = false) => {
    const now = Date.now();
    // Only save if it's been at least 2 seconds since last save (unless manual)
    if (manualSave || now - lastSaveTimeRef.current > 2000) {
      // Clear any pending save operation
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      
      // Perform the save
      saveDataWrapper(manualSave);
      lastSaveTimeRef.current = now;
    }
  }, [saveDataWrapper]);

  // Optimize auto-save by using a throttled approach
  useEffect(() => {
    // Handle visibility change 
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log("Page visibility changed - saving data");
        debouncedSave(true);
      }
    };

    // Save when user navigates away or switches tabs
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle browser refresh/unload event
    const handleBeforeUnload = () => {
      console.log("Window unloading - final save");
      debouncedSave(true);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Reduce periodic saves to prevent performance issues
    // Use a much longer interval (60 seconds) for background saves
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      debouncedSave(false); // Silent save
    }, 60000); // Save every 60 seconds (was 30 seconds)
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - final save");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      debouncedSave(true);
    };
  }, [debouncedSave]);

  return {
    getLastSavedMessage,
    debouncedSave
  };
};
