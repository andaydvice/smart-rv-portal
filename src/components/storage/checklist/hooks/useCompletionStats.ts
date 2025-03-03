
import { useMemo } from 'react';

/**
 * Hook that calculates completion statistics for checkbox items in the checklist
 * Optimized to reliably identify and count only proper checkbox items
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

    // Only consider correctly formatted checkbox keys that hold boolean values
    // Valid keys follow the pattern: section name followed by hyphen and number (e.g., "exterior-1")
    const validKeyPattern = /^[a-z]+-\d+$/;
    
    const checkboxKeys = Object.entries(progress)
      .filter(([key, value]) => {
        // Verify key format
        const isValidKeyFormat = validKeyPattern.test(key);
        
        // Strictly validate that the value is a boolean or 'true'/'false' string
        const isValidValue = typeof value === 'boolean' || value === 'true' || value === 'false';
        
        if (isValidKeyFormat && !isValidValue) {
          console.warn(`Found invalid value type for checkbox key ${key}:`, value);
        }
        
        return isValidKeyFormat && isValidValue;
      })
      .map(([key]) => key);

    console.log(`Found ${checkboxKeys.length} valid checkbox items for progress calculation`);
    
    const totalItems = checkboxKeys.length;
    
    // Count items that are true (either boolean true or string 'true')
    const completedItems = checkboxKeys.filter(key => {
      const value = progress[key];
      return value === true || value === 'true';
    }).length;
    
    // Calculate percentage with proper bounds checking and rounding
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
