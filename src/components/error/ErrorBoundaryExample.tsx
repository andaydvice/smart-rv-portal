
import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Button } from '@/components/ui/button';

// Example component that demonstrates error handling
const ErrorThrower: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  
  if (shouldThrow) {
    throw new Error('This is a test error');
  }
  
  return (
    <div className="p-6 bg-[#151A22] rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Error Boundary Test Component</h2>
      <p className="mb-4 text-[#E2E8FF]">Click the button below to simulate an error</p>
      <Button 
        onClick={() => setShouldThrow(true)}
        variant="destructive"
      >
        Trigger Error
      </Button>
    </div>
  );
};

// Usage example
const ErrorBoundaryExample: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Error Boundary Example</h1>
      
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
    </div>
  );
};

export default ErrorBoundaryExample;
