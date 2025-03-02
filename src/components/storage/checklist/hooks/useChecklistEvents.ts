
import { useCallback } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for handling user interactions with the checklist
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
  saveDataWrapper: (manualSave?: boolean) => string,
  debouncedSave?: (manualSave?: boolean) => void
) => {
  // Set start date with optimized save
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    setStartDate(date);
    // Use debounced save if available
    if (debouncedSave) {
      debouncedSave(false);
    } else {
      // Fallback to immediate save with small delay
      setTimeout(() => saveDataWrapper(false), 0);
    }
  }, [saveDataWrapper, setStartDate, debouncedSave]);

  // Set end date with optimized save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    setEndDate(date);
    // Use debounced save if available
    if (debouncedSave) {
      debouncedSave(false);
    } else {
      // Fallback to immediate save with small delay
      setTimeout(() => saveDataWrapper(false), 0);
    }
  }, [saveDataWrapper, setEndDate, debouncedSave]);

  // Handle notes change with OPTIMIZED save
  const handleNotesChange = useCallback((field: keyof ChecklistNotes, value: string) => {
    // Log the change
    console.log(`Notes changed for field: ${field}`, value);
    
    // Create a new notes object with the updated field to ensure reactivity
    const updatedNotes = { ...notesRef.current, [field]: value };
    
    // Update state
    setNotes(updatedNotes);
    
    // Use debounced save for better performance
    if (debouncedSave) {
      debouncedSave(false);
      return ""; // Return empty string since debounced save doesn't return timestamp
    } else {
      // Fallback to direct save method
      const currentTime = saveData(
        progressRef.current,
        startDateRef.current,
        endDateRef.current,
        updatedNotes,
        false
      );
      
      console.log(`Notes for ${field} saved with value:`, value);
      return currentTime;
    }
  }, [notesRef, progressRef, saveData, setNotes, startDateRef, endDateRef, debouncedSave]);

  // Handle checkbox changes with OPTIMIZED save
  const handleCheckboxChange = useCallback((id: string, checked: boolean) => {
    // Create updated progress object
    const updatedProgress = { ...progressRef.current, [id]: checked };
    
    // Update state
    setProgress(updatedProgress);
    
    // Use debounced save for better performance
    if (debouncedSave) {
      debouncedSave(false);
      return ""; // Return empty string since debounced save doesn't return timestamp
    } else {
      // Fallback to direct save method
      const currentTime = saveData(
        updatedProgress,
        startDateRef.current,
        endDateRef.current,
        notesRef.current,
        false
      );
      
      console.log(`Checkbox ${id} changed to ${checked}`);
      return currentTime;
    }
  }, [notesRef, progressRef, saveData, setProgress, startDateRef, endDateRef, debouncedSave]);

  // Optimized tab change handler
  const handleTabChange = useCallback(() => {
    console.log("Tab changed - forcing save with current notesRef state:", notesRef.current);
    
    // Use debounced save for better performance
    if (debouncedSave) {
      debouncedSave(true);
      return ""; // Return empty string since debounced save doesn't return timestamp
    } else {
      return saveDataWrapper(true);
    }
  }, [saveDataWrapper, notesRef, debouncedSave]);

  return {
    setStartDateAndSave,
    setEndDateAndSave,
    handleNotesChange,
    handleCheckboxChange,
    handleTabChange
  };
};
