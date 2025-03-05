
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Save, RotateCcw, Printer, FileDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChecklistHeaderProps {
  completionPercentage: number;
  lastSavedAt: Date | null;
  getLastSavedMessage: () => string;
  onSave: () => void;
  onReset: () => void;
  onPrint: () => void;
  onExportPDF: () => void; // New prop for PDF export
  isSaving: boolean;
}

const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({
  completionPercentage,
  lastSavedAt,
  getLastSavedMessage,
  onSave,
  onReset,
  onPrint,
  onExportPDF, // New prop for PDF export
  isSaving
}) => {
  return (
    <CardHeader className="pb-4 border-b border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">RV Storage Preparation Checklist</h2>
          <p className="text-[#E2E8FF] text-opacity-80 mt-1">{getLastSavedMessage()}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-700 hover:bg-[#151A22] hover:text-white"
                disabled={isSaving}
                onClick={onSave}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your progress</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-700 hover:bg-[#151A22] hover:text-white"
                onClick={onReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset all progress</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-700 hover:bg-[#151A22] hover:text-white"
                onClick={onPrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print checklist</p>
            </TooltipContent>
          </Tooltip>
          
          {/* New PDF export button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-700 hover:bg-[#151A22] hover:text-[#5B9BD5]"
                onClick={onExportPDF}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as PDF</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#5B9BD5]">Completion</span>
          <span className="text-sm font-medium text-white">{Math.round(completionPercentage)}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2 bg-gray-800" indicatorClassName="bg-[#5B9BD5]" />
      </div>
    </CardHeader>
  );
};

export default ChecklistHeader;
