
import { useState, useEffect, useCallback } from 'react';
import { ChecklistNotes, ChecklistData } from './types';
import { usePersistence } from './usePersistence';
import { useRefState } from './useRefState';

export type { ChecklistNotes, ChecklistData } from './types';

export const useChecklistStorage = () => {
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
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

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
  }, [loadData, setEndDate, setNotes, setProgress, setStartDate]);

  // Core save function - uses refs for latest values
  const saveDataWrapper = useCallback((manualSave: boolean = false) => {
    const currentTime = saveData(
      progressRef.current,
      startDateRef.current,
      endDateRef.current,
      notesRef.current,
      manualSave
    );
    
    setLastSavedAt(currentTime);
    return currentTime;
  }, [progressRef, saveData, startDateRef, endDateRef, notesRef]);

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
    
    setLastSavedAt(currentTime);
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
    setLastSavedAt(currentTime);
  }, [notesRef, progressRef, saveData, setProgress, startDateRef, endDateRef]);

  // Backup safety auto-save for any missed changes
  useEffect(() => {
    console.log("Auto-save effect triggered by state change");
    
    const timeoutId = setTimeout(() => {
      console.log("Executing safety auto-save");
      saveDataWrapper();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [progress, startDate, endDate, notes, saveDataWrapper]);

  // Add a tab change handler that forces a save
  const handleTabChange = useCallback(() => {
    console.log("Tab changed - forcing save");
    saveDataWrapper(true);
  }, [saveDataWrapper]);

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
  }, [clearData, setEndDate, setNotes, setProgress, setStartDate]);

  // Format last saved message
  const getLastSavedMessage = useCallback(() => {
    if (!lastSavedAt) return "";
    
    const savedDate = new Date(lastSavedAt);
    return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
  }, [lastSavedAt]);

  // Add additional auto-save on component mount/unmount and visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log("Page visibility changed - saving data");
        saveDataWrapper(true);
      }
    };

    // Save when user navigates away or switches tabs
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle browser refresh/unload event
    window.addEventListener('beforeunload', () => {
      console.log("Window unloading - final save");
      saveDataWrapper(true);
    });
    
    // Force periodic saves
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      saveDataWrapper(true);
    }, 3000); // Save every 3 seconds
    
    // Force save when component unmounts
    return () => {
      console.log("Component unmounting - final save");
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', () => {
        console.log("Window unload listener removed");
      });
      clearInterval(intervalId);
      saveDataWrapper(true);
    };
  }, [saveDataWrapper]);

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
