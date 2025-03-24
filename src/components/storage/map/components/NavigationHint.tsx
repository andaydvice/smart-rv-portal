
import React from 'react';

const NavigationHint: React.FC = () => {
  return (
    <div className="text-white bg-[#F97316] px-3 py-2 rounded-md text-sm shadow-md border-2 border-white/20 animate-pulse font-medium flex items-center gap-2 max-w-[280px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move shrink-0">
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
      <span className="leading-snug">
        If the location details are cut off,<br/>
        move the map with your browser
      </span>
    </div>
  );
};

export default NavigationHint;
