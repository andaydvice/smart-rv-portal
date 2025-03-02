
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from 'lucide-react';

// Define a type that includes only the actual icon components from lucide-react
type IconName = keyof typeof LucideIcons;

interface ChecklistTabTriggerProps {
  value: string;
  icon?: IconName;
  label: string;
  iconColor?: string;
  progress?: number;
  total?: number;
}

const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  icon, 
  label,
  iconColor = "#60A5FA", // Default color if not specified
  progress,
  total
}) => {
  // Use dynamic import to handle the icon properly if it exists
  const Icon = icon ? (LucideIcons[icon] as LucideIcon) : null;
  
  // Calculate progress percentage if progress tracking is provided
  const progressPercentage = total && progress !== undefined ? Math.round((progress / total) * 100) : null;
  
  return (
    <TabsTrigger 
      value={value}
      className="data-[state=active]:bg-[#131a2a] data-[state=active]:border-[#5B9BD5] data-[state=active]:border-b-2 data-[state=active]:text-white py-6 px-4 h-full flex flex-col items-center justify-center text-[#E2E8FF]"
    >
      <div className="flex flex-col items-center gap-3 min-h-[70px] justify-center">
        {Icon && <Icon className="h-5 w-5" stroke={iconColor} strokeWidth={2} />}
        <span className="text-xs font-medium text-[#E2E8FF] data-[state=active]:text-white">{label}</span>
        
        {progressPercentage !== null && (
          <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[#5B9BD5] h-full rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
    </TabsTrigger>
  );
};

export default ChecklistTabTrigger;
