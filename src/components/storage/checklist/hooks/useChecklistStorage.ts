
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
    // Validate progress data when it changes
    if (isLoaded && progress) {
      // Check if we have any entries with string boolean values that need conversion
      const needsNormalization = Object.entries(progress).some(
        ([key, value]) => 
          (value === 'true' || value === 'false') && 
          /^[a-z]+-\d+$/.test(key)
      );
      
      if (needsNormalization) {
        console.log("Converting string boolean values to actual booleans");
        
        // Create a normalized version with proper boolean values
        const normalizedProgress = { ...progress };
        
        Object.entries(progress).forEach(([key, value]) => {
          if (/^[a-z]+-\d+$/.test(key)) {
            if (value === 'true') normalizedProgress[key] = true;
            else if (value === 'false') normalizedProgress[key] = false;
          }
        });
        
        // Update the progress state with properly typed values
        setProgress(normalizedProgress);
      }
    }
    
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
  }, [progress, isLoaded, saveDataWrapper, setProgress]);

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
