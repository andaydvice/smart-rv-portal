import React from "react";
import { ChevronDown } from "lucide-react";

const ScrollHint = () => {
  return (
    <div className="fixed bottom-16 left-0 right-0 flex justify-center items-center z-10 pointer-events-none">
      <div className="bg-blue-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center space-x-2 animate-bounce shadow-lg">
        <ChevronDown className="w-5 h-5 text-white" />
        <span className="text-sm font-bold">Scroll to view more calculators</span>
        <ChevronDown className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default ScrollHint;