
import { useEffect, useCallback, useRef } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for managing automatic saving of checklist data
 * Enhanced for reliability with improved error handling and save verification
 * Optimized for performance to prevent UI blocking
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
  const saveInProgressRef = useRef<boolean>(false);
  
  // Track if data has changed since last save with improved serialization
  const hasDataChanged = useCallback(() => {
    try {
      // Use a lightweight comparison approach for better performance
      // Only stringify the minimal needed data to detect changes
      const currentProgress = JSON.stringify(progress);
      const currentNotes = JSON.stringify(notes);
      const currentDates = JSON.stringify({
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null
      });
      
      const prevData = lastSaveDataRef.current ? JSON.parse(lastSaveDataRef.current) : {};
      
      // Check individual parts instead of the whole object for better performance
      return (
        currentProgress !== (prevData.progress || '{}') ||
        currentNotes !== (prevData.notes || '{}') ||
        currentDates !== (prevData.dates || '{}')
      );
    } catch (error) {
      console.error("Error checking for data changes:", error);
      return true; // If there's an error, assume data changed to be safe
    }
  }, [progress, startDate, endDate, notes]);
  
  // Update the reference of saved data
  const updateSavedDataRef = useCallback(() => {
    try {
      // Store parts separately for more efficient comparisons
      lastSaveDataRef.current = JSON.stringify({
        progress: JSON.stringify(progress),
        notes: JSON.stringify(notes),
        dates: JSON.stringify({
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null
        })
      });
    } catch (error) {
      console.error("Error updating saved data reference:", error);
    }
  }, [progress, startDate, endDate, notes]);
  
  // Debounced save function with enhanced reliability and non-blocking behavior
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set pending save flag
    pendingSaveRef.current = true;
    
    // Only save if data has actually changed and no save is in progress
    if (hasDataChanged() && !saveInProgressRef.current) {
      saveTimeoutRef.current = setTimeout(() => {
        try {
          console.log("Executing debounced auto-save");
          saveInProgressRef.current = true;
          
          // Use requestAnimationFrame to schedule save during idle time
          requestAnimationFrame(() => {
            try {
              const saveTime = saveDataWrapper(false);
              lastSavedTimeRef.current = saveTime;
              
              // Update last saved data reference
              updateSavedDataRef();
              
              // Reset failure counter after successful save
              consecutiveFailuresRef.current = 0;
            } catch (error) {
              console.error("Error during scheduled save:", error);
              consecutiveFailuresRef.current++;
            } finally {
              saveInProgressRef.current = false;
              pendingSaveRef.current = false;
            }
          });
        } catch (error) {
          console.error("Error during debounced save:", error);
          // Increment failure counter
          consecutiveFailuresRef.current++;
          
          // If we've had multiple failures, try again with shorter timeout
          if (consecutiveFailuresRef.current < 3) {
            const retryDelay = 1000 * consecutiveFailuresRef.current;
            console.log(`Retrying save in ${retryDelay}ms`);
            setTimeout(() => {
              saveInProgressRef.current = false;
              debouncedSave();
            }, retryDelay);
          } else {
            saveInProgressRef.current = false;
          }
          pendingSaveRef.current = false;
        } finally {
          saveTimeoutRef.current = null;
        }
      }, 3000); // Debounce time of 3 seconds
    } else {
      pendingSaveRef.current = false;
    }
  }, [saveDataWrapper, hasDataChanged, updateSavedDataRef]);

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

  // Force save data and update refs with non-blocking approach
  const forceSaveData = useCallback(() => {
    try {
      if ((hasDataChanged() || pendingSaveRef.current) && !saveInProgressRef.current) {
        console.log("Forcing immediate save");
        saveInProgressRef.current = true;
        
        // Use setTimeout with 0ms to prevent UI blocking
        setTimeout(() => {
          try {
            const saveTime = saveDataWrapper(true);
            lastSavedTimeRef.current = saveTime;
            updateSavedDataRef();
            saveInProgressRef.current = false;
            return true;
          } catch (error) {
            console.error("Error during forced save:", error);
            saveInProgressRef.current = false;
            return false;
          }
        }, 0);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during forced save setup:", error);
      saveInProgressRef.current = false;
      return false;
    }
  }, [saveDataWrapper, hasDataChanged, updateSavedDataRef]);

  // Efficient auto-save on data changes with debouncing and change detection
  useEffect(() => {
    // Skip the initial render to prevent unnecessary saves
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      updateSavedDataRef();
      return;
    }
    
    // Only trigger save if data has changed and we're not already saving
    if (hasDataChanged() && !saveInProgressRef.current) {
      console.log("Auto-save effect triggered by state change");
      debouncedSave();
    }
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [progress, startDate, endDate, notes, debouncedSave, hasDataChanged, updateSavedDataRef]);
  
  // Add specific save on browser events (beforeunload, visibilitychange)
  useEffect(() => {
    // Handle visibility changes to save when user switches tabs or minimizes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !saveInProgressRef.current) {
        forceSaveData();
      }
    };

    // Handle before unload to save when page is refreshed or closed
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only try to save if we're not already in the middle of saving
      if (!saveInProgressRef.current) {
        const saved = forceSaveData();
        
        // Only show a confirmation dialog if there are unsaved changes
        if (pendingSaveRef.current || hasDataChanged()) {
          event.preventDefault();
          event.returnValue = '';
          return '';
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Initial data snapshot
    updateSavedDataRef();
    
    // Periodic backup saves (every 60 seconds)
    const intervalId = setInterval(() => {
      if ((hasDataChanged() || pendingSaveRef.current) && !saveInProgressRef.current) {
        forceSaveData();
      }
    }, 60000);
    
    // Cleanup event listeners and intervals
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      // Final save when component unmounts
      if (!saveInProgressRef.current) {
        forceSaveData();
      }
    };
  }, [forceSaveData, hasDataChanged, updateSavedDataRef]);

  return {
    getLastSavedMessage,
    forceSaveData
  };
};
