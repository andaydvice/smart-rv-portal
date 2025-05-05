
import React from 'react';
import { LazyImage } from '@/components/ui/LazyImage';

const InterfaceDemoSection = () => {
  return (
    <div className="mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
          <LazyImage 
            src="/lovable-uploads/7b0c607c-52e6-47d2-b5fa-f5cbb912f20a.png"
            alt="Smart RV Control Interface" 
            className="w-full rounded-lg"
            width={1080}
            height={607}
            priority={true}
            style={{ opacity: 1 }} // Force visible with inline style
          />
          <p className="text-gray-400 text-center mt-3 text-sm">
            Complete smart RV control system interface displaying climate control, system monitoring, remote diagnostics, and power management
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterfaceDemoSection;
