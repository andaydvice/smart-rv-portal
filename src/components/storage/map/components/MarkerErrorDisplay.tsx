
import React, { useState } from 'react';

export interface MarkerError {
  id: string;
  facilityId: string;
  errorMessage: string;
  errorCode: string;
  timestamp: number;
}

interface MarkerErrorDisplayProps {
  errors: MarkerError[];
  onDismiss: (errorId: string) => void;
  className?: string;
}

const MarkerErrorDisplay: React.FC<MarkerErrorDisplayProps> = ({ 
  errors, 
  onDismiss,
  className = ""
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  if (errors.length === 0) return null;

  return (
    <div className={`bg-red-100 border border-red-300 text-red-700 rounded p-2 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-xs">
          {errors.length} Marker {errors.length === 1 ? 'Error' : 'Errors'} Detected
        </h4>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-red-700 hover:text-red-900 text-xs"
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {expanded && (
        <ul className="text-xs">
          {errors.slice(0, 5).map((error) => (
            <li key={error.id} className="mb-2 border-b border-red-200 pb-1">
              <div className="flex justify-between">
                <span className="font-semibold">{error.errorCode}</span>
                <button 
                  onClick={() => onDismiss(error.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Dismiss
                </button>
              </div>
              <div className="truncate text-xs" title={error.errorMessage}>
                {error.errorMessage.substring(0, 60)}
                {error.errorMessage.length > 60 ? '...' : ''}
              </div>
              <div className="text-xs opacity-75">
                Facility ID: {error.facilityId}
              </div>
            </li>
          ))}
          {errors.length > 5 && (
            <li className="text-center text-xs">
              ...and {errors.length - 5} more
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MarkerErrorDisplay;
