
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChecklistItemProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (id: string, checked: boolean) => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ 
  id, 
  label, 
  checked, 
  onCheckedChange 
}) => {
  return (
    <div className="flex items-start space-x-3 p-2 rounded-md hover:bg-[#151A22]/50 transition-colors">
      <Checkbox 
        id={id} 
        className="mt-1 h-5 w-5 border-[#5B9BD5]" 
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(id, checked as boolean)} 
      />
      <Label htmlFor={id} className="text-[#E2E8FF] text-base cursor-pointer">
        {label}
      </Label>
    </div>
  );
};

interface ChecklistSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ 
  title, 
  children 
}) => {
  return (
    <div className="space-y-5 bg-[#0c1219] p-5 rounded-xl border border-gray-800 shadow-md">
      <h3 className="text-xl font-semibold text-[#5B9BD5] border-b border-gray-800 pb-3">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};
