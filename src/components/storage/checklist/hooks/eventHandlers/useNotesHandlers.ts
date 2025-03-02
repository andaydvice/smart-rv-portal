
import { useCallback, useRef } from 'react';
import { ChecklistNotes } from '../types';

/**
 * Hook for handling notes-related events in the checklist
 */
export const useNotesHandlers = (
  notesRef: React.MutableRefObject<ChecklistNotes>,
  progressRef: React.MutableRefObject<{[key: string]: boolean | string}>,
  startDateRef: React.MutableRefObject<Date | undefined>,
  endDateRef: React.MutableRefObject<Date | undefined>,
  setNotes: (value: ChecklistNotes) => void,
  saveData: (
    progress: {[key: string]: boolean | string},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: ChecklistNotes,
    manualSave?: boolean
  ) => string,
  batchUpdateRef: React.MutableRefObject<boolean>
) => {
  // Debounce timers for notes changes
  const notesDebounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Handle notes change with DEBOUNCED save for better performance
  const handleNotesChange = useCallback((field: keyof ChecklistNotes, value: string) => {
    // Skip update if the value hasn't changed
    if (notesRef.current[field] === value) return new Date().toISOString();
    
    // Clear previous timer for this field if exists
    if (notesDebounceTimers.current[field]) {
      clearTimeout(notesDebounceTimers.current[field]);
    }
    
    // Create a new notes object with the updated field to ensure reactivity
    const updatedNotes = { ...notesRef.current, [field]: value };
    
    // Update state immediately
    setNotes(updatedNotes);
    
    // Debounce the save operation to reduce performance load
    notesDebounceTimers.current[field] = setTimeout(() => {
      try {
        console.log(`Debounced save for field: ${field}`);
        
        if (!batchUpdateRef.current) {
          const currentTime = saveData(
            progressRef.current,
            startDateRef.current,
            endDateRef.current,
            updatedNotes,
            false
          );
        }
      } catch (error) {
        console.error(`Error during debounced save for field ${field}:`, error);
      } finally {
        // Clear the timer reference
        delete notesDebounceTimers.current[field];
      }
    }, 2000); // 2000ms debounce for better performance
    
    // Return a timestamp for immediate feedback
    return new Date().toISOString();
  }, [notesRef, progressRef, saveData, setNotes, startDateRef, endDateRef, batchUpdateRef]);

  // Method to clear all note debounce timers
  const clearNotesDebounceTimers = useCallback(() => {
    Object.keys(notesDebounceTimers.current).forEach(key => {
      clearTimeout(notesDebounceTimers.current[key]);
      delete notesDebounceTimers.current[key];
    });
  }, []);

  return {
    handleNotesChange,
    clearNotesDebounceTimers
  };
};
