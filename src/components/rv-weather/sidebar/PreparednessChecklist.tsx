
import React from "react";
import { TypographyH4 } from "@/components/ui/typography";
import { CheckSquare } from "lucide-react";

const PreparednessChecklist = () => {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-b from-connectivity-darkBg to-[#131a2a] border border-[#1a202c]">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="h-5 w-5 text-connectivity-accent" />
        <TypographyH4 className="border-none">Weather Preparedness</TypographyH4>
      </div>
      
      <ul className="space-y-2 text-sm text-light-blue">
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span>Download weather apps before traveling</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span>Create emergency contact list</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span>Pack emergency weather supplies</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span>Know your RV's wind resistance limits</span>
        </li>
        <li className="flex items-start gap-2">
          <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5]"></div>
          <span>Review evacuation routes for each stay</span>
        </li>
      </ul>
    </div>
  );
};

export default PreparednessChecklist;
