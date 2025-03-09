
import { useState, useCallback } from 'react';
import { StorageFacility } from '../../../types';
import { MarkerError, UseMarkerErrorHandlingReturn } from './types';

export const useMarkerErrorHandling = (): UseMarkerErrorHandlingReturn => {
  const [errors, setErrors] = useState<MarkerError[]>([]);
  const [recoveryAttempts, setRecoveryAttempts] = useState<Map<string, number>>(new Map());
  
  // Track marker errors with deduplication
  const addError = useCallback((facility: StorageFacility, error: Error, type: string) => {
    setErrors(prev => {
      // Check if this exact error already exists
      const exists = prev.some(e => 
        e.facilityId === facility.id && 
        e.type === type && 
        e.error.message === error.message &&
        !e.recovered
      );
      
      if (exists) return prev;
      
      // Add new error
      return [...prev, {
        facilityId: facility.id,
        facilityName: facility.name,
        error,
        timestamp: Date.now(),
        type,
        recovered: false
      }];
    });
  }, []);
  
  // Check if a facility has errors
  const hasErrorForFacility = useCallback((facilityId: string) => {
    return errors.some(e => e.facilityId === facilityId && !e.recovered);
  }, [errors]);
  
  // Mark errors as recovered
  const markErrorAsRecovered = useCallback((facilityId: string) => {
    setErrors(prev => prev.map(e => 
      e.facilityId === facilityId ? { ...e, recovered: true } : e
    ));
  }, []);
  
  // Throttle error recovery attempts
  const attemptErrorRecovery = useCallback((facilityId: string) => {
    setRecoveryAttempts(prev => {
      const newMap = new Map(prev);
      const attempts = prev.get(facilityId) || 0;
      
      // Limit recovery attempts to prevent infinite loops
      if (attempts >= 3) {
        console.log(`Maximum recovery attempts reached for facility ${facilityId}`);
        return prev;
      }
      
      newMap.set(facilityId, attempts + 1);
      return newMap;
    });
    
    const attempts = recoveryAttempts.get(facilityId) || 0;
    return attempts < 3;
  }, [recoveryAttempts]);
  
  return {
    addError,
    hasErrorForFacility,
    markErrorAsRecovered,
    attemptErrorRecovery,
    errors
  };
};
