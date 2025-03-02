
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bug } from "lucide-react";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const PestControlTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">PEST CONTROL</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Prevention">
          <ChecklistItem
            id="seal-openings"
            label="Seal all potential entry points (even tiny gaps) with steel wool or sealant"
            checked={!!progress["seal-openings"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="check-underneath"
            label="Inspect and seal underneath RV where pipes and wires enter"
            checked={!!progress["check-underneath"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="ultrasonic"
            label="Consider installing ultrasonic pest repellers"
            checked={!!progress["ultrasonic"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="mouse-traps"
            label="Place mouse traps in strategic locations"
            checked={!!progress["mouse-traps"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="no-food"
            label="Ensure absolutely no food remains in RV (check all cabinets and drawers)"
            checked={!!progress["no-food"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Deterrents">
          <ChecklistItem
            id="mothballs"
            label="Place natural deterrents like peppermint oil, dryer sheets, or cedar"
            checked={!!progress["mothballs"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="cover-upholstery"
            label="Consider covering upholstery with plastic to protect from insects"
            checked={!!progress["cover-upholstery"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="fabric-softener"
            label="Place fabric softener sheets in cabinets, drawers, and closets"
            checked={!!progress["fabric-softener"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="insect-spray"
            label="Apply insect barrier spray around entry points and perimeter"
            checked={!!progress["insect-spray"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="floor-check"
            label="Inspect for soft spots in floor that might indicate previous pest damage"
            checked={!!progress["floor-check"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Monitoring">
          <ChecklistItem
            id="regular-checks"
            label="Plan for regular checks during storage (at least monthly if possible)"
            checked={!!progress["regular-checks"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="refresh-deterrents"
            label="Schedule to refresh deterrents every 30-60 days"
            checked={!!progress["refresh-deterrents"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="check-traps"
            label="Check and reset traps regularly"
            checked={!!progress["check-traps"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="p-4 bg-opacity-20 bg-green-900 rounded-md border border-green-700 mt-4">
          <div className="flex items-start space-x-3">
            <Bug className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-green-400 font-medium">Natural Pest Control Options</h4>
              <p className="text-gray-300 text-sm mt-1">
                Many RV owners prefer natural pest control methods over chemical options. Peppermint oil, cedar blocks, 
                and cloves are effective natural deterrents. For maximum effectiveness, place these throughout the RV, 
                focusing on entry points, storage areas, and dark corners.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pest-products" className="text-gray-200">Pest Control Products Used</Label>
          <Select>
            <SelectTrigger id="pest-products" className="bg-[#131a2a] border-gray-700">
              <SelectValue placeholder="Select primary pest control method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="natural">Natural Deterrents Only</SelectItem>
              <SelectItem value="traps">Traps & Monitoring Devices</SelectItem>
              <SelectItem value="electronic">Electronic Repellers</SelectItem>
              <SelectItem value="chemical">Chemical Barriers/Sprays</SelectItem>
              <SelectItem value="professional">Professional Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pest-notes" className="text-gray-200">Additional Pest Control Notes</Label>
          <Textarea 
            id="pest-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
            placeholder="Enter any additional notes about pest control measures..." 
          />
        </div>
      </div>
    </>
  );
};

export default PestControlTab;
