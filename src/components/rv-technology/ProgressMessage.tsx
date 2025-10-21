import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressMessageProps {
  stage: 'analyzing' | 'generating' | 'processing' | 'finalizing';
  customMessage?: string;
}

const stageMessages = {
  analyzing: 'Analyzing your requirements...',
  generating: 'Generating personalized recommendations...',
  processing: 'Processing your information...',
  finalizing: 'Finalizing your results...'
};

export const ProgressMessage: React.FC<ProgressMessageProps> = ({ stage, customMessage }) => {
  const message = customMessage || stageMessages[stage];
  
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-[#5B9BD5] animate-spin" />
        <div className="absolute inset-0 h-12 w-12 rounded-full bg-[#5B9BD5]/20 animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-white font-medium text-lg">{message}</p>
        <p className="text-[#E2E8FF]/70 text-sm">This may take a few moments...</p>
      </div>
    </div>
  );
};
