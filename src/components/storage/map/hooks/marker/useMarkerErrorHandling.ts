
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { StorageFacility } from '../../../types';

export interface MarkerError {
  facilityId: string;
  facilityName: string;
  errorMessage: string;
  errorCode: string;
  timestamp: number;
  recovered: boolean;
}

export interface UseMarkerErrorHandlingReturn {
  errors: MarkerError[];
  addError: (facility: StorageFacility, error: Error, errorCode: string) => void;
  clearErrors: () => void;
  markErrorAsRecovered: (facilityId: string) => void;
  hasErrorForFacility: (facilityId: string) => boolean;
  getErrorsForFacility: (facilityId: string) => MarkerError[];
  attemptErrorRecovery: (facilityId: string) => boolean;
  errorCount: number;
}

export const useMarkerErrorHandling = (): UseMarkerErrorHandlingReturn => {
  const [errors, setErrors] = useState<MarkerError[]>([]);
  const recoveryAttemptsRef = useRef<Record<string, number>>({});
  
  // Add a new error with facility context
  const addError = useCallback((facility: StorageFacility, error: Error, errorCode: string) => {
    // Only show toast for the first error of each type
    const existingError = errors.find(
      e => e.facilityId === facility.id && e.errorCode === errorCode && !e.recovered
    );
    
    if (!existingError) {
      toast.error(`Error with marker: ${error.message}`);
    }
    
    setErrors(prev => [
      ...prev,
      {
        facilityId: facility.id,
        facilityName: facility.name,
        errorMessage: error.message,
        errorCode,
        timestamp: Date.now(),
        recovered: false
      }
    ]);
    
    console.error(`Marker Error [${errorCode}] for ${facility.name}:`, error);
  }, [errors]);
  
  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);
  
  // Mark an error as recovered
  const markErrorAsRecovered = useCallback((facilityId: string) => {
    setErrors(prev => 
      prev.map(err => 
        err.facilityId === facilityId 
          ? { ...err, recovered: true } 
          : err
      )
    );
  }, []);
  
  // Check if a facility has any unrecovered errors
  const hasErrorForFacility = useCallback((facilityId: string) => {
    return errors.some(err => err.facilityId === facilityId && !err.recovered);
  }, [errors]);
  
  // Get all errors for a specific facility
  const getErrorsForFacility = useCallback((facilityId: string) => {
    return errors.filter(err => err.facilityId === facilityId);
  }, [errors]);
  
  // Attempt to recover from an error with exponential backoff
  const attemptErrorRecovery = useCallback((facilityId: string): boolean => {
    const attempts = recoveryAttemptsRef.current[facilityId] || 0;
    
    // Max 3 recovery attempts
    if (attempts >= 3) {
      return false;
    }
    
    // Exponential backoff for retries
    const backoffTime = Math.pow(2, attempts) * 500;
    
    // Track the attempt
    recoveryAttemptsRef.current[facilityId] = attempts + 1;
    
    // Log recovery attempt
    console.log(`Attempting recovery for facility ${facilityId} (attempt ${attempts + 1})`);
    
    // Return true to indicate we should retry
    return true;
  }, []);
  
  // Current error count (excluding recovered)
  const errorCount = errors.filter(err => !err.recovered).length;
  
  return {
    errors,
    addError,
    clearErrors,
    markErrorAsRecovered,
    hasErrorForFacility,
    getErrorsForFacility,
    attemptErrorRecovery,
    errorCount
  };
};
