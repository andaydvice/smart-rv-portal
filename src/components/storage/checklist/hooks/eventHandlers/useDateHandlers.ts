
import { useCallback } from 'react';

/**
 * Hook for handling date-related events in the checklist
 */
export const useDateHandlers = (
  startDateRef: React.MutableRefObject<Date | undefined>,
  endDateRef: React.MutableRefObject<Date | undefined>,
  setStartDate: (value: Date | undefined) => void,
  setEndDate: (value: Date | undefined) => void,
  saveDataWrapper: (manualSave?: boolean) => string,
  batchUpdateRef: React.MutableRefObject<boolean>
) => {
  // Set start date with optimized save
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    // Ensure we have a valid date or undefined
    if (typeof date === 'string') {
      // If somehow we received a string, try to convert it to a Date
      try {
        date = new Date(date);
      } catch (error) {
        console.error("Invalid date string provided:", date);
        date = undefined;
      }
    }
    
    if (date?.getTime() === startDateRef.current?.getTime()) return;
    
    setStartDate(date);
    // Delay save to avoid state update conflicts
    if (!batchUpdateRef.current) {
      // Use a smaller timeout to ensure it happens after state update but before UI response
      setTimeout(() => {
        try {
          saveDataWrapper(false);
        } catch (error) {
          console.error("Error saving after start date change:", error);
        }
      }, 100);
    }
  }, [saveDataWrapper, setStartDate, startDateRef, batchUpdateRef]);

  // Set end date with optimized save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    // Ensure we have a valid date or undefined
    if (typeof date === 'string') {
      // If somehow we received a string, try to convert it to a Date
      try {
        date = new Date(date);
      } catch (error) {
        console.error("Invalid date string provided:", date);
        date = undefined;
      }
    }
    
    if (date?.getTime() === endDateRef.current?.getTime()) return;
    
    setEndDate(date);
    // Delay save to avoid state update conflicts
    if (!batchUpdateRef.current) {
      // Use a smaller timeout to ensure it happens after state update but before UI response
      setTimeout(() => {
        try {
          saveDataWrapper(false);
        } catch (error) {
          console.error("Error saving after end date change:", error);
        }
      }, 100);
    }
  }, [saveDataWrapper, setEndDate, endDateRef, batchUpdateRef]);

  return {
    setStartDateAndSave,
    setEndDateAndSave
  };
};
