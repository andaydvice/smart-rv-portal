
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
    <div className="flex items-start space-x-2">
      <Checkbox 
        id={id} 
        className="mt-1" 
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(id, checked as boolean)} 
      />
      <Label htmlFor={id} className="text-gray-300">
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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};
