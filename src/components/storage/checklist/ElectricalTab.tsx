import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const ElectricalTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  // Update state initialization to handle the type correctly
  // First check if the value is a string, otherwise use empty string
  const [batteryType, setBatteryType] = React.useState<string>(() => {
    const savedValue = progress["battery-type"];
    return typeof savedValue === 'string' ? savedValue : '';
  });
  
  // Handle battery type change
  const handleBatteryTypeChange = (value: string) => {
    setBatteryType(value);
    // Use the same handleCheckboxChange function to store the battery type
    handleCheckboxChange("battery-type", value as any);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">ELECTRICAL SYSTEM</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Batteries">
          <ChecklistItem
            id="battery-clean"
            label="Clean battery terminals and connections"
            checked={!!progress["battery-clean"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="battery-disconnect"
            label="Disconnect batteries or turn off battery disconnect switch"
            checked={!!progress["battery-disconnect"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="battery-remove"
            label="Consider removing batteries for separate storage in climate-controlled environment"
            checked={!!progress["battery-remove"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="battery-charge"
            label="Fully charge batteries before storage"
            checked={!!progress["battery-charge"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="battery-maintenance"
            label="For lead-acid batteries: check water levels and top off if needed"
            checked={!!progress["battery-maintenance"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Power Systems">
          <ChecklistItem
            id="breakers"
            label="Turn off all circuit breakers"
            checked={!!progress["breakers"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="inverter"
            label="Turn off inverter and converter"
            checked={!!progress["inverter"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="power-cord"
            label="Unplug shore power cord, clean connections, and store properly"
            checked={!!progress["power-cord"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="solar"
            label="Cover solar panels or disconnect if possible"
            checked={!!progress["solar"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="generator"
            label="Follow manufacturer procedures for generator storage"
            checked={!!progress["generator"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Appliances & Electronics">
          <ChecklistItem
            id="unplug"
            label="Unplug all electronics and small appliances"
            checked={!!progress["unplug"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="antennas"
            label="Lower and secure TV/satellite antennas"
            checked={!!progress["antennas"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="remove-batteries"
            label="Remove batteries from remotes, clocks, and detectors"
            checked={!!progress["remove-batteries"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tv-secure"
            label="Secure or remove TV and other mounted electronics"
            checked={!!progress["tv-secure"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="humidity-electronics"
            label="Consider using electronics-safe desiccants near sensitive equipment"
            checked={!!progress["humidity-electronics"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="p-4 bg-opacity-20 bg-amber-900 rounded-md border border-amber-700 mt-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-amber-400 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-amber-400 font-medium">Battery Storage Warning</h4>
              <p className="text-gray-300 text-sm mt-1">
                Batteries can lose charge over time even when disconnected. For long-term storage (3+ months), consider 
                a battery maintenance charger or periodic charging every 1-2 months to prevent permanent battery damage.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="battery-type" className="text-gray-200">Main House Battery Type</Label>
          <Select 
            value={batteryType} 
            onValueChange={handleBatteryTypeChange}
          >
            <SelectTrigger id="battery-type" className="bg-[#131a2a] border-gray-700 text-white">
              <SelectValue placeholder="Select battery type" />
            </SelectTrigger>
            <SelectContent className="bg-[#131a2a] border-gray-700">
              <SelectItem value="lead-acid" className="text-white">Standard Lead Acid</SelectItem>
              <SelectItem value="agm" className="text-white">AGM (Absorbed Glass Mat)</SelectItem>
              <SelectItem value="gel" className="text-white">Gel Cell</SelectItem>
              <SelectItem value="lithium" className="text-white">Lithium Iron Phosphate (LiFePO4)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="electrical-notes" className="text-gray-200">Additional Electrical Notes</Label>
          <Textarea 
            id="electrical-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px] text-white" 
            placeholder="Enter any additional notes about electrical system preparation..." 
          />
        </div>
      </div>
    </>
  );
};

export default ElectricalTab;
