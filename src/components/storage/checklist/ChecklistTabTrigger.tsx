
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
  
  // Set specific colors for different tabs based on the label
  let specificIconColor = iconColor;
  
  // Map labels to specific colors from the screenshot
  switch(label) {
    case "RV Info":
      specificIconColor = "#5B9BD5"; // Ocean blue
      break;
    case "Electrical":
      specificIconColor = "#F44336"; // Red
      break;
    case "Plumbing":
      specificIconColor = "#4B9EF5"; // Blue
      break;
    case "Exterior":
      specificIconColor = "#2ECC71"; // Green
      break;
    case "Interior":
      specificIconColor = "#F2B200"; // Gold/Amber
      break;
    case "Mechanical":
      specificIconColor = "#9C4DF5"; // Purple
      break;
    case "Tires & Suspension":
      specificIconColor = "#5B9BD5"; // Blue
      break;
    case "Security":
      specificIconColor = "#FF7043"; // Orange
      break;
    case "Pest Control":
      specificIconColor = "#06B6D4"; // Cyan
      break;
    case "Notes":
      specificIconColor = "#818CF8"; // Indigo
      break;
    default:
      specificIconColor = iconColor;
  }
  
  return (
    <TabsTrigger 
      value={value}
      className="data-[state=active]:bg-[#131a2a] data-[state=active]:border-b-2 data-[state=active]:border-[#5B9BD5] flex-col justify-center h-[100px] text-center px-4 text-[#E2E8FF] min-w-[110px] relative"
    >
      <div className="flex flex-col items-center gap-4 justify-center w-full">
        {Icon && <Icon className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />}
        <span className="text-xs font-medium truncate w-full text-center">{label}</span>
        
        {progressPercentage !== null && (
          <div className="w-full bg-gray-800 h-1 rounded-full absolute bottom-2 left-0 right-0 mx-auto max-w-[80%]">
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
