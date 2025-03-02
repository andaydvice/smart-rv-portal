
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
  saveDataWrapper: (manualSave?: boolean) => string
) => {
  // Set start date with immediate save
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    setStartDate(date);
    // Force immediate save after state update
    setTimeout(() => saveDataWrapper(), 0);
  }, [saveDataWrapper, setStartDate]);

  // Set end date with immediate save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    setEndDate(date);
    // Force immediate save after state update
    setTimeout(() => saveDataWrapper(), 0);
  }, [saveDataWrapper, setEndDate]);

  // Handle notes change with IMMEDIATE save
  const handleNotesChange = useCallback((field: keyof ChecklistNotes, value: string) => {
    // Log the change
    console.log(`Notes changed for field: ${field}`, value);
    
    // Create a new notes object with the updated field to ensure reactivity
    const updatedNotes = { ...notesRef.current, [field]: value };
    
    // Update state
    setNotes(updatedNotes);
    
    // CRITICAL: Immediately save to localStorage with a direct write
    const currentTime = saveData(
      progressRef.current,
      startDateRef.current,
      endDateRef.current,
      updatedNotes,
      false
    );
    
    console.log("IMMEDIATE SAVE after notes change:", updatedNotes);
    console.log(`Notes for ${field} saved with value:`, value);
    
    return currentTime;
  }, [notesRef, progressRef, saveData, setNotes, startDateRef, endDateRef]);

  // Handle checkbox changes with IMMEDIATE save
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
