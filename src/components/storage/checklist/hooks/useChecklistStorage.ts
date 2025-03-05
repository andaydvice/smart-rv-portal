
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
    loadData,
    isLoaded
  } = useChecklistCore();

  // Get persistence functionality but don't use it directly - it's already used in useChecklistCore
  const persistence = usePersistence();

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
    persistence.saveData, // Pass the saveData from the persistence directly
    saveDataWrapper
  );

  // Get auto-save functionality with enhanced reliability
  const { getLastSavedMessage, forceSaveData } = useChecklistAutoSave(
    progress,
    startDate,
    endDate,
    notes,
    saveDataWrapper
  );

  // Ensure data is saved when the component unmounts
  useEffect(() => {
    return () => {
      // Force a final save when the component unmounts
      if (isLoaded) {
        console.log("Storage component unmounting - forcing final save");
        try {
          saveDataWrapper(true);
        } catch (error) {
          console.error("Error during final save:", error);
        }
      }
    };
  }, [saveDataWrapper, isLoaded]);

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
    forceSave: forceSaveData,
    isLoaded
  };
};
