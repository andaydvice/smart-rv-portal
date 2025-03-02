
import { useCallback } from 'react';
import { STORAGE_KEY, ChecklistData, ChecklistNotes } from './types';

// Hook for handling localStorage persistence operations
export const usePersistence = () => {
  // Load data from localStorage
  const loadData = useCallback(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (!savedData) {
      return null;
    }
    
    try {
      const parsed = JSON.parse(savedData);
      console.log("Loading saved data:", parsed);
      
      // Convert date strings back to Date objects
      if (parsed.startDate) {
        parsed.startDate = new Date(parsed.startDate);
      }
      
      if (parsed.endDate) {
        parsed.endDate = new Date(parsed.endDate);
      }
      
      return parsed;
    } catch (error) {
      console.error('Error loading saved checklist data:', error);
      return null;
    }
  }, []);

  // Save data to localStorage
  const saveData = useCallback((
    progress: {[key: string]: boolean},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: ChecklistNotes,
    manualSave: boolean = false
  ) => {
    const currentTime = new Date().toISOString();
    
    const dataToSave = {
      progress,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes,
      savedAt: currentTime
    };
    
    if (manualSave) {
      console.log("Manually saving data:", dataToSave);
    } else {
      console.log("Auto-saving data:", dataToSave);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return currentTime;
  }, []);

  const clearData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    loadData,
    saveData,
    clearData
  };
};
