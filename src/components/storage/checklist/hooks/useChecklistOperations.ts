
import { useState } from 'react';
import { ChecklistNotes } from './types';

interface UseChecklistOperationsProps {
  progress: {[key: string]: boolean | string};
  notes: ChecklistNotes;
  setProgress: (progress: {[key: string]: boolean | string}) => void;
  setNotes: (notes: ChecklistNotes) => void;
  saveDataWrapper: (manualSave?: boolean) => string;
  startSavingIndicator: () => void;
}

export const useChecklistOperations = ({
  progress,
  notes,
  setProgress,
  setNotes,
  saveDataWrapper,
  startSavingIndicator
}: UseChecklistOperationsProps) => {
  
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProgress({ ...progress, [id]: checked });
    startSavingIndicator();
    saveDataWrapper(true);
  };

  const handleNotesChange = (id: string, value: string) => {
    setNotes({
      ...notes,
      [id]: value
    });
    startSavingIndicator();
    saveDataWrapper(true);
  };

  const handleDateChange = (id: string, date: Date | string, setStartDate: (date: Date) => void, setEndDate: (date: Date) => void) => {
    if (id === 'startDate') {
      setStartDate(date instanceof Date ? date : new Date(date));
    } else if (id === 'endDate') {
      setEndDate(date instanceof Date ? date : new Date(date));
    }
    startSavingIndicator();
    saveDataWrapper(true);
  };

  return {
    handleCheckboxChange,
    handleNotesChange,
    handleDateChange
  };
};
