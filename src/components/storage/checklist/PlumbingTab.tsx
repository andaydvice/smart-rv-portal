
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const PlumbingTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">PLUMBING SYSTEM</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Tanks">
          <ChecklistItem
            id="fresh-water"
            label="Drain and flush fresh water tank completely"
            checked={!!progress["fresh-water"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="waste-tanks"
            label="Empty, flush, and clean black and gray water tanks"
            checked={!!progress["waste-tanks"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tank-valves"
            label="Leave black and gray tank valves open or closed per manufacturer guidelines"
            checked={!!progress["tank-valves"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="p-traps"
            label="Add RV antifreeze to all p-traps and toilet bowl"
            checked={!!progress["p-traps"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tank-sensors"
            label="Clean and verify tank level sensors are functioning properly"
            checked={!!progress["tank-sensors"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Water Heater & Lines">
          <ChecklistItem
            id="water-heater"
            label="Turn off water heater and let cool completely before draining"
            checked={!!progress["water-heater"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="drain-heater"
            label="Drain water heater tank using drain plug (not relief valve)"
            checked={!!progress["drain-heater"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="bypass"
            label="Set water heater bypass valve to bypass position (if equipped)"
            checked={!!progress["bypass"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="blow-lines"
            label="Blow out water lines using compressed air (30-40 PSI max)"
            checked={!!progress["blow-lines"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="antifreeze"
            label="Use non-toxic RV antifreeze in water system if stored in freezing temperatures"
            checked={!!progress["antifreeze"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Fixtures & Appliances">
          <ChecklistItem
            id="faucets"
            label="Open all faucets and drain lines, then close after draining"
            checked={!!progress["faucets"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="fixtures"
            label="Run antifreeze through all fixtures until pink color appears (if winterizing)"
            checked={!!progress["fixtures"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="toilet"
            label="Flush toilet and add antifreeze to bowl to prevent trap dry-out"
            checked={!!progress["toilet"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="ice-maker"
            label="Disconnect/winterize ice maker and water filtration systems"
            checked={!!progress["ice-maker"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="outside-shower"
            label="Drain and protect exterior shower and utility connections"
            checked={!!progress["outside-shower"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="antifreeze-type" className="text-gray-200">Antifreeze Type Used</Label>
            <Select>
              <SelectTrigger id="antifreeze-type" className="bg-[#131a2a] border-gray-700">
                <SelectValue placeholder="Select antifreeze type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None Used</SelectItem>
                <SelectItem value="rv-propylene">RV Propylene Glycol (Pink)</SelectItem>
                <SelectItem value="special">Special Formula Antifreeze</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="antifreeze-amount" className="text-gray-200">Antifreeze Quantity Used</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input 
                id="antifreeze-amount" 
                className="bg-[#131a2a] border-gray-700 col-span-2" 
                placeholder="Amount"
              />
              <Select defaultValue="gallons">
                <SelectTrigger className="bg-[#131a2a] border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gallons">Gallons</SelectItem>
                  <SelectItem value="liters">Liters</SelectItem>
                  <SelectItem value="quarts">Quarts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-opacity-20 bg-blue-900 rounded-md border border-blue-700 mt-4">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-400 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-medium">Important Water System Note</h4>
              <p className="text-gray-300 text-sm mt-1">
                Improperly winterized water systems can suffer expensive freeze damage. For RVs stored in freezing conditions, a professional winterization service is recommended unless you're experienced with the process.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="plumbing-notes" className="text-gray-200">Additional Plumbing Notes</Label>
          <Textarea 
            id="plumbing-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
            placeholder="Enter any additional notes about plumbing system preparation..." 
          />
        </div>
      </div>
    </>
  );
};

export default PlumbingTab;
