
import { useCallback } from 'react';
import { ensureValidDate } from '../../utils/dateUtils';

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
    // Ensure we have a valid Date object or undefined
    const validDate = ensureValidDate(date);
    
    if (validDate?.getTime() === startDateRef.current?.getTime()) return;
    
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

  // Set end date with optimized save
  const setEndDateAndSave = useCallback((date: Date | undefined) => {
    // Ensure we have a valid Date object or undefined
    const validDate = ensureValidDate(date);
    
    if (validDate?.getTime() === endDateRef.current?.getTime()) return;
    
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
