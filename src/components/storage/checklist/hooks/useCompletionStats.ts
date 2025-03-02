
import { useMemo } from 'react';

export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    try {
      console.log("Calculating completion stats from progress:", progress);
      
      // Only count fields that are booleans or string representations of booleans
      const booleanKeys = Object.keys(progress).filter(key => 
        typeof progress[key] === 'boolean' || progress[key] === 'true' || progress[key] === 'false'
      );
      
      const totalItems = booleanKeys.length;
      console.log(`Total boolean items: ${totalItems}`);
      
      // Only count true boolean values
      const completedItems = Object.entries(progress).filter(([key, val]) => 
        val === true || val === 'true'
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
