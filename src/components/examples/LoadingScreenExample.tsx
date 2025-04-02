
import React, { useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { toast } from "sonner";
import useLoading from "@/hooks/useLoading";

/**
 * This component demonstrates how to use the LoadingScreen component
 * with a simulated data loading process
 */
const LoadingScreenExample: React.FC = () => {
  const { isLoading, startLoading, stopLoading, resetLoading } = useLoading(true);
  const [data, setData] = React.useState<string[]>([]);

  useEffect(() => {
    // Simulate a data fetching process
    const fetchData = async () => {
      try {
        // Simulate API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 2500));
        
        // Simulate receiving data
        setData([
          "Item 1", 
          "Item 2", 
          "Item 3", 
          "Item 4", 
          "Item 5"
        ]);
        
        // Turn off loading state
        stopLoading();
        
        // Show success notification
        toast.success("Data loaded successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
        
        // Even on error, we stop loading
        stopLoading();
      }
    };

    // Start fetching data
    fetchData();

    // Emergency reset of loading state after 10 seconds
    const safetyTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Emergency loading reset triggered");
        resetLoading();
        toast.error("Loading timeout reached. Data may be incomplete.");
      }
    }, 10000);

    // Cleanup function
    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [stopLoading, resetLoading, isLoading]);

  return (
    <div className="min-h-screen bg-[#080F1F] p-8 text-white">
      {/* Loading Screen with timeout */}
      <LoadingScreen 
        isLoading={isLoading} 
        message="Loading your dashboard..." 
        timeout={10000}
      />
      
      {/* Content that appears after loading */}
      <div className="container mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-connectivity-accent">
          Dashboard
        </h1>
        
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <div 
                key={index}
                className="rounded-lg border border-gray-700 bg-connectivity-darkBg p-4"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No data available.</p>
        )}
        
        <div className="mt-8">
          <button 
            onClick={() => {
              startLoading();
              setTimeout(() => stopLoading(), 2500);
            }}
            className="rounded bg-connectivity-accent px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Simulate Loading Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreenExample;
