
import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  statusCode: number;
  stack?: string;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

  const handleError = useCallback((err: any) => {
    const statusCode = err.statusCode || err.status || 500;
    setError({
      message: err.message || 'An unexpected error occurred',
      statusCode,
      stack: err.stack
    });
  }, []);

  const resetError = useCallback(() => {
    setIsRecovering(true);
    setTimeout(() => {
      setError(null);
      setIsRecovering(false);
    }, 1500);
  }, []);

  return {
    error,
    isRecovering,
    handleError,
    resetError
  };
}
