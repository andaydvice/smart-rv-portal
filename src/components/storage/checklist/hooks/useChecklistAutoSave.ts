
import { useEffect, useCallback } from 'react';
import { ChecklistNotes } from './types';

/**
 * Hook for managing automatic saving of checklist data
 */
export const useChecklistAutoSave = (
  progress: {[key: string]: boolean},
  startDate: Date | undefined, 
  endDate: Date | undefined,
  notes: ChecklistNotes,
  saveDataWrapper: (manualSave?: boolean) => string
) => {
  // Format last saved message
  const getLastSavedMessage = useCallback(() => {
    const lastSavedAt = saveDataWrapper(false);
    if (!lastSavedAt) return "";
    
    const savedDate = new Date(lastSavedAt);
    return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
  }, [saveDataWrapper]);

  // Backup safety auto-save for any missed changes
  useEffect(() => {
    console.log("Auto-save effect triggered by state change");
    
    const timeoutId = setTimeout(() => {
      console.log("Executing safety auto-save");
      saveDataWrapper();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [progress, startDate, endDate, notes, saveDataWrapper]);
  
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
    getLastSavedMessage
  };
};
