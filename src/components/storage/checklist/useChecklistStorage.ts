
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

  // Auto-save function
  const saveData = (manualSave: boolean = false) => {
    const currentTime = new Date().toISOString();
    
    const dataToSave = {
      progress,
      startDate,
      endDate,
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

  // Handle auto-saving when data changes
  useEffect(() => {
    saveData();
  }, [
    progress,
    startDate,
    endDate,
    notes.general,
    notes.storageContact,
    notes.emergencyContact,
    notes.returnPreparation
  ]);

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

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProgress(prev => ({...prev, [id]: checked}));
  };

  const handleNotesChange = (field: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getLastSavedMessage = () => {
    if (!lastSavedAt) return "";
    
    const savedDate = new Date(lastSavedAt);
    return `Last auto-saved: ${savedDate.toLocaleTimeString()}`;
  };

  return {
    progress,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    notes,
    lastSavedAt,
    handleCheckboxChange,
    handleNotesChange,
    saveData,
    resetData,
    getLastSavedMessage
  };
};
