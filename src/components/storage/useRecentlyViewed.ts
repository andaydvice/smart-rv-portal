
import { useState, useEffect } from 'react';
import { StorageFacility } from './types';

const STORAGE_KEY = 'recently-viewed-facilities';
const MAX_RECENT_ITEMS = 5;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<StorageFacility[]>([]);

  // Load recently viewed facilities from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentlyViewed(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading recently viewed facilities:', error);
      // If there's an error loading from localStorage, start with empty array
      setRecentlyViewed([]);
    }
  }, []);

  // Add a facility to recently viewed list
  const addToRecentlyViewed = (facility: StorageFacility) => {
    if (!facility) return; // Guard against null or undefined
    
    setRecentlyViewed(prev => {
      // Remove the facility if it already exists in the list
      const filtered = prev.filter(item => item.id !== facility.id);
      
      // Add the facility to the beginning of the list
      const updated = [facility, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving recently viewed facilities:', error);
      }
      
      return updated;
    });
  };

  // Clear all recently viewed facilities
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Get only the IDs of recently viewed facilities
  const getRecentlyViewedIds = (): string[] => {
    return recentlyViewed.map(facility => facility.id);
  };

  return {
    recentlyViewed,
    recentlyViewedIds: getRecentlyViewedIds(),
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};
