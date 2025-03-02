
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from 'lucide-react';

// Define a type that includes only the actual icon components from lucide-react
type IconName = keyof typeof LucideIcons;

interface ChecklistTabTriggerProps {
  value: string;
  icon: IconName;
  label: string;
  iconColor?: string;
}

export const ChecklistTabTrigger: React.FC<ChecklistTabTriggerProps> = ({ 
  value, 
  icon, 
  label,
  iconColor = "#60A5FA" // Default color if not specified
}) => {
  // Use dynamic import to handle the icon properly
  const Icon = LucideIcons[icon] as LucideIcon;
  
  return (
    <TabsTrigger 
      value={value}
      className="data-[state=active]:bg-[#131a2a] data-[state=active]:border-[#5B9BD5] data-[state=active]:border-b-2 py-6 px-5 whitespace-nowrap flex-shrink-0 min-w-[120px]"
    >
      <div className="flex flex-col items-center gap-4 min-h-[80px] justify-center py-3">
        {Icon && <Icon className="h-6 w-6" color={iconColor} />}
        <span className="text-xs font-medium text-[#E2E8FF] data-[state=active]:text-white">{label}</span>
      </div>
    </TabsTrigger>
  );
};
