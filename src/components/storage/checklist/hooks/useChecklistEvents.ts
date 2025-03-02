
import { useCallback, useRef } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for handling user interactions with the checklist
 * Optimized with debounced saves for better performance
 */
export const useChecklistEvents = (
  progressRef: React.MutableRefObject<{[key: string]: boolean}>,
  startDateRef: React.MutableRefObject<Date | undefined>,
  endDateRef: React.MutableRefObject<Date | undefined>,
  notesRef: React.MutableRefObject<ChecklistNotes>,
  setProgress: (value: {[key: string]: boolean}) => void,
  setStartDate: (value: Date | undefined) => void,
  setEndDate: (value: Date | undefined) => void,
  setNotes: (value: ChecklistNotes) => void,
  saveData: (
    progress: {[key: string]: boolean},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: ChecklistNotes,
    manualSave?: boolean
  ) => string,
  saveDataWrapper: (manualSave?: boolean) => string
) => {
  // Debounce timers for notes changes
  const notesDebounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  // Debounce timer for checkbox changes
  const checkboxDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  // Track if we're in a batch update to prevent excessive saves
  const batchUpdateRef = useRef<boolean>(false);

  // Set start date with optimized save
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    setStartDate(date);
    // Delay save to avoid state update conflicts
    if (!batchUpdateRef.current) {
      // Use a smaller timeout to ensure it happens after state update but before UI response
      setTimeout(() => saveDataWrapper(false), 50);
    }
  }, [saveDataWrapper, setStartDate]);

  // Set end date with optimized save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    setEndDate(date);
    // Delay save to avoid state update conflicts
    if (!batchUpdateRef.current) {
      // Use a smaller timeout to ensure it happens after state update but before UI response
      setTimeout(() => saveDataWrapper(false), 50);
    }
  }, [saveDataWrapper, setEndDate]);

  // Handle notes change with DEBOUNCED save for better performance
  const handleNotesChange = useCallback((field: keyof ChecklistNotes, value: string) => {
    // Clear previous timer for this field if exists
    if (notesDebounceTimers.current[field]) {
      clearTimeout(notesDebounceTimers.current[field]);
    }
    
    // Create a new notes object with the updated field to ensure reactivity
    const updatedNotes = { ...notesRef.current, [field]: value };
    
    // Update state immediately
    setNotes(updatedNotes);
    
    // Debounce the save operation to reduce performance load
    notesDebounceTimers.current[field] = setTimeout(() => {
      console.log(`Debounced save for field: ${field}`);
      
      if (!batchUpdateRef.current) {
        const currentTime = saveData(
          progressRef.current,
          startDateRef.current,
          endDateRef.current,
          updatedNotes,
          false
        );
      }
      
      // Clear the timer reference
      delete notesDebounceTimers.current[field];
      
    }, 1000); // 1000ms debounce
    
    // Return a timestamp for immediate feedback
    return new Date().toISOString();
  }, [notesRef, progressRef, saveData, setNotes, startDateRef, endDateRef]);

  // Handle checkbox changes with optimized save strategy
  const handleCheckboxChange = useCallback((id: string, checked: boolean) => {
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
      checkboxDebounceTimer.current = null;
    }, 500);
    
    // Return timestamp for immediate feedback
    return new Date().toISOString();
  }, [notesRef, progressRef, saveData, setProgress, startDateRef, endDateRef]);

  // Add a tab change handler that forces a save
  const handleTabChange = useCallback(() => {
    console.log("Tab changed - forcing save with current notesRef state:", notesRef.current);
    
    // Set batch update flag to prevent multiple saves
    batchUpdateRef.current = true;
    
    // Cancel all pending debounced saves
    Object.keys(notesDebounceTimers.current).forEach(key => {
      clearTimeout(notesDebounceTimers.current[key]);
      delete notesDebounceTimers.current[key];
    });
    
    if (checkboxDebounceTimer.current) {
      clearTimeout(checkboxDebounceTimer.current);
      checkboxDebounceTimer.current = null;
    }
    
    // Force a save
    const result = saveDataWrapper(true);
    
    // Reset batch update flag
    setTimeout(() => {
      batchUpdateRef.current = false;
    }, 100);
    
    return result;
  }, [saveDataWrapper, notesRef]);

  return {
    setStartDateAndSave,
    setEndDateAndSave,
    handleNotesChange,
    handleCheckboxChange,
    handleTabChange
  };
};
