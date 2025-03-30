
import React from 'react';

interface PreviewContainerProps {
  children: React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ children }) => {
  return (
    <div className="bg-white min-h-[200px] w-full p-4 rounded-md shadow-sm">
      {children}
    </div>
  );
};

export default PreviewContainer;
