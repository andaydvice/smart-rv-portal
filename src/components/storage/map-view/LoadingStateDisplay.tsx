
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Search } from 'lucide-react';

interface LoadingStateDisplayProps {
  isLoading: boolean;
  error: any;
  hasResults: boolean;
}

const LoadingStateDisplay: React.FC<LoadingStateDisplayProps> = ({
  isLoading,
  error,
  hasResults
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-gray-400">Loading storage facilities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading storage facilities. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center p-4">
        <Search className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-300 mb-2">No Storage Facilities Found</h3>
        <p className="text-gray-400 max-w-md">
          Try adjusting your filters or price range to see more results.
        </p>
      </div>
    );
  }

  return null;
};

export default LoadingStateDisplay;
