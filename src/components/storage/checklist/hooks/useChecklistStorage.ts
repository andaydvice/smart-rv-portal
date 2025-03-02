
import { useEffect } from 'react';
import { useChecklistCore } from './useChecklistCore';
import { useChecklistEvents } from './useChecklistEvents';
import { useChecklistAutoSave } from './useChecklistAutoSave';
import { ChecklistNotes } from './types';

export type { ChecklistNotes } from './types';

export const useChecklistStorage = () => {
  // Get core functionality
  const {
    progress,
    setProgress,
    progressRef,
    startDate,
    setStartDate,
    startDateRef,
    endDate,
    setEndDate,
    endDateRef,
    notes,
    setNotes,
    notesRef,
    lastSavedAt,
    setLastSavedAt,
    saveDataWrapper,
    resetData,
    loadData
  } = useChecklistCore();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadData();
    
    if (savedData) {
      setProgress(savedData.progress || {});
      
      if (savedData.startDate) {
        setStartDate(savedData.startDate);
      }
      
      if (savedData.endDate) {
        setEndDate(savedData.endDate);
      }
      
      if (savedData.savedAt) {
        setLastSavedAt(savedData.savedAt);
      }
      
      if (savedData.notes) {
        console.log("Loading notes:", savedData.notes);
        setNotes(savedData.notes);
      }
    }
  }, [loadData, setEndDate, setNotes, setProgress, setStartDate, setLastSavedAt]);

  // Get event handlers
  const {
    setStartDateAndSave,
    setEndDateAndSave,
    handleNotesChange,
    handleCheckboxChange,
    handleTabChange
  } = useChecklistEvents(
    progressRef,
    startDateRef,
    endDateRef,
    notesRef,
    setProgress,
    setStartDate,
    setEndDate,
    setNotes,
    useChecklistCore().saveData, // Access the saveData function 
    saveDataWrapper
  );

  // Get auto-save functionality
  const { getLastSavedMessage } = useChecklistAutoSave(
    progress,
    startDate,
    endDate,
    notes,
    saveDataWrapper
  );

  return {
    progress,
    startDate,
    setStartDate: setStartDateAndSave,
    endDate,
    setEndDate: setEndDateAndSave,
    notes,
    lastSavedAt,
    handleCheckboxChange,
    handleNotesChange,
    handleTabChange,
    saveData: saveDataWrapper,
    resetData,
    getLastSavedMessage
  };
};
