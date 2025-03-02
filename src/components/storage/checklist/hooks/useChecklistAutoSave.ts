
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

  // Optimize auto-save by using a throttled approach
  // Only save when component unmounts or visibility changes
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
    
    // Reduce periodic saves to prevent performance issues
    const intervalId = setInterval(() => {
      console.log("Periodic save triggered");
      saveDataWrapper(false); // Silent save
    }, 30000); // Save every 30 seconds (not 3 seconds)
    
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
