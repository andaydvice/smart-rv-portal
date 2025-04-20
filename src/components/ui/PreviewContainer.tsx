
import React from 'react';

interface PreviewContainerProps {
  children: React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ children }) => {
  return (
    <div className="bg-[#080F1F] min-h-[200px] w-full p-4 rounded-md shadow-sm text-white">
      {children}
    </div>
  );
};

export default PreviewContainer;
