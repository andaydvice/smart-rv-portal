
import { useEffect } from 'react';
import { useChecklistCore } from './useChecklistCore';
import { useChecklistEvents } from './useChecklistEvents';
import { useChecklistAutoSave } from './useChecklistAutoSave';
import { usePersistence } from './usePersistence';
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

  // Get persistence functionality
  const persistence = usePersistence();

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

  // Get auto-save functionality with optimized performance
  const { getLastSavedMessage, debouncedSave } = useChecklistAutoSave(
    progress,
    startDate,
    endDate,
    notes,
    saveDataWrapper
  );

  // Get event handlers with debounced save
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
    persistence.saveData,
    saveDataWrapper,
    debouncedSave
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
    getLastSavedMessage,
    debouncedSave
  };
};
