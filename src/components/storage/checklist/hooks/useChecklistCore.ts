
import { useCallback } from 'react';
import { useRefState } from './useRefState';
import { usePersistence } from './usePersistence';
import { ChecklistNotes } from './types';

/**
 * Core hook that manages the state and basic operations of the checklist
 */
export const useChecklistCore = () => {
  // Use the persistence hook
  const { loadData, saveData, clearData } = usePersistence();
  
  // State with refs for immediate access
  const [progress, setProgress, progressRef] = useRefState<{[key: string]: boolean}>({});
  const [startDate, setStartDate, startDateRef] = useRefState<Date | undefined>(new Date());
  const [endDate, setEndDate, endDateRef] = useRefState<Date | undefined>(undefined);
  const [notes, setNotes, notesRef] = useRefState<ChecklistNotes>({
    general: '',
    storageContact: '',
    emergencyContact: '',
    returnPreparation: ''
  });
  const [lastSavedAt, setLastSavedAt] = useRefState<string | null>(null);

  // Core save function - uses refs for latest values
  const saveDataWrapper = useCallback((manualSave: boolean = false) => {
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
  }, [progressRef, saveData, startDateRef, endDateRef, notesRef, setLastSavedAt]);

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
    
    // Actions
    saveDataWrapper,
    resetData,
    loadData,
  };
};
