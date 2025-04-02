
import React from 'react';

interface ErrorProneProps {
  shouldError?: boolean;
}

const ErrorProne: React.FC<ErrorProneProps> = ({ shouldError = false }) => {
  if (shouldError) {
    throw new Error('This is a demonstration error from the ErrorProne component');
  }
  
  return (
    <div className="p-4 bg-[#151A22] rounded-lg">
      <h3 className="text-xl font-semibold mb-2 text-white">Error Prone Component</h3>
      <p className="text-gray-300">This component will throw an error when the flag is set to true</p>
    </div>
  );
};

export default ErrorProne;
