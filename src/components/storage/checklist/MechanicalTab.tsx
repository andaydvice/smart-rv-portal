
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const MechanicalTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">MECHANICAL SYSTEMS</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Engine & Drivetrain (Motorhomes)">
          <ChecklistItem
            id="oil-change"
            label="Change oil and filter before storage"
            checked={!!progress["oil-change"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="fluids-top"
            label="Top off all fluids (coolant, transmission, brake, power steering)"
            checked={!!progress["fluids-top"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="fuel-stabilizer"
            label="Add fuel stabilizer and fill fuel tank"
            checked={!!progress["fuel-stabilizer"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="run-engine"
            label="Run engine for 15-20 minutes to circulate stabilized fuel"
            checked={!!progress["run-engine"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="run-generator"
            label="Run generator with stabilized fuel for 20-30 minutes"
            checked={!!progress["run-generator"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Chassis & Suspension">
          <ChecklistItem
            id="leveling"
            label="Position on level surface or use leveling jacks"
            checked={!!progress["leveling"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="chock"
            label="Properly chock wheels"
            checked={!!progress["chock"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="parking-brake"
            label="Set parking brake (or follow manufacturer recommendations)"
            checked={!!progress["parking-brake"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="transmission"
            label="Leave transmission in park or in gear as recommended"
            checked={!!progress["transmission"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="support"
            label="Consider additional chassis support for extended storage"
            checked={!!progress["support"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Slideouts & Hydraulics">
          <ChecklistItem
            id="slideout-clean"
            label="Clean and lubricate slideout mechanisms"
            checked={!!progress["slideout-clean"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="slideout-position"
            label="Position slideouts (in or out per manufacturer recommendation)"
            checked={!!progress["slideout-position"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="slideout-lock"
            label="Secure slideouts with manufacturer-approved locks if available"
            checked={!!progress["slideout-lock"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="hydraulic-levels"
            label="Check hydraulic fluid levels if applicable"
            checked={!!progress["hydraulic-levels"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="hydraulic-jacks"
            label="Clean and lubricate hydraulic jacks"
            checked={!!progress["hydraulic-jacks"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="space-y-2">
          <Label htmlFor="mechanical-notes" className="text-gray-200">Additional Mechanical Notes</Label>
          <Textarea 
            id="mechanical-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px] text-white placeholder:text-gray-500" 
            placeholder="Enter any additional notes about mechanical system preparation..." 
          />
        </div>
      </div>
    </>
  );
};

export default MechanicalTab;
