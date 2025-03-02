
import { useMemo } from 'react';

export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    // Count total boolean fields (items that can be checked)
    const booleanKeys = Object.keys(progress).filter(key => 
      typeof progress[key] === 'boolean' || progress[key] === 'true' || progress[key] === 'false'
    );
    
    const totalItems = booleanKeys.length;
    
    // Only count true boolean values
    const completedItems = Object.entries(progress).filter(([_, val]) => 
      val === true || val === 'true'
    ).length;
    
    const completionPercentage = totalItems > 0 
      ? Math.round((completedItems / totalItems) * 100) 
      : 0;
      
    return { totalItems, completedItems, completionPercentage };
  }, [progress]);
};

export default useCompletionStats;
