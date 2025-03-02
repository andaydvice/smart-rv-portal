
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const ExteriorTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  // Use memoized handler to prevent performance issues
  const handleCheckChange = React.useCallback((id: string, checked: boolean) => {
    handleCheckboxChange(id, checked);
  }, [handleCheckboxChange]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-[#60A5FA] mb-6 border-b border-gray-800 pb-4">EXTERIOR PREPARATION</h2>
      
      <div className="space-y-8">
        <ChecklistSection title="Cleaning">
          <ChecklistItem
            id="wash"
            label="Wash exterior thoroughly, including roof, sides, and undercarriage"
            checked={!!progress["wash"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="bugs"
            label="Remove all bugs, tree sap, and road tar"
            checked={!!progress["bugs"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="awnings"
            label="Clean awnings and allow to dry completely before retracting"
            checked={!!progress["awnings"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="uv"
            label="Apply UV protectant to rubber seals and gaskets"
            checked={!!progress["uv"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="steps"
            label="Clean and lube entry steps and slide-out mechanisms"
            checked={!!progress["steps"]}
            onCheckedChange={handleCheckChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Inspection & Protection">
          <ChecklistItem
            id="seals"
            label="Inspect and reseal any roof or sidewall seams that show signs of cracking"
            checked={!!progress["seals"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="damage"
            label="Check for and repair any exterior damage (cracks, chips, delamination)"
            checked={!!progress["damage"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="wax"
            label="Apply wax to fiberglass or painted surfaces for extended protection"
            checked={!!progress["wax"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="plastic"
            label="Cover or protect exterior plastic components from UV damage"
            checked={!!progress["plastic"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="accessories"
            label="Remove any exterior accessories that can be detached and store separately"
            checked={!!progress["accessories"]}
            onCheckedChange={handleCheckChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Covering">
          <ChecklistItem
            id="cover"
            label="Consider a breathable RV cover designed for indoor storage (prevents dust)"
            checked={!!progress["cover"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="secure"
            label="If using a cover, ensure it's properly secured but not tight against surfaces"
            checked={!!progress["secure"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="padding"
            label="Place padding over sharp edges to prevent cover damage"
            checked={!!progress["padding"]}
            onCheckedChange={handleCheckChange}
          />
          <ChecklistItem
            id="vents"
            label="Ensure any vents or air circulation points aren't completely sealed by the cover"
            checked={!!progress["vents"]}
            onCheckedChange={handleCheckChange}
          />
        </ChecklistSection>
        
        <div className="space-y-3">
          <Label htmlFor="exterior-notes" className="text-[#5B9BD5] font-medium">Additional Exterior Notes</Label>
          <Textarea 
            id="exterior-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px] focus:border-[#5B9BD5] focus:ring-1 focus:ring-[#5B9BD5] text-white placeholder:text-gray-500" 
            placeholder="Enter any additional notes about exterior preparation..." 
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExteriorTab);
