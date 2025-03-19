
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface MapAlertDisplayProps {
  error: string | null;
  children?: React.ReactNode;
}

const MapAlertDisplay: React.FC<MapAlertDisplayProps> = ({ error, children }) => {
  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default MapAlertDisplay;
