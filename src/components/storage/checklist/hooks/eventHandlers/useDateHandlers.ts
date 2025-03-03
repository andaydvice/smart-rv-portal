
import { useCallback } from 'react';

/**
 * Hook for handling date-related events in the checklist
 * Enhanced with better type safety for dates
 */
export const useDateHandlers = (
  startDateRef: React.MutableRefObject<Date | undefined>,
  endDateRef: React.MutableRefObject<Date | undefined>,
  setStartDate: (value: Date | undefined) => void,
  setEndDate: (value: Date | undefined) => void,
  saveDataWrapper: (manualSave?: boolean) => string,
  batchUpdateRef: React.MutableRefObject<boolean>
) => {
  // Helper function to ensure value is a proper Date or undefined
  const ensureValidDate = (value: any): Date | undefined => {
    if (!value) return undefined;
    
    // If it's already a Date object and valid
    if (value instanceof Date && !isNaN(value.getTime())) {
      return value;
    }
    
    // If it's a string, try to convert it
    if (typeof value === 'string') {
      try {
        const date = new Date(value);
        // Check if it's a valid date
        if (!isNaN(date.getTime())) {
          return date;
        }
      } catch (error) {
        console.error("Invalid date string:", value);
      }
    }
    
    return undefined;
  };

  // Set start date with optimized save and type safety
  const setStartDateAndSave = useCallback((date: Date | undefined) => {
    // Convert to valid Date or undefined
    const validDate = ensureValidDate(date);
    
    // Check if the date has actually changed
    if (
      (validDate && startDateRef.current && validDate.getTime() === startDateRef.current.getTime()) ||
      (!validDate && !startDateRef.current)
    ) {
      return;
    }
    
    setStartDate(validDate);
    
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

  // Set end date with optimized save and type safety
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    // Convert to valid Date or undefined
    const validDate = ensureValidDate(date);
    
    // Check if the date has actually changed
    if (
      (validDate && endDateRef.current && validDate.getTime() === endDateRef.current.getTime()) ||
      (!validDate && !endDateRef.current)
    ) {
      return;
    }
    
    setEndDate(validDate);
    
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
