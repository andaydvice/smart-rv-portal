
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Search } from 'lucide-react';
import { ProgressiveLoader } from '@/components/ui/ProgressiveLoader';

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
        <ProgressiveLoader
          isLoading={true}
          variant="detailed"
          estimatedTime={3000}
          stages={[
            { id: 'search', label: 'Searching storage facilities...', duration: 800, weight: 0.3 },
            { id: 'filter', label: 'Applying filters...', duration: 600, weight: 0.2 },
            { id: 'map', label: 'Loading map data...', duration: 900, weight: 0.3 },
            { id: 'results', label: 'Preparing results...', duration: 700, weight: 0.2 }
          ]}
        />
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
