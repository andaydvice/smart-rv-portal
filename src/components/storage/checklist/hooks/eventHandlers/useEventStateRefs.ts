
import { useRef } from 'react';

/**
 * Hook for managing shared state references across event handlers
 */
export const useEventStateRefs = () => {
  // Track if we're in a batch update to prevent excessive saves
  const batchUpdateRef = useRef<boolean>(false);

  return {
    batchUpdateRef
  };
};
