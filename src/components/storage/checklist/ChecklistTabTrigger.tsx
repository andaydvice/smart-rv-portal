
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
      specificIconColor = "#5B9BD5"; // Blue
      break;
    case "Exterior":
      specificIconColor = "#00C29A"; // Green
      break;
    case "Interior":
      specificIconColor = "#FFA500"; // Orange
      break;
    case "Plumbing":
      specificIconColor = "#3B82F6"; // Blue
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
      specificIconColor = "#FF9D00"; // Orange
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
      <div className="flex flex-col items-center gap-3 justify-center w-full">
        {Icon && <Icon className="h-5 w-5" stroke={specificIconColor} strokeWidth={2} />}
        <span className="text-xs font-medium text-center">{label}</span>
        
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
