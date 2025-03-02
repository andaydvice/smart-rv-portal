
import { useMemo } from 'react';

export const useCompletionStats = (progress: {[key: string]: boolean | string}) => {
  return useMemo(() => {
    const totalItems = 50;
    // Only count true boolean values, not strings or other values
    const completedItems = Object.values(progress).filter(val => val === true).length;
    const completionPercentage = Math.round((completedItems / totalItems) * 100);
    return { totalItems, completedItems, completionPercentage };
  }, [progress]);
};

export default useCompletionStats;
