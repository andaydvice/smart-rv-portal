
import React from 'react';

interface FailedAttemptsCounterProps {
  failedAttempts: number;
  maxAttempts: number;
}

/**
 * Component to display the number of failed attempts for marker operations
 */
const FailedAttemptsCounter: React.FC<FailedAttemptsCounterProps> = ({ 
  failedAttempts, 
  maxAttempts 
}) => {
  // Only render if there are failed attempts
  if (failedAttempts === 0) return null;
  
  return (
    <div className="failed-attempts-counter">
      <span>Failed attempts: {failedAttempts}/{maxAttempts}</span>
    </div>
  );
};

export default FailedAttemptsCounter;
