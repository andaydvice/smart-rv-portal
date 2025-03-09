
import { useState, useCallback, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { useMarkerCreation, useMarkerHighlight, useMarkerPersistence } from './marker';

interface UseMarkerManagementProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

interface MarkerStats {
  markersCreated: number;
  skippedFacilities: number;
  processedNYFacilities: number;
  totalFacilities: number;
  totalNYFacilities: number;
}

interface MarkerError {
  facilityId: string;
  facilityName: string;
  error: Error;
  timestamp: number;
  type: string;
  recovered: boolean;
}

export const useMarkerManagement = ({
  map,
  facilities,
  highlightedFacility,
  onMarkerClick
}: UseMarkerManagementProps) => {
  const [stats, setStats] = useState<MarkerStats>({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalFacilities: 0,
    totalNYFacilities: 0
  });
  
  const [errors, setErrors] = useState<MarkerError[]>([]);
  
  // Track which facility IDs we've already processed
  const processedFacilityIds = useRef<Set<string>>(new Set());
  // Track the last time we created markers
  const lastCreationTime = useRef<number>(0);
  
  // Use composable hooks for specific marker functionality
  const { markers, createMarkers } = useMarkerCreation({ 
    map, 
    facilities, 
    highlightedFacility, 
    onMarkerClick 
  });
  
  // Use marker highlight hook
  useMarkerHighlight({ 
    map, 
    facilities, 
    highlightedFacility 
  });
  
  // Use marker persistence hook to ensure markers stay visible
  useMarkerPersistence({ map });
  
  // Optimized version of marker visibility forcing
  const forceMarkerVisibility = useCallback(() => {
    // Apply visibility optimization to all markers
    const allMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    
    // Skip if no markers or if we've recently processed
    if (allMarkers.length === 0) return;
    
    // Track which markers we actually changed
    let updatedCount = 0;
    
    // Process in batches for better performance
    allMarkers.forEach(marker => {
      if (marker instanceof HTMLElement && !marker.hasAttribute('data-visible')) {
        // Add data attribute for CSS rules to apply
        marker.setAttribute('data-visible', 'true');
        updatedCount++;
      }
    });
    
    // Only log if we made actual changes
    if (updatedCount > 0 && process.env.NODE_ENV === 'development') {
      console.log(`Force-enabled visibility on ${updatedCount} markers`);
    }
  }, []);
  
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
  const facilityRecoveryAttempts = useRef<Map<string, number>>(new Map());
  
  const attemptErrorRecovery = useCallback((facilityId: string) => {
    const attempts = facilityRecoveryAttempts.current.get(facilityId) || 0;
    
    // Limit recovery attempts to prevent infinite loops
    if (attempts >= 3) {
      console.log(`Maximum recovery attempts reached for facility ${facilityId}`);
      return false;
    }
    
    facilityRecoveryAttempts.current.set(facilityId, attempts + 1);
    return true;
  }, []);
  
  // Periodically clean up the errors list to avoid memory issues
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      
      setErrors(prev => {
        // Keep only recent or unrecovered errors
        const filtered = prev.filter(e => 
          !e.recovered || e.timestamp > oneHourAgo
        );
        
        // If we removed any, return the new array
        if (filtered.length !== prev.length) {
          return filtered;
        }
        
        // Otherwise keep the same reference
        return prev;
      });
      
      // Also clean up recovery attempts for facilities we haven't seen in a while
      const facilityIdsToKeep = new Set(facilities.map(f => f.id));
      
      // Remove entries for facilities not in current list
      facilityRecoveryAttempts.current.forEach((_, id) => {
        if (!facilityIdsToKeep.has(id)) {
          facilityRecoveryAttempts.current.delete(id);
        }
      });
    }, 5 * 60 * 1000); // Clean up every 5 minutes
    
    return () => clearInterval(cleanupInterval);
  }, [facilities]);

  return {
    stats,
    errors,
    createMarkers,
    forceMarkerVisibility,
    addError,
    hasErrorForFacility,
    markErrorAsRecovered,
    attemptErrorRecovery
  };
};
