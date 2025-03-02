
import { useCallback, useRef } from 'react';
import { ChecklistNotes } from '../types';

/**
 * Hook for handling checkbox-related events in the checklist
 */
export const useCheckboxHandlers = (
  progressRef: React.MutableRefObject<{[key: string]: boolean | string}>,
  startDateRef: React.MutableRefObject<Date | undefined>,
  endDateRef: React.MutableRefObject<Date | undefined>,
  notesRef: React.MutableRefObject<ChecklistNotes>,
  setProgress: (value: {[key: string]: boolean | string}) => void,
  saveData: (
    progress: {[key: string]: boolean | string},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: ChecklistNotes,
    manualSave?: boolean
  ) => string,
  batchUpdateRef: React.MutableRefObject<boolean>
) => {
  // Debounce timer for checkbox changes
  const checkboxDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle checkbox changes with optimized save strategy
  const handleCheckboxChange = useCallback((id: string, checked: boolean) => {
    // Skip if the value hasn't changed
    if (progressRef.current[id] === checked) return new Date().toISOString();
    
    // Create updated progress object
    const updatedProgress = { ...progressRef.current, [id]: checked };
    
    // Update state
    setProgress(updatedProgress);
    
    // Clear any pending checkbox saves
    if (checkboxDebounceTimer.current) {
      clearTimeout(checkboxDebounceTimer.current);
    }
    
    // Debounce checkbox saves to prevent rapid firing
    checkboxDebounceTimer.current = setTimeout(() => {
      try {
        if (!batchUpdateRef.current) {
          // Save to localStorage
          const currentTime = saveData(
            updatedProgress,
            startDateRef.current,
            endDateRef.current,
            notesRef.current,
            false
          );
        }
      } catch (error) {
        console.error("Error during debounced checkbox save:", error);
      } finally {
        checkboxDebounceTimer.current = null;
      }
    }, 1000);
    
    // Return timestamp for immediate feedback
    return new Date().toISOString();
  }, [notesRef, progressRef, saveData, setProgress, startDateRef, endDateRef, batchUpdateRef]);

  // Method to clear checkbox debounce timer
  const clearCheckboxDebounceTimer = useCallback(() => {
    if (checkboxDebounceTimer.current) {
      clearTimeout(checkboxDebounceTimer.current);
      checkboxDebounceTimer.current = null;
    }
  }, []);

  return {
    handleCheckboxChange,
    clearCheckboxDebounceTimer
  };
};
