
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

  // Set start date with immediate save
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    setStartDate(date);
    // Delay save to avoid state update conflicts
    setTimeout(() => saveDataWrapper(), 10);
  }, [saveDataWrapper, setStartDate]);

  // Set end date with immediate save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    setEndDate(date);
    // Delay save to avoid state update conflicts
    setTimeout(() => saveDataWrapper(), 10);
  }, [saveDataWrapper, setEndDate]);

  // Handle notes change with DEBOUNCED save for better performance
  const handleNotesChange = useCallback((field: keyof ChecklistNotes, value: string) => {
    // Clear previous timer for this field if exists
    if (notesDebounceTimers.current[field]) {
      clearTimeout(notesDebounceTimers.current[field]);
    }
    
    // Log the change
    console.log(`Notes changed for field: ${field}`, value);
    
    // Create a new notes object with the updated field to ensure reactivity
    const updatedNotes = { ...notesRef.current, [field]: value };
    
    // Update state immediately
    setNotes(updatedNotes);
    
    // Debounce the save operation to reduce performance load
    notesDebounceTimers.current[field] = setTimeout(() => {
      console.log(`Debounced save for field: ${field}`);
      const currentTime = saveData(
        progressRef.current,
        startDateRef.current,
        endDateRef.current,
        updatedNotes,
        false
      );
      
      // Clear the timer reference
      delete notesDebounceTimers.current[field];
      
      return currentTime;
    }, 500); // 500ms debounce
    
    // Return a timestamp for immediate feedback
    return new Date().toISOString();
  }, [notesRef, progressRef, saveData, setNotes, startDateRef, endDateRef]);

  // Handle checkbox changes with immediate save but prevent rapid changes
  const handleCheckboxChange = useCallback((id: string, checked: boolean) => {
    // Create updated progress object
    const updatedProgress = { ...progressRef.current, [id]: checked };
    
    // Update state
    setProgress(updatedProgress);
    
    // Immediately save to localStorage directly
    const currentTime = saveData(
      updatedProgress,
      startDateRef.current,
      endDateRef.current,
      notesRef.current,
      false
    );
    
    console.log(`Checkbox ${id} changed to ${checked} - saving immediately`);
    return currentTime;
  }, [notesRef, progressRef, saveData, setProgress, startDateRef, endDateRef]);

  // Add a tab change handler that forces a save
  const handleTabChange = useCallback(() => {
    console.log("Tab changed - forcing save with current notesRef state:", notesRef.current);
    return saveDataWrapper(true);
  }, [saveDataWrapper, notesRef]);

  return {
    setStartDateAndSave,
    setEndDateAndSave,
    handleNotesChange,
    handleCheckboxChange,
    handleTabChange
  };
};
