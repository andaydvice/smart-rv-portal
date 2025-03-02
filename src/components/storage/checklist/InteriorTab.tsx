
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const InteriorTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">INTERIOR PREPARATION</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Cleaning">
          <ChecklistItem
            id="int-surfaces"
            label="Thoroughly clean all interior surfaces"
            checked={!!progress["int-surfaces"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="vacuum"
            label="Vacuum and clean all upholstery and carpets"
            checked={!!progress["vacuum"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="cabinets"
            label="Clean and dry all cabinets, drawers, and closets"
            checked={!!progress["cabinets"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="bathroom"
            label="Clean and sanitize bathroom and shower areas"
            checked={!!progress["bathroom"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="fridge"
            label="Clean refrigerator and freezer thoroughly"
            checked={!!progress["fridge"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Moisture Control">
          <ChecklistItem
            id="desiccant"
            label="Place desiccant moisture absorbers in multiple locations"
            checked={!!progress["desiccant"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="cabinet-open"
            label="Leave cabinet doors and drawers slightly open for air circulation"
            checked={!!progress["cabinet-open"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="bedding"
            label="Remove all bedding and store separately"
            checked={!!progress["bedding"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="fridge-door"
            label="Leave refrigerator door propped slightly open (after defrosting)"
            checked={!!progress["fridge-door"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="dehumidifier"
            label="Consider a dehumidifier for long-term storage in humid climates"
            checked={!!progress["dehumidifier"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Remove & Store">
          <ChecklistItem
            id="food"
            label="Remove all food items, including canned goods and spices"
            checked={!!progress["food"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="toiletries"
            label="Remove all toiletries and personal care items"
            checked={!!progress["toiletries"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="perishables"
            label="Remove any plants, candles, or perishable decorative items"
            checked={!!progress["perishables"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="valuables"
            label="Remove valuables, electronics, and important documents"
            checked={!!progress["valuables"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="propane"
            label="Remove propane tanks if facility regulations permit"
            checked={!!progress["propane"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="space-y-2">
          <Label htmlFor="interior-notes" className="text-gray-200">Additional Interior Notes</Label>
          <Textarea 
            id="interior-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px] text-white placeholder:text-gray-500" 
            placeholder="Enter any additional notes about interior preparation..." 
          />
        </div>
      </div>
    </>
  );
};

export default InteriorTab;
