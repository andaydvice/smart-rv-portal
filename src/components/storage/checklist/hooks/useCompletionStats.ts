
import { useMemo } from 'react';

export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    try {
      console.log("Calculating completion stats from progress:", progress);
      
      if (!progress || typeof progress !== 'object') {
        console.warn("Invalid progress object:", progress);
        return { totalItems: 0, completedItems: 0, completionPercentage: 0 };
      }
      
      // Identify checkbox items using a more reliable approach
      // Look for keys that match section-number pattern which are checkboxes in our app
      const checkboxKeys = Object.keys(progress).filter(key => {
        // Use a specific pattern match for checkbox items (section-number format)
        // Example: "exterior-1", "electrical-5", "plumbing-2", etc.
        const isCheckboxItem = /^[a-z]+-\d+$/.test(key) && 
          // Verify it's a boolean or string boolean value
          (typeof progress[key] === 'boolean' || progress[key] === 'true' || progress[key] === 'false');
        
        return isCheckboxItem;
      });
      
      console.log("Identified checkbox keys:", checkboxKeys);
      
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
