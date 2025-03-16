
import { useState, useCallback } from 'react';
import { StorageFacility } from '../../../types';

/**
 * Hook for tracking and managing marker errors
 */
export const useMarkerErrorHandling = () => {
  // State for tracking errors
  const [errors, setErrors] = useState<Array<{
    facilityId: string,
    error?: Error,
    type: string,
    timestamp: number
  }>>([]);

  // Add error
  const addError = useCallback((facility: StorageFacility, error: Error, type: string) => {
    setErrors(prev => [...prev, {
      facilityId: facility.id,
      error,
      type,
      timestamp: Date.now()
    }]);
  }, []);

  // Check if a facility has errors
  const hasErrorForFacility = useCallback((facilityId: string) => {
    return errors.some(e => e.facilityId === facilityId);
  }, [errors]);

  // Mark error as recovered
  const markErrorAsRecovered = useCallback((facilityId: string) => {
    setErrors(prev => prev.filter(err => err.facilityId !== facilityId));
  }, []);

  return {
    errors,
    addError,
    hasErrorForFacility,
    markErrorAsRecovered
  };
};
