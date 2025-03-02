
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
  // Track previous state for change detection
  const prevStateRef = useRef<{
    notes: ChecklistNotes;
    progress: {[key: string]: boolean};
  }>({
    notes: notesRef.current,
    progress: progressRef.current
  });

  // Set start date with optimized save
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    if (date?.getTime() === startDateRef.current?.getTime()) return;
    
    setStartDate(date);
    // Delay save to avoid state update conflicts
    if (!batchUpdateRef.current) {
      // Use a smaller timeout to ensure it happens after state update but before UI response
      setTimeout(() => {
        try {
          saveDataWrapper(false);
        } catch (error) {
          console.error("Error saving after start date change:", error);
        }
      }, 100);
    }
  }, [saveDataWrapper, setStartDate, startDateRef]);

  // Set end date with optimized save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    if (date?.getTime() === endDateRef.current?.getTime()) return;
    
    setEndDate(date);
    // Delay save to avoid state update conflicts
    if (!batchUpdateRef.current) {
      // Use a smaller timeout to ensure it happens after state update but before UI response
      setTimeout(() => {
        try {
          saveDataWrapper(false);
        } catch (error) {
          console.error("Error saving after end date change:", error);
        }
      }, 100);
    }
  }, [saveDataWrapper, setEndDate, endDateRef]);

  // Handle notes change with DEBOUNCED save for better performance
  const handleNotesChange = useCallback((field: keyof ChecklistNotes, value: string) => {
    // Skip update if the value hasn't changed
    if (notesRef.current[field] === value) return new Date().toISOString();
    
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
      try {
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
      } catch (error) {
        console.error(`Error during debounced save for field ${field}:`, error);
      } finally {
        // Clear the timer reference
        delete notesDebounceTimers.current[field];
      }
    }, 2000); // 2000ms debounce for better performance
    
    // Return a timestamp for immediate feedback
    return new Date().toISOString();
  }, [notesRef, progressRef, saveData, setNotes, startDateRef, endDateRef]);

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
  }, [saveDataWrapper, notesRef]);

  return {
    setStartDateAndSave,
    setEndDateAndSave,
    handleNotesChange,
    handleCheckboxChange,
    handleTabChange
  };
};
