
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Define the MarkerError type
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
  className = '',
}) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {errors.map((error) => (
        <Alert key={error.id} variant="destructive" className="relative">
          <AlertTitle>Marker Error: {error.errorCode}</AlertTitle>
          <AlertDescription>{error.errorMessage}</AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onDismiss(error.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      ))}
    </div>
  );
};

export default MarkerErrorDisplay;
