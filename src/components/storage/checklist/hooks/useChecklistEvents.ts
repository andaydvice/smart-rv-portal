
import { useCallback } from 'react';
import { ChecklistNotes } from './types';
import { useEventStateRefs } from './eventHandlers/useEventStateRefs';
import { useDateHandlers } from './eventHandlers/useDateHandlers';
import { useNotesHandlers } from './eventHandlers/useNotesHandlers';
import { useCheckboxHandlers } from './eventHandlers/useCheckboxHandlers';
import { useTabChangeHandler } from './eventHandlers/useTabChangeHandler';

/**
 * Hook for handling user interactions with the checklist
 * Optimized with debounced saves for better performance
 */
export const useChecklistEvents = (
  progressRef: React.MutableRefObject<{[key: string]: boolean | string}>,
  startDateRef: React.MutableRefObject<Date | undefined>,
  endDateRef: React.MutableRefObject<Date | undefined>,
  notesRef: React.MutableRefObject<ChecklistNotes>,
  setProgress: (value: {[key: string]: boolean | string}) => void,
  setStartDate: (value: Date | undefined) => void,
  setEndDate: (value: Date | undefined) => void,
  setNotes: (value: ChecklistNotes) => void,
  saveData: (
    progress: {[key: string]: boolean | string},
    startDate: Date | undefined,
    endDate: Date | undefined,
    notes: ChecklistNotes,
    manualSave?: boolean
  ) => string,
  saveDataWrapper: (manualSave?: boolean) => string
) => {
  // Get shared state references
  const { batchUpdateRef } = useEventStateRefs();

  // Get notes handlers
  const { 
    handleNotesChange,
    clearNotesDebounceTimers
  } = useNotesHandlers(
    notesRef,
    progressRef,
    startDateRef,
    endDateRef,
    setNotes,
    saveData,
    batchUpdateRef
  );

  // Get checkbox handlers
  const {
    handleCheckboxChange,
    clearCheckboxDebounceTimer
  } = useCheckboxHandlers(
    progressRef,
    startDateRef,
    endDateRef,
    notesRef,
    setProgress,
    saveData,
    batchUpdateRef
  );

  // Get date handlers
  const {
    setStartDateAndSave,
    setEndDateAndSave
  } = useDateHandlers(
    startDateRef,
    endDateRef,
    setStartDate,
    setEndDate,
    saveDataWrapper,
    batchUpdateRef
  );

  // Get tab change handler
  const { handleTabChange } = useTabChangeHandler(
    saveDataWrapper,
    batchUpdateRef,
    clearNotesDebounceTimers,
    clearCheckboxDebounceTimer
  );

  return {
    setStartDateAndSave,
    setEndDateAndSave,
    handleNotesChange,
    handleCheckboxChange,
    handleTabChange
  };
};
