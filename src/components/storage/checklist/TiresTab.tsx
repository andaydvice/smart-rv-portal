
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity } from "lucide-react";
import { ChecklistItem, ChecklistSection } from './ChecklistSection';
import { ChecklistTabProps } from './ChecklistTypes';

const TiresTab: React.FC<ChecklistTabProps> = ({ handleCheckboxChange, progress }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">TIRES & CHASSIS PREPARATION</h2>
      
      <div className="space-y-6">
        <ChecklistSection title="Tire Care">
          <ChecklistItem
            id="clean-tires"
            label="Clean tires thoroughly and allow to dry"
            checked={!!progress["clean-tires"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tire-pressure"
            label="Inflate tires to manufacturer's maximum cold pressure recommendation"
            checked={!!progress["tire-pressure"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tire-covers"
            label="Use tire covers to protect from UV damage"
            checked={!!progress["tire-covers"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tire-blocks"
            label="Consider tire cradles or blocks to prevent flat spots"
            checked={!!progress["tire-blocks"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="tire-rotation"
            label="Plan to rotate tires periodically during extended storage"
            checked={!!progress["tire-rotation"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <ChecklistSection title="Weight Distribution">
          <ChecklistItem
            id="weight-distribution"
            label="Ensure weight is properly distributed (not concentrated on any one area)"
            checked={!!progress["weight-distribution"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="axle-support"
            label="Consider additional support under axles for very long-term storage"
            checked={!!progress["axle-support"]}
            onCheckedChange={handleCheckboxChange}
          />
          <ChecklistItem
            id="level-position"
            label="Position RV as level as possible to prevent strain on frame and components"
            checked={!!progress["level-position"]}
            onCheckedChange={handleCheckboxChange}
          />
        </ChecklistSection>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Tire Pressure Record</h3>
          
          <Table className="border border-gray-700">
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="text-gray-200">Location</TableHead>
                <TableHead className="text-gray-200">Recommended PSI</TableHead>
                <TableHead className="text-gray-200">Storage PSI</TableHead>
                <TableHead className="text-gray-200">Date Checked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-t border-gray-700">
                <TableCell className="text-gray-300">Front Left</TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="Date" />
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-700">
                <TableCell className="text-gray-300">Front Right</TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="Date" />
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-700">
                <TableCell className="text-gray-300">Rear Left</TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="Date" />
                </TableCell>
              </TableRow>
              <TableRow className="border-t border-gray-700">
                <TableCell className="text-gray-300">Rear Right</TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="PSI" />
                </TableCell>
                <TableCell>
                  <Input className="bg-[#131a2a] border-gray-700 h-8" placeholder="Date" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 bg-opacity-20 bg-blue-900 rounded-md border border-blue-700 mt-4">
          <div className="flex items-start space-x-3">
            <Activity className="text-blue-400 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-medium">Tire Maintenance During Storage</h4>
              <p className="text-gray-300 text-sm mt-1">
                For storage longer than 3 months, consider moving the RV slightly every 90 days to prevent tire flat spots
                and redistribute weight. Keep tires at the manufacturer's maximum recommended pressure (usually found on
                the sidewall or in the owner's manual).
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tires-notes" className="text-gray-200">Additional Tire & Chassis Notes</Label>
          <Textarea 
            id="tires-notes" 
            className="bg-[#131a2a] border-gray-700 min-h-[100px]" 
            placeholder="Enter any additional notes about tires and chassis preparation..." 
          />
        </div>
      </div>
    </>
  );
};

export default TiresTab;
