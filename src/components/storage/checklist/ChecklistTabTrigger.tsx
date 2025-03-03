
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
    
    // Refresh checkbox states for print preparation
    setTimeout(() => {
      const checkboxes = document.querySelectorAll('[role="checkbox"]');
      checkboxes.forEach(checkbox => {
        const isChecked = checkbox.getAttribute('data-state') === 'checked';
        checkbox.setAttribute('data-print-checked', isChecked ? 'true' : 'false');
        checkbox.setAttribute('aria-checked', isChecked ? 'true' : 'false');
      });
    }, 100);
  };
  
  return (
    <TabsTrigger 
      value={value}
      className="flex flex-col items-center justify-center w-full py-4 text-white data-[state=active]:bg-[#131a2a]"
      onClick={handleTabClick}
      style={{ 
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        padding: '12px 0'
      }}
    >
      <div 
        className="flex flex-col items-center gap-2 justify-center"
        style={{ 
          display: 'flex',
          visibility: 'visible',
          opacity: 1,
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '8px' 
        }}
      >
        {Icon && (
          <Icon 
            className="h-6 w-6" 
            stroke={specificIconColor} 
            strokeWidth={2}
            style={{ 
              visibility: 'visible',
              display: 'block',
              opacity: 1,
              width: '24px',
              height: '24px'
            }}
          />
        )}
        <span 
          className="text-sm font-medium text-white"
          style={{ 
            visibility: 'visible',
            display: 'block',
            opacity: 1,
            color: 'white',
            fontSize: '0.875rem'
          }}
        >
          {label}
        </span>
      </div>
    </TabsTrigger>
  );
};

export default ChecklistTabTrigger;
