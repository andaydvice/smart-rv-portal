
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const SecurityTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">SECURITY</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Physical Security">
          <ChecklistItem
            id="hitch-lock"
            label="Install a hitch lock or coupler lock (for travel trailers)"
            checked={!!progress["hitch-lock"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="wheel-locks"
            label="Use wheel locks or tire boots"
            checked={!!progress["wheel-locks"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="door-locks"
            label="Ensure all doors and windows are locked securely"
            checked={!!progress["door-locks"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="deadbolts"
            label="Install additional deadbolts if possible"
            checked={!!progress["deadbolts"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="steering-lock"
            label="Use steering wheel lock (for motorhomes)"
            checked={!!progress["steering-lock"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Electronic Security">
          <ChecklistItem
            id="alarm-system"
            label="Set alarm system if equipped"
            checked={!!progress["alarm-system"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tracking-device"
            label="Consider installing a GPS tracking device"
            checked={!!progress["tracking-device"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="motion-lights"
            label="Add motion-activated lights (if facility allows)"
            checked={!!progress["motion-lights"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="cameras"
            label="Install wireless cameras with remote monitoring capability"
            checked={!!progress["cameras"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="battery-sensors"
            label="Consider battery-operated door/window sensors that alert your phone"
            checked={!!progress["battery-sensors"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Documentation & Insurance">
          <ChecklistItem
            id="inventory"
            label="Create detailed inventory of items left in RV (with photos)"
            checked={!!progress["inventory"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="insurance-check"
            label="Verify insurance coverage for stored RV"
            checked={!!progress["insurance-check"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="facility-agreement"
            label="Understand storage facility security measures and access policies"
            checked={!!progress["facility-agreement"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="remove-documents"
            label="Remove all vehicle registration and personal documents"
            checked={!!progress["remove-documents"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="emergency-contact"
            label="Provide emergency contact information to storage facility"
            checked={!!progress["emergency-contact"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="p-4 bg-opacity-20 bg-blue-900 rounded-md border border-blue-700 mt-4">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="text-blue-400 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-medium">Security Recommendation</h4>
              <p className="text-gray-300 text-sm mt-1">
                Layer multiple security measures for best protection. A physical deterrent (like wheel locks) combined 
                with electronic monitoring provides comprehensive security. Also consider removing or hiding the RV's 
                battery disconnect switch to prevent easy starting and theft of motorhomes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="security-notes" className="text-gray-200">Additional Security Notes</Label>
          <Textarea 
            id="security-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
            placeholder="Enter any additional notes about security measures..." 
          />
        </div>
      </div>
    </>
  );
};

export default SecurityTab;
