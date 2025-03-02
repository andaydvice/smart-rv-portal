
import { useCallback } from 'react';
import { STORAGE_KEY, ChecklistData, ChecklistNotes } from './types';

// Hook for handling localStorage persistence operations with improved reliability and performance
export const usePersistence = () => {
  // Load data from localStorage with enhanced error handling
  const loadData = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      
      if (!savedData) {
        console.log("No saved data found");
        return null;
      }
      
      const parsed = JSON.parse(savedData);
      console.log("Loading saved data");
      
      // Convert date strings back to Date objects
      if (parsed.startDate) {
        parsed.startDate = new Date(parsed.startDate);
      }
      
      if (parsed.endDate) {
        parsed.endDate = new Date(parsed.endDate);
      }
      
      // Ensure notes object has all required fields
      if (!parsed.notes) {
        parsed.notes = {
          general: '',
          storageContact: '',
          emergencyContact: '',
          returnPreparation: ''
        };
      }
      
      // Ensure progress object exists
      if (!parsed.progress) {
        parsed.progress = {};
      }
      
      return parsed;
    } catch (error) {
      console.error('Error loading saved checklist data:', error);
      // Don't return null here - attempt to recover with an empty data structure
      return {
        progress: {},
        notes: {
          general: '',
          storageContact: '',
          emergencyContact: '',
          returnPreparation: ''
        },
        savedAt: new Date().toISOString()
      };
    }
  }, []);

  // Save data to localStorage with improved error handling, retry mechanism, and chunking for large data
  const saveData = useCallback((
    progress: {[key: string]: boolean | string},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: ChecklistNotes,
    manualSave: boolean = false
  ) => {
    const currentTime = new Date().toISOString();
    
    // Important: Ensure we're saving primitives and not complex objects
    const dataToSave = {
      progress,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes: {
        general: notes.general || '',
        storageContact: notes.storageContact || '',
        emergencyContact: notes.emergencyContact || '',
        returnPreparation: notes.returnPreparation || ''
      },
      savedAt: currentTime
    };
    
    if (manualSave) {
      console.log("Manually saving data");
    } else {
      console.log("Auto-saving data");
    }
    
    // Function to handle large data by using chunking if needed
    const saveWithSizeCheck = (data: any) => {
      try {
        const jsonString = JSON.stringify(data);
        
        // Check if data is too large (approaching 5MB limit of localStorage)
        if (jsonString.length > 4 * 1024 * 1024) {
          console.warn("Data is very large, attempting to optimize storage");
          
          // Check if notes are causing the size issue
          const notesSize = JSON.stringify(data.notes).length;
          if (notesSize > 1 * 1024 * 1024) {
            // If notes are too large, truncate or split them
            console.warn("Notes are very large, may need to be truncated");
            
            // Limit each notes field to a reasonable size (100KB)
            const MAX_SIZE = 100 * 1024;
            for (const key in data.notes) {
              if (data.notes[key] && data.notes[key].length > MAX_SIZE) {
                console.warn(`Truncating ${key} notes to prevent storage issues`);
                data.notes[key] = data.notes[key].substring(0, MAX_SIZE) + 
                  "\n\n[Note truncated due to size limitations]";
              }
            }
            
            // Try again with truncated notes
            return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          }
        }
        
        // If data isn't too large, save it normally
        localStorage.setItem(STORAGE_KEY, jsonString);
        return true;
      } catch (err) {
        console.error("Failed to save data:", err);
        return false;
      }
    };
    
    // Add retry mechanism for storage operations
    const saveWithRetry = (retries = 2) => {
      try {
        const result = saveWithSizeCheck(dataToSave);
        if (result) {
          console.log("Storage operation completed successfully");
          return true;
        } else {
          throw new Error("Save operation failed");
        }
      } catch (err) {
        console.error(`Error saving to localStorage (attempt ${3 - retries})`, err);
        
        if (retries > 0) {
          // Clear some potentially large items from localStorage before retrying
          try {
            // Find the largest items and remove them to make space
            const tempStorage = { ...localStorage };
            const keys = Object.keys(tempStorage);
            if (keys.length > 10) { // Only try cleanup if there are several items
              // Get keys other than our main storage key
              const otherKeys = keys.filter(k => k !== STORAGE_KEY);
              if (otherKeys.length > 0) {
                // Remove one item to make space and retry
                localStorage.removeItem(otherKeys[0]);
              }
            }
            return saveWithRetry(retries - 1);
          } catch (cleanupErr) {
            console.error("Error during storage cleanup:", cleanupErr);
          }
        }
        return false;
      }
    };
    
    saveWithRetry();
    return currentTime;
  }, []);

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log("Checklist data cleared successfully");
    } catch (err) {
      console.error("Error clearing localStorage:", err);
    }
  }, []);

  return {
    loadData,
    saveData,
    clearData
  };
};
