
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, AlertTriangle, XCircle } from 'lucide-react';
import { MarkerError } from '../hooks/marker/types';

interface MarkerErrorDisplayProps {
  errors: MarkerError[];
  onDismiss?: (facilityId: string) => void;
  className?: string;
}

const MarkerErrorDisplay: React.FC<MarkerErrorDisplayProps> = ({
  errors,
  onDismiss,
  className = ''
}) => {
  // Only display unrecovered errors
  const activeErrors = errors.filter(error => !error.recovered);
  
  if (activeErrors.length === 0) {
    return null;
  }
  
  // Group errors by error code
  const groupedErrors: Record<string, MarkerError[]> = {};
  activeErrors.forEach(error => {
    if (!groupedErrors[error.errorCode]) {
      groupedErrors[error.errorCode] = [];
    }
    groupedErrors[error.errorCode].push(error);
  });
  
  const getErrorIcon = (errorCode: string) => {
    switch(errorCode) {
      case 'INVALID_COORDINATES':
        return <AlertTriangle className="h-4 w-4" />;
      case 'MARKER_CREATION_FAILED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  const getErrorMessage = (errorCode: string, count: number) => {
    switch(errorCode) {
      case 'INVALID_COORDINATES':
        return `${count} marker${count > 1 ? 's' : ''} could not be displayed due to invalid coordinates`;
      case 'MARKER_CREATION_FAILED':
        return `Failed to create ${count} marker${count > 1 ? 's' : ''}`;
      case 'MISSING_ELEMENT':
        return `${count} marker${count > 1 ? 's' : ''} missing DOM element`;
      default:
        return `${count} unknown error${count > 1 ? 's' : ''} occurred`;
    }
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {Object.entries(groupedErrors).map(([errorCode, errors]) => (
        <Alert key={errorCode} variant="destructive" className="py-2">
          {getErrorIcon(errorCode)}
          <AlertDescription className="flex items-center justify-between">
            <span>{getErrorMessage(errorCode, errors.length)}</span>
            {onDismiss && (
              <button 
                onClick={() => errors.forEach(e => onDismiss(e.facilityId))}
                className="text-xs underline hover:no-underline"
              >
                Dismiss
              </button>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default MarkerErrorDisplay;
