
import { useEffect, useCallback, useRef } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for managing automatic saving of checklist data
 * Enhanced for reliability with improved error handling and save verification
 */
export const useChecklistAutoSave = (
  progress: {[key: string]: boolean | string},
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
  const pendingSaveRef = useRef<boolean>(false);
  const consecutiveFailuresRef = useRef<number>(0);
  
  // Track if data has changed since last save with improved serialization
  const hasDataChanged = useCallback(() => {
    try {
      const currentData = JSON.stringify({ 
        progress, 
        startDate: startDate ? startDate.toISOString() : null, 
        endDate: endDate ? endDate.toISOString() : null, 
        notes 
      });
      return currentData !== lastSaveDataRef.current;
    } catch (error) {
      console.error("Error checking for data changes:", error);
      return true; // If there's an error, assume data changed to be safe
    }
  }, [progress, startDate, endDate, notes]);
  
  // Debounced save function with enhanced reliability
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set pending save flag
    pendingSaveRef.current = true;
    
    // Only save if data has actually changed
    if (hasDataChanged()) {
      saveTimeoutRef.current = setTimeout(() => {
        try {
          console.log("Executing debounced auto-save");
          const saveTime = saveDataWrapper(false);
          lastSavedTimeRef.current = saveTime;
          // Update last saved data reference
          lastSaveDataRef.current = JSON.stringify({ 
            progress, 
            startDate: startDate ? startDate.toISOString() : null, 
            endDate: endDate ? endDate.toISOString() : null, 
            notes 
          });
          // Reset failure counter after successful save
          consecutiveFailuresRef.current = 0;
          pendingSaveRef.current = false;
        } catch (error) {
          console.error("Error during debounced save:", error);
          // Increment failure counter
          consecutiveFailuresRef.current++;
          
          // If we've had multiple failures, try again with shorter timeout
          if (consecutiveFailuresRef.current < 3) {
            const retryDelay = 1000 * consecutiveFailuresRef.current;
            console.log(`Retrying save in ${retryDelay}ms`);
            setTimeout(() => debouncedSave(), retryDelay);
          }
          pendingSaveRef.current = false;
        } finally {
          saveTimeoutRef.current = null;
        }
      }, 3000); // Reduced debounce time to 3 seconds for better reliability
    } else {
      pendingSaveRef.current = false;
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

  // Force save data and update refs
  const forceSaveData = useCallback(() => {
    try {
      if (hasDataChanged() || pendingSaveRef.current) {
        console.log("Forcing immediate save");
        const saveTime = saveDataWrapper(true);
        lastSavedTimeRef.current = saveTime;
        lastSaveDataRef.current = JSON.stringify({ 
          progress, 
          startDate: startDate ? startDate.toISOString() : null, 
          endDate: endDate ? endDate.toISOString() : null, 
          notes 
        });
        pendingSaveRef.current = false;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during forced save:", error);
      return false;
    }
  }, [saveDataWrapper, hasDataChanged, progress, startDate, endDate, notes]);

  // Efficient auto-save on data changes with debouncing and change detection
  useEffect(() => {
    // Skip the initial render to prevent unnecessary saves
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      lastSaveDataRef.current = JSON.stringify({ 
        progress, 
        startDate: startDate ? startDate.toISOString() : null, 
        endDate: endDate ? endDate.toISOString() : null, 
        notes 
      });
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
  
  // Add specific save on browser events (beforeunload, visibilitychange)
  useEffect(() => {
    // Handle visibility changes to save when user switches tabs or minimizes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        forceSaveData();
      }
    };

    // Handle before unload to save when page is refreshed or closed
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Force save before page unloads
      const saved = forceSaveData();
      
      // Only show a confirmation dialog if there are unsaved changes
      if (pendingSaveRef.current || hasDataChanged()) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };
    
    // Add event listeners
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Initial data snapshot
    lastSaveDataRef.current = JSON.stringify({ 
      progress, 
      startDate: startDate ? startDate.toISOString() : null, 
      endDate: endDate ? endDate.toISOString() : null, 
      notes 
    });
    
    // Periodic backup saves (every 60 seconds)
    const intervalId = setInterval(() => {
      if (hasDataChanged() || pendingSaveRef.current) {
        forceSaveData();
      }
    }, 60000);
    
    // Cleanup event listeners and intervals
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      // Final save when component unmounts
      forceSaveData();
    };
  }, [forceSaveData, hasDataChanged]);

  return {
    getLastSavedMessage,
    forceSaveData
  };
};
