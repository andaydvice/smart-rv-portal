
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
  onTabClick?: () => void; // New prop for tab click handler
}

const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  icon, 
  label,
  iconColor,
  onTabClick
}) => {
  // Use dynamic import to handle the icon properly if it exists
  const Icon = icon ? (LucideIcons[icon] as LucideIcon) : null;
  
  // Map labels to specific colors exactly as shown in the image
  let specificIconColor = "";
  
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
      specificIconColor = "#FF9D00"; // Orange
      break;
    case "Notes":
      specificIconColor = "#5B9BD5"; // Blue
      break;
    default:
      specificIconColor = "#5B9BD5"; // Default blue
  }

  // Add a click handler to ensure focus is properly managed
  const handleTabClick = () => {
    // Force a save when changing tabs
    console.log(`Tab ${label} clicked - triggering save`);
    if (onTabClick) {
      onTabClick(); // Call the parent's onTabClick handler to trigger saves
    }
  };
  
  return (
    <TabsTrigger 
      value={value}
      className="flex flex-col items-center justify-center w-full py-4 text-white data-[state=active]:bg-[#131a2a]"
      onClick={handleTabClick}
    >
      <div className="flex flex-col items-center gap-2 justify-center">
        {Icon && <Icon className="h-6 w-6" stroke={specificIconColor} strokeWidth={2} />}
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
    </TabsTrigger>
  );
};

export default ChecklistTabTrigger;
