
import { useState, useCallback, useEffect } from "react";

interface UseLoadingReturn {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
  resetLoading: () => void;
}

/**
 * Custom hook to manage loading states with utility functions and safety timeout
 */
export const useLoading = (initialState: boolean = false, timeout: number = 15000): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  const resetLoading = useCallback(() => setIsLoading(false), []);

  // Safety timeout to prevent infinite loading state
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (isLoading) {
      timeoutId = setTimeout(() => {
        console.warn(`Loading state has been active for ${timeout}ms, automatically resetting`);
        setIsLoading(false);
      }, timeout);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading, timeout]);

  /**
   * Utility function to wrap promises with loading state management
   */
  const withLoading = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      try {
        startLoading();
        const result = await promise;
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
    resetLoading,
  };
};

export default useLoading;
