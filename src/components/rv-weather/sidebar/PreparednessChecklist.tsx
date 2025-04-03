
import React from "react";
import { TypographyH4 } from "@/components/ui/typography";
import { CheckSquare } from "lucide-react";

const PreparednessChecklist = () => {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-b from-connectivity-darkBg to-[#131a2a] border border-[#1a202c]">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="h-5 w-5 text-connectivity-accent" />
        <TypographyH4 className="border-none text-white text-left">Weather Preparedness</TypographyH4>
      </div>
      
      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span className="text-light-blue text-left">Download weather apps before traveling</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span className="text-light-blue text-left">Create emergency contact list</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span className="text-light-blue text-left">Pack emergency weather supplies</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span className="text-light-blue text-left">Know your RV's wind resistance limits</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span className="text-light-blue text-left">Review evacuation routes for each stay</span>
        </li>
      </ul>
    </div>
  );
};

export default PreparednessChecklist;
