
import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface DataPreviewContainerProps {
  data: any[];
  userId?: string;
  isLoading?: boolean;
  error?: string;
  emptyMessage?: string;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}

const DataPreviewContainer: React.FC<DataPreviewContainerProps> = ({
  data,
  userId,
  isLoading = false,
  error,
  emptyMessage = "No data available",
  renderItem,
  className = "",
}) => {
  // Filter data by userId if provided
  const filteredData = userId 
    ? data.filter(item => item.userId === userId || item.user_id === userId)
    : data;

  // Display loading state
  if (isLoading) {
    return (
      <div className={`bg-white min-h-[200px] w-full p-4 rounded-md shadow-sm ${className}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Loader2 className="h-8 w-8 text-[#5B9BD5] animate-spin" />
          <p className="text-gray-500">Loading data...</p>
          <div className="w-full max-w-md space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className={`bg-white min-h-[200px] w-full p-4 rounded-md shadow-sm ${className}`}>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Display empty state
  if (!filteredData.length) {
    return (
      <div className={`bg-white min-h-[200px] w-full p-4 rounded-md shadow-sm ${className}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Display data
  return (
    <div className={`bg-white min-h-[200px] w-full p-4 rounded-md shadow-sm ${className}`}>
      <div className="space-y-4">
        {filteredData.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
};

export default DataPreviewContainer;
