
import { useCallback, useEffect } from 'react';
import { useRefState } from './useRefState';
import { usePersistence } from './usePersistence';
import { ChecklistNotes } from './types';

/**
 * Core hook that manages the state and basic operations of the checklist
 * Enhanced with improved state loading and initialization
 */
export const useChecklistCore = () => {
  // Use the persistence hook
  const { loadData, saveData, clearData } = usePersistence();
  
  // State with refs for immediate access
  const [progress, setProgress, progressRef] = useRefState<{[key: string]: boolean | string}>({});
  const [startDate, setStartDate, startDateRef] = useRefState<Date | undefined>(new Date());
  const [endDate, setEndDate, endDateRef] = useRefState<Date | undefined>(undefined);
  const [notes, setNotes, notesRef] = useRefState<ChecklistNotes>({
    general: '',
    storageContact: '',
    emergencyContact: '',
    returnPreparation: ''
  });
  const [lastSavedAt, setLastSavedAt] = useRefState<string | null>(null);
  const [isLoaded, setIsLoaded, isLoadedRef] = useRefState<boolean>(false);

  // Initialize data from localStorage on mount
  useEffect(() => {
    // Only load once
    if (!isLoadedRef.current) {
      const savedData = loadData();
      
      if (savedData) {
        console.log("Initializing checklist with saved data");
        
        // Handle progress data with type safety
        if (savedData.progress) {
          setProgress(savedData.progress);
        }
        
        // Handle dates
        if (savedData.startDate) {
          setStartDate(savedData.startDate);
        }
        
        if (savedData.endDate) {
          setEndDate(savedData.endDate);
        }
        
        // Handle notes with defaults for missing fields
        if (savedData.notes) {
          const loadedNotes = {
            general: savedData.notes.general || '',
            storageContact: savedData.notes.storageContact || '',
            emergencyContact: savedData.notes.emergencyContact || '',
            returnPreparation: savedData.notes.returnPreparation || ''
          };
          setNotes(loadedNotes);
        }
        
        // Set last saved timestamp
        if (savedData.savedAt) {
          setLastSavedAt(savedData.savedAt);
        }
      } else {
        console.log("No saved data found, initializing with defaults");
      }
      
      setIsLoaded(true);
    }
  }, [loadData, setEndDate, setNotes, setProgress, setStartDate, setLastSavedAt, isLoadedRef, setIsLoaded]);

  // Core save function - uses refs for latest values
  const saveDataWrapper = useCallback((manualSave: boolean = false) => {
    if (!isLoadedRef.current) {
      console.log("Not saving as data is still being loaded");
      return new Date().toISOString();
    }
    
    console.log("Saving data with refs, notes state:", notesRef.current);
    
    const currentTime = saveData(
      progressRef.current,
      startDateRef.current,
      endDateRef.current,
      notesRef.current,
      manualSave
    );
    
    setLastSavedAt(currentTime);
    return currentTime;
  }, [progressRef, saveData, startDateRef, endDateRef, notesRef, setLastSavedAt, isLoadedRef]);

  // Reset all data
  const resetData = useCallback(() => {
    const emptyNotes = {
      general: '',
      storageContact: '',
      emergencyContact: '',
      returnPreparation: ''
    };
    
    setProgress({});
    setStartDate(new Date());
    setEndDate(undefined);
    setLastSavedAt(null);
    setNotes(emptyNotes);
    
    clearData();
  }, [clearData, setEndDate, setNotes, setProgress, setStartDate, setLastSavedAt]);

  return {
    // State
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
    isLoaded,
    
    // Actions
    saveDataWrapper,
    resetData,
    loadData,
  };
};
