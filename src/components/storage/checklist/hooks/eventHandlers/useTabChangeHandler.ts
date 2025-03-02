
import { useCallback } from 'react';

/**
 * Hook for handling tab change events in the checklist
 */
export const useTabChangeHandler = (
  saveDataWrapper: (manualSave?: boolean) => string,
  batchUpdateRef: React.MutableRefObject<boolean>,
  clearNotesDebounceTimers: () => void,
  clearCheckboxDebounceTimer: () => void
) => {
  // Add a tab change handler that forces a save
  const handleTabChange = useCallback(() => {
    console.log("Tab changed - forcing save");
    
    // Set batch update flag to prevent multiple saves
    batchUpdateRef.current = true;
    
    // Cancel all pending debounced saves
    clearNotesDebounceTimers();
    clearCheckboxDebounceTimer();
    
    let result;
    
    try {
      // Force a save
      result = saveDataWrapper(true);
    } catch (error) {
      console.error("Error saving data on tab change:", error);
    } finally {
      // Reset batch update flag
      setTimeout(() => {
        batchUpdateRef.current = false;
      }, 100);
    }
    
    return result || new Date().toISOString();
  }, [saveDataWrapper, batchUpdateRef, clearNotesDebounceTimers, clearCheckboxDebounceTimer]);

  return {
    handleTabChange
  };
};
