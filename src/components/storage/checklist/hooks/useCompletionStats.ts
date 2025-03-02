
import { useMemo } from 'react';

export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    // Only count fields that are booleans or string representations of booleans
    const booleanKeys = Object.keys(progress).filter(key => 
      typeof progress[key] === 'boolean' || progress[key] === 'true' || progress[key] === 'false'
    );
    
    const totalItems = booleanKeys.length;
    
    // Only count true boolean values
    const completedItems = Object.entries(progress).filter(([_, val]) => 
      val === true || val === 'true'
    ).length;
    
    // Handle edge case where no items exist yet
    let completionPercentage = totalItems > 0 
      ? Math.round((completedItems / totalItems) * 100) 
      : 0;
      
    // Ensure we don't return NaN values and always return a valid number
    if (isNaN(completionPercentage) || !isFinite(completionPercentage)) {
      completionPercentage = 0;
    }
    
    // Ensure we don't exceed 100%
    completionPercentage = Math.min(completionPercentage, 100);
    
    console.log(`Progress calculation: ${completedItems}/${totalItems} = ${completionPercentage}%`);
    
    return { 
      totalItems, 
      completedItems, 
      completionPercentage 
    };
  }, [progress]);
};

export default useCompletionStats;
