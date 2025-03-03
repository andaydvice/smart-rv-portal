
import { useMemo } from 'react';

export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    try {
      console.log("Calculating completion stats from progress:", progress);
      
      if (!progress || typeof progress !== 'object') {
        console.warn("Invalid progress object:", progress);
        return { totalItems: 0, completedItems: 0, completionPercentage: 0 };
      }
      
      // Only count true boolean fields that represent checkboxes
      // First, filter the keys for those that appear to be checkbox items
      // They typically follow a pattern like "exterior-1", "electrical-5", etc.
      const checkboxKeys = Object.keys(progress).filter(key => 
        // Include only keys that match the pattern "section-number"
        /^[a-z]+-\d+$/.test(key) && 
        // And are boolean values or string representations of booleans
        (typeof progress[key] === 'boolean' || progress[key] === 'true' || progress[key] === 'false')
      );
      
      const totalItems = checkboxKeys.length;
      console.log(`Total checkbox items: ${totalItems}`);
      
      // Only count true boolean values
      const completedItems = checkboxKeys.filter(key => 
        progress[key] === true || progress[key] === 'true'
      ).length;
      console.log(`Completed items: ${completedItems}`);
      
      // Calculate percentage with safety checks
      let completionPercentage = 0;
      if (totalItems > 0 && completedItems >= 0) {
        completionPercentage = Math.round((completedItems / totalItems) * 100);
      }
      
      // Ensure we handle NaN and infinity
      if (isNaN(completionPercentage) || !isFinite(completionPercentage)) {
        completionPercentage = 0;
      }
      
      // Ensure valid range
      completionPercentage = Math.max(0, Math.min(completionPercentage, 100));
      
      console.log(`Progress calculation: ${completedItems}/${totalItems} = ${completionPercentage}%`);
      
      return { 
        totalItems, 
        completedItems, 
        completionPercentage 
      };
    } catch (error) {
      console.error("Error calculating completion stats:", error);
      return { totalItems: 0, completedItems: 0, completionPercentage: 0 };
    }
  }, [progress]);
};

export default useCompletionStats;
