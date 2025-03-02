
import { useState, useEffect } from 'react';

export interface ChecklistNotes {
  general: string;
  storageContact: string;
  emergencyContact: string;
  returnPreparation: string;
}

export interface ChecklistData {
  progress: {[key: string]: boolean};
  startDate?: Date;
  endDate?: Date;
  notes: ChecklistNotes;
  savedAt?: string;
}

const STORAGE_KEY = 'rv-storage-checklist';

export const useChecklistStorage = () => {
  const [progress, setProgress] = useState<{[key: string]: boolean}>({});
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [notes, setNotes] = useState<ChecklistNotes>({
    general: '',
    storageContact: '',
    emergencyContact: '',
    returnPreparation: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        
        // Explicitly log what we're loading
        console.log("Loading saved data:", parsed);
        
        setProgress(parsed.progress || {});
        
        if (parsed.startDate) {
          setStartDate(new Date(parsed.startDate));
        }
        
        if (parsed.endDate) {
          setEndDate(new Date(parsed.endDate));
        }
        
        if (parsed.savedAt) {
          setLastSavedAt(parsed.savedAt);
        }
        
        // Explicitly log the notes we're loading
        console.log("Loading notes:", parsed.notes);
        
        if (parsed.notes) {
          setNotes(parsed.notes);
        }
      } catch (error) {
        console.error('Error loading saved checklist data:', error);
      }
    }
  }, []);

  // Core save function
  const saveData = (manualSave: boolean = false) => {
    const currentTime = new Date().toISOString();
    
    const dataToSave = {
      progress,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes,
      savedAt: currentTime
    };
    
    // Log what we're saving
    if (manualSave) {
      console.log("Manually saving data:", dataToSave);
    } else {
      console.log("Auto-saving data:", dataToSave);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setLastSavedAt(currentTime);
    
    return currentTime;
  };

  // Set start date
  const setStartDateAndSave = (date: Date | undefined) => {
    setStartDate(date);
    
    // Force immediate save after state update using a timeout
    setTimeout(() => saveData(), 0);
  };

  // Set end date
  const setEndDateAndSave = (date: Date | undefined) => {
    setEndDate(date);
    
    // Force immediate save after state update using a timeout
    setTimeout(() => saveData(), 0);
  };

  // Handle notes change with IMMEDIATE save
  const handleNotesChange = (field: keyof ChecklistNotes, value: string) => {
    // Log the change
    console.log(`Notes changed for field: ${field}`, value);
    
    // Create a new notes object with the updated field to ensure reactivity
    const updatedNotes = { ...notes, [field]: value };
    
    // Update state
    setNotes(updatedNotes);
    
    // CRITICAL: Immediately save to localStorage with a direct write
    // This bypasses React's state batching and ensures the data is saved right away
    const currentTime = new Date().toISOString();
    
    // Create the save object with the updated notes directly (don't use state)
    const dataToSave = {
      progress,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes: updatedNotes, // Use the local updated notes, not the state
      savedAt: currentTime
    };
    
    console.log("IMMEDIATE SAVE after notes change:", dataToSave);
    console.log(`Notes for ${field} saved with value:`, value);
    
    // Write directly to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setLastSavedAt(currentTime);
  };

  // Handle checkbox changes with IMMEDIATE save
  const handleCheckboxChange = (id: string, checked: boolean) => {
    // Create updated progress object
    const updatedProgress = { ...progress, [id]: checked };
    
    // Update state
    setProgress(updatedProgress);
    
    // Immediately save to localStorage directly
    const currentTime = new Date().toISOString();
    
    const dataToSave = {
      progress: updatedProgress, // Use local updated progress
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes,
      savedAt: currentTime
    };
    
    console.log(`Checkbox ${id} changed to ${checked} - saving immediately`);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setLastSavedAt(currentTime);
  };

  // Backup safety auto-save for any missed changes
  useEffect(() => {
    console.log("Auto-save effect triggered by state change");
    
    const timeoutId = setTimeout(() => {
      console.log("Executing safety auto-save");
      saveData();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [progress, startDate, endDate, notes.general, notes.storageContact, notes.emergencyContact, notes.returnPreparation]);

  const resetData = () => {
    setProgress({});
    setStartDate(new Date());
    setEndDate(undefined);
    setLastSavedAt(null);
    setNotes({
      general: '',
      storageContact: '',
      emergencyContact: '',
      returnPreparation: ''
    });
    
    localStorage.removeItem(STORAGE_KEY);
  };

  const getLastSavedMessage = () => {
    if (!lastSavedAt) return "";
    
    const savedDate = new Date(lastSavedAt);
    return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
  };

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
    saveData,
    resetData,
    getLastSavedMessage
  };
};
