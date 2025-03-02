
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { RVInfoTabProps } from './ChecklistTypes';

const RVInfoTab: React.FC<RVInfoTabProps> = ({ 
  progress,
  startDate, 
  endDate, 
  setStartDate, 
  setEndDate,
  handleCheckboxChange 
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">RV INFORMATION</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner" className="text-gray-200">RV Owner</Label>
            <Input 
              id="owner" 
              className="bg-[#131a2a] border-gray-700 placeholder:text-gray-500 focus:border-[#5B9BD5]" 
              placeholder="Enter owner name" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model" className="text-gray-200">RV Make/Model</Label>
            <Input 
              id="model" 
              className="bg-[#131a2a] border-gray-700 placeholder:text-gray-500 focus:border-[#5B9BD5]" 
              placeholder="Enter make and model" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year" className="text-gray-200">Year</Label>
            <Input 
              id="year" 
              className="bg-[#131a2a] border-gray-700 placeholder:text-gray-500 focus:border-[#5B9BD5]" 
              placeholder="Enter year" 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vin" className="text-gray-200">VIN/Serial Number</Label>
            <Input 
              id="vin" 
              className="bg-[#131a2a] border-gray-700 placeholder:text-gray-500 focus:border-[#5B9BD5]" 
              placeholder="Enter VIN or serial number" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="length" className="text-gray-200">Length</Label>
            <Input 
              id="length" 
              className="bg-[#131a2a] border-gray-700 placeholder:text-gray-500 focus:border-[#5B9BD5]" 
              placeholder="Enter length" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-gray-200">Storage Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#131a2a] border-gray-700 text-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span className="text-gray-400">Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#131a2a] border-gray-700" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="text-white bg-[#131a2a]"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-gray-200">Expected Removal Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#131a2a] border-gray-700 text-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span className="text-gray-400">Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#131a2a] border-gray-700" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="text-white bg-[#131a2a]"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RVInfoTab;
