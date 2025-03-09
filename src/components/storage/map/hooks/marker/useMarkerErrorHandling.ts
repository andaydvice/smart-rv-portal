
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { StorageFacility } from '../../../types';
import { MarkerError } from './types';

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
  
  const addError = useCallback((facility: StorageFacility, error: Error, errorCode: string) => {
    const existingError = errors.find(
      e => e.facilityId === facility.id && e.type === errorCode && !e.recovered
    );
    
    if (!existingError) {
      toast.error(`Error with marker: ${error.message}`);
    }
    
    setErrors(prev => [
      ...prev,
      {
        facilityId: facility.id,
        facilityName: facility.name,
        error: error,
        type: errorCode,
        timestamp: Date.now(),
        recovered: false
      }
    ]);
    
    console.error(`Marker Error [${errorCode}] for ${facility.name}:`, error);
  }, [errors]);
  
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);
  
  const markErrorAsRecovered = useCallback((facilityId: string) => {
    setErrors(prev => 
      prev.map(err => 
        err.facilityId === facilityId 
          ? { ...err, recovered: true } 
          : err
      )
    );
  }, []);
  
  const hasErrorForFacility = useCallback((facilityId: string) => {
    return errors.some(err => err.facilityId === facilityId && !err.recovered);
  }, [errors]);
  
  const getErrorsForFacility = useCallback((facilityId: string) => {
    return errors.filter(err => err.facilityId === facilityId);
  }, [errors]);
  
  const attemptErrorRecovery = useCallback((facilityId: string): boolean => {
    const attempts = recoveryAttemptsRef.current[facilityId] || 0;
    
    if (attempts >= 3) {
      return false;
    }
    
    const backoffTime = Math.pow(2, attempts) * 500;
    
    recoveryAttemptsRef.current[facilityId] = attempts + 1;
    
    console.log(`Attempting recovery for facility ${facilityId} (attempt ${attempts + 1})`);
    
    return true;
  }, []);
  
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
