
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";

interface ChecklistTabTriggerProps {
  value: string;
  label: string;
  progress?: number;
  total?: number;
}

const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  label,
  progress,
  total
}) => {
  // Calculate progress percentage if progress tracking is provided
  const progressPercentage = total && progress !== undefined ? Math.round((progress / total) * 100) : null;
  
  return (
    <TabsTrigger 
      value={value}
      className="px-4 py-2 text-[#E2E8FF] hover:text-white transition-colors relative data-[state=active]:text-white data-[state=active]:font-medium"
    >
      <span>{label}</span>
      
      {progressPercentage !== null && (
        <div className="w-full bg-gray-700 h-1 absolute bottom-0 left-0 right-0">
          <div 
            className="bg-[#5B9BD5] h-full" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}
    </TabsTrigger>
  );
};

export default ChecklistTabTrigger;
