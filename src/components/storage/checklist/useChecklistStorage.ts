
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
        
        if (parsed.notes) {
          setNotes(parsed.notes);
        }
      } catch (error) {
        console.error('Error loading saved checklist data:', error);
      }
    }
  }, []);

  // Save function that properly serializes dates
  const saveData = (manualSave: boolean = false) => {
    const currentTime = new Date().toISOString();
    
    // Properly serialize dates to ISO strings for localStorage
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
    setLastSavedAt(currentTime);
    
    return currentTime;
  };

  // Custom setStartDate that saves immediately
  const setStartDateAndSave = (date: Date | undefined) => {
    setStartDate(date);
    // We're not calling saveData here, as the useEffect below will handle it
  };

  // Custom setEndDate that saves immediately
  const setEndDateAndSave = (date: Date | undefined) => {
    setEndDate(date);
    // We're not calling saveData here, as the useEffect below will handle it
  };

  // Handle notes change - save immediately
  const handleNotesChange = (field: keyof ChecklistNotes, value: string) => {
    const updatedNotes = {
      ...notes,
      [field]: value
    };
    
    // Update state
    setNotes(updatedNotes);
    
    // Immediately save to localStorage
    const currentTime = new Date().toISOString();
    const dataToSave = {
      progress,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes: updatedNotes,
      savedAt: currentTime
    };
    
    console.log("Immediate save after notes change for field:", field);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setLastSavedAt(currentTime);
  };

  // Handle checkbox changes and save immediately
  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedProgress = {...progress, [id]: checked};
    setProgress(updatedProgress);
    
    // Immediately save
    const currentTime = new Date().toISOString();
    const dataToSave = {
      progress: updatedProgress,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
      notes,
      savedAt: currentTime
    };
    
    console.log("Immediate save after checkbox change for:", id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setLastSavedAt(currentTime);
  };

  // Also add a safety auto-save effect for any other state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Safety auto-save triggered");
      saveData();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [progress, startDate, endDate, notes]);

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
