
import { useMemo } from 'react';

/**
 * Hook that calculates completion statistics for checkbox items in the checklist
 * 
 * @param progress Object containing the checklist state with keys in section-number format (e.g., "exterior-1")
 * @returns Object with totalItems, completedItems, and completionPercentage
 */
export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    // Defensive guard for invalid input
    if (!progress || typeof progress !== 'object') {
      console.warn("useCompletionStats: Invalid progress object provided", progress);
      return { totalItems: 0, completedItems: 0, completionPercentage: 0 };
    }

    // Only consider section-number format keys that hold boolean values
    // Example valid keys: "exterior-1", "plumbing-3", "electrical-2", etc.
    const checkboxKeys = Object.keys(progress).filter(key => {
      // Match pattern: section name followed by hyphen and number (e.g., "exterior-1")
      const keyPattern = /^[a-z]+-\d+$/;
      const isValidKey = keyPattern.test(key);
      
      // Ensure the value is strictly boolean (not string 'true'/'false')
      const isBoolean = typeof progress[key] === 'boolean';
      
      return isValidKey && isBoolean;
    });

    console.log(`Found ${checkboxKeys.length} valid checkbox items`, checkboxKeys);
    
    const totalItems = checkboxKeys.length;
    
    // Only count items that are strictly true
    const completedItems = checkboxKeys.filter(key => progress[key] === true).length;
    
    // Calculate percentage with proper bounds checking
    let completionPercentage = 0;
    if (totalItems > 0) {
      completionPercentage = Math.round((completedItems / totalItems) * 100);
    }
    
    console.log(`Progress calculation: ${completedItems}/${totalItems} = ${completionPercentage}%`);
    
    return {
      totalItems,
      completedItems,
      completionPercentage
    };
  }, [progress]);
};

export default useCompletionStats;
