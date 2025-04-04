
import React from "react";
import { TypographyH4 } from "@/components/ui/typography";
import { CheckSquare } from "lucide-react";

const PreparednessChecklist = () => {
  return (
    <div className="p-6 rounded-lg bg-white border border-[#e2e8f0] shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="h-5 w-5 text-[#3b82f6]" />
        <TypographyH4 className="border-none text-[#1a202c] text-left">Weather Preparedness</TypographyH4>
      </div>
      
      <ul className="space-y-3 text-sm">
        <li className="flex items-start">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#3b82f6] flex-shrink-0"></div>
          <span className="ml-2 text-[#4a5568] text-left">Download weather apps before traveling</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#3b82f6] flex-shrink-0"></div>
          <span className="ml-2 text-[#4a5568] text-left">Create emergency contact list</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#3b82f6] flex-shrink-0"></div>
          <span className="ml-2 text-[#4a5568] text-left">Pack emergency weather supplies</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#3b82f6] flex-shrink-0"></div>
          <span className="ml-2 text-[#4a5568] text-left">Know your RV's wind resistance limits</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#3b82f6] flex-shrink-0"></div>
          <span className="ml-2 text-[#4a5568] text-left">Review evacuation routes for each stay</span>
        </li>
      </ul>
    </div>
  );
};

export default PreparednessChecklist;
