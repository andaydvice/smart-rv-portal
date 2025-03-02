
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
  iconColor, 
  progress,
  total
}) => {
  // Use dynamic import to handle the icon properly if it exists
  const Icon = icon ? (LucideIcons[icon] as LucideIcon) : null;
  
  // Calculate progress percentage if progress tracking is provided
  const progressPercentage = total && progress !== undefined ? Math.round((progress / total) * 100) : null;
  
  // Set specific colors for different tabs based on the label
  let specificIconColor = "";
  
  // Map labels to specific colors from the screenshot
  switch(label) {
    case "Exterior":
      specificIconColor = "#00C29A"; // Teal/Green
      break;
    case "Interior":
      specificIconColor = "#FFA500"; // Orange
      break;
    case "Plumbing":
      specificIconColor = "#4B8FE3"; // Blue
      break;
    case "Electrical":
      specificIconColor = "#FF4444"; // Red
      break;
    case "Mechanical":
      specificIconColor = "#9853E0"; // Purple
      break;
    case "Tires":
      specificIconColor = "#FF5E93"; // Pink
      break;
    case "Pest Control":
      specificIconColor = "#06B6D4"; // Cyan
      break;
    case "Security":
      specificIconColor = "#FF9D00"; // Yellow/Orange
      break;
    default:
      specificIconColor = "#5B9BD5"; // Default blue
  }
  
  return (
    <TabsTrigger 
      value={value}
      className="data-[state=active]:bg-[#131a2a] data-[state=active]:border-b-2 data-[state=active]:border-b-[#5B9BD5] flex-col items-center justify-center h-[80px] text-center px-0 text-white min-w-[120px] relative"
    >
      <div className="flex flex-col items-center gap-1 justify-center w-full p-0">
        {Icon && <Icon className="h-6 w-6 mb-1" stroke={specificIconColor} strokeWidth={2.5} />}
        <span className="text-sm font-medium">{label}</span>
        
        {progressPercentage !== null && (
          <div className="w-[80%] bg-gray-800 h-1 rounded-full absolute bottom-2 left-0 right-0 mx-auto">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: specificIconColor
              }}
            />
          </div>
        )}
      </div>
    </TabsTrigger>
  );
};

export default ChecklistTabTrigger;
