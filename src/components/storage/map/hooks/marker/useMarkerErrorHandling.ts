
import { useState, useCallback, useRef } from 'react';
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
  
  // Counter for failed attempts
  const failedAttemptsRef = useRef<Record<string, number>>({});
  const MAX_RETRY_ATTEMPTS = 10;

  // Add error
  const addError = useCallback((facility: StorageFacility, error: Error, type: string) => {
    setErrors(prev => [...prev, {
      facilityId: facility.id,
      error,
      type,
      timestamp: Date.now()
    }]);
    
    // Increment failed attempts counter
    const currentAttempts = failedAttemptsRef.current[facility.id] || 0;
    failedAttemptsRef.current[facility.id] = currentAttempts + 1;
  }, []);

  // Check if a facility has errors
  const hasErrorForFacility = useCallback((facilityId: string) => {
    return errors.some(e => e.facilityId === facilityId);
  }, [errors]);

  // Mark error as recovered
  const markErrorAsRecovered = useCallback((facilityId: string) => {
    setErrors(prev => prev.filter(err => err.facilityId !== facilityId));
    
    // Reset failed attempts counter
    failedAttemptsRef.current[facilityId] = 0;
  }, []);

  // Attempt error recovery - returns true if recovery should be attempted
  const attemptErrorRecovery = useCallback((facilityId: string) => {
    // Check if we've had fewer than MAX_RETRY_ATTEMPTS errors for this facility in the last minute
    const recentErrors = errors.filter(
      e => e.facilityId === facilityId && 
      Date.now() - e.timestamp < 60000
    );
    
    // Get the current failed attempts count
    const currentAttempts = failedAttemptsRef.current[facilityId] || 0;
    
    return currentAttempts < MAX_RETRY_ATTEMPTS;
  }, [errors]);

  // Get the total number of failed attempts across all facilities
  const getTotalFailedAttempts = useCallback(() => {
    return Object.values(failedAttemptsRef.current).reduce((sum, count) => sum + count, 0);
  }, []);

  // Get the current number of failed attempts for a specific facility
  const getFailedAttempts = useCallback((facilityId: string) => {
    return failedAttemptsRef.current[facilityId] || 0;
  }, []);

  return {
    errors,
    addError,
    hasErrorForFacility,
    markErrorAsRecovered,
    attemptErrorRecovery,
    getFailedAttempts,
    getTotalFailedAttempts,
    MAX_RETRY_ATTEMPTS
  };
};
