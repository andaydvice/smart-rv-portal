
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
    const completionPercentage = totalItems > 0 
      ? Math.round((completedItems / totalItems) * 100) 
      : 0;
      
    // Ensure we don't return NaN values and always return a valid number
    return { 
      totalItems, 
      completedItems, 
      completionPercentage: isNaN(completionPercentage) ? 0 : completionPercentage 
    };
  }, [progress]);
};

export default useCompletionStats;
