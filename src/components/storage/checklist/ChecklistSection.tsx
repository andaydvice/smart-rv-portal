
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
  // Ensure checked is always a boolean by converting string values if needed
  const isChecked = typeof checked === 'string' 
    ? checked === 'true' 
    : Boolean(checked);
  
  // Handler to ensure we always pass a boolean
  const handleChange = (value: boolean | string) => {
    // Convert to actual boolean if it's a string
    const boolValue = typeof value === 'string'
      ? value === 'true'
      : Boolean(value);
      
    onCheckedChange(id, boolValue);
  };
  
  return (
    <div className="flex items-start space-x-3 p-2 rounded-md hover:bg-[#151A22]/50 transition-colors checklist-item print-item">
      {/* HTML checkbox that only shows in print mode as fallback */}
      <input 
        type="checkbox" 
        checked={isChecked}
        readOnly
        className="print-only-native-checkbox hidden" 
      />
      
      {/* Print-only checkbox visual - bold ☑ or ☐ character */}
      <span 
        aria-hidden="true" 
        className="print-only-checkbox-char hidden"
        style={{ 
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1',
          marginRight: '8px'
        }}
      >
        {isChecked ? '☑' : '☐'}
      </span>
      
      <Checkbox 
        id={id} 
        className="mt-1 h-5 w-5 border-[#5B9BD5] print-checkbox" 
        checked={isChecked}
        onCheckedChange={handleChange} 
        data-print-checked={isChecked ? "true" : "false"}
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        style={{
          position: 'relative',
          visibility: 'visible',
          display: 'inline-block'
        }}
      />
      <Label 
        htmlFor={id} 
        className={`text-[#E2E8FF] text-base cursor-pointer ${isChecked ? 'print-item-checked' : ''}`}
        data-checked={isChecked ? "true" : "false"}
        data-print-state={isChecked ? "checked" : "unchecked"}
      >
        {/* For print only: add a checkmark indicator before the label if checked */}
        <span className="print-only-label-prefix" aria-hidden="true">
          {isChecked ? '☑ ' : '☐ '}
        </span>
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
    <div className="space-y-5 bg-[#0c1219] p-5 rounded-xl border border-gray-800 shadow-md checklist-section">
      <h3 className="text-xl font-semibold text-[#5B9BD5] border-b border-gray-800 pb-3">{title}</h3>
      <div className="space-y-2 checklist-items">
        {children}
      </div>
    </div>
  );
};
