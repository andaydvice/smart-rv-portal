
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const ExteriorTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-[#60A5FA] mb-6 border-b border-gray-800 pb-4">EXTERIOR PREPARATION</h2>
      
      <div className="space-y-8">
        <ChecklistSection title="Cleaning">
          <ChecklistItem
            id="wash"
            label="Wash exterior thoroughly, including roof, sides, and undercarriage"
            checked={!!progress["wash"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="bugs"
            label="Remove all bugs, tree sap, and road tar"
            checked={!!progress["bugs"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="awnings"
            label="Clean awnings and allow to dry completely before retracting"
            checked={!!progress["awnings"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="uv"
            label="Apply UV protectant to rubber seals and gaskets"
            checked={!!progress["uv"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="steps"
            label="Clean and lube entry steps and slide-out mechanisms"
            checked={!!progress["steps"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Inspection & Protection">
          <ChecklistItem
            id="seals"
            label="Inspect and reseal any roof or sidewall seams that show signs of cracking"
            checked={!!progress["seals"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="damage"
            label="Check for and repair any exterior damage (cracks, chips, delamination)"
            checked={!!progress["damage"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="wax"
            label="Apply wax to fiberglass or painted surfaces for extended protection"
            checked={!!progress["wax"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="plastic"
            label="Cover or protect exterior plastic components from UV damage"
            checked={!!progress["plastic"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="accessories"
            label="Remove any exterior accessories that can be detached and store separately"
            checked={!!progress["accessories"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Covering">
          <ChecklistItem
            id="cover"
            label="Consider a breathable RV cover designed for indoor storage (prevents dust)"
            checked={!!progress["cover"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="secure"
            label="If using a cover, ensure it's properly secured but not tight against surfaces"
            checked={!!progress["secure"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="padding"
            label="Place padding over sharp edges to prevent cover damage"
            checked={!!progress["padding"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
          />
          <ChecklistItem
            id="vents"
            label="Ensure any vents or air circulation points aren't completely sealed by the cover"
            checked={!!progress["vents"]}
            onCheckedChange={(id, checked) => handleCheckboxChange(id, checked)}
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

export default ExteriorTab;
