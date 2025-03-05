
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Printer, Save, RotateCcw, CheckSquare } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ChecklistHeaderProps {
  completionPercentage: number;
  lastSavedAt: string | null;
  getLastSavedMessage: () => string;
  onSave: () => void;
  onReset: () => void;
  onPrint: () => void;
  isSaving: boolean;
}

const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({
  completionPercentage,
  lastSavedAt,
  getLastSavedMessage,
  onSave,
  onReset,
  onPrint,
  isSaving
}) => {
  return (
    <CardHeader className="border-b border-gray-700 pb-6 bg-gradient-to-r from-[#0c1219] to-[#131a2a]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <CardTitle className="text-3xl font-bold text-white mb-2">COMPLETE GUIDE TO RV STORAGE PREPARATION</CardTitle>
          <CardDescription className="text-xl text-[#E2E8FF] font-light">Interactive Checklist for Extended Indoor Storage</CardDescription>
        </div>
        <div className="text-[#5B9BD5] font-bold text-xl">SMART RV</div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2 bg-[#151A22] hover:bg-[#1d2532] hover:text-white text-white border-gray-700 
            focus:text-white active:text-white focus:bg-[#1d2532] active:bg-[#1d2532] focus:border-[#5B9BD5] active:border-[#5B9BD5]"
            onClick={onSave}
            disabled={isSaving}
          >
            <Save size={16} className="text-[#5B9BD5]" />
            {isSaving ? 'Saving...' : 'Save Progress'}
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 bg-[#151A22] hover:bg-[#1d2532] hover:text-white text-white border-gray-700
            focus:text-white active:text-white focus:bg-[#1d2532] active:bg-[#1d2532] focus:border-[#5B9BD5] active:border-[#5B9BD5]"
            onClick={onPrint}
          >
            <Printer size={16} className="text-[#5B9BD5]" />
            Print
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 bg-[#151A22] hover:bg-[#1d2532] hover:text-white text-white border-gray-700
            focus:text-white active:text-white focus:bg-[#1d2532] active:bg-[#1d2532] focus:border-[#5B9BD5] active:border-[#5B9BD5]"
            onClick={onReset}
            disabled={isSaving}
          >
            <RotateCcw size={16} className="text-[#5B9BD5]" />
            Reset
          </Button>
        </div>
        
        <div className="flex items-center justify-between gap-3 ml-auto">
          {lastSavedAt && (
            <span className="text-xs text-[#E2E8FF] italic mr-3">
              {getLastSavedMessage()}
            </span>
          )}
          <div className="flex items-center gap-3 bg-[#151A22] py-2 px-3 rounded-md border border-gray-700">
            <CheckSquare size={18} className="text-[#10B981]" />
            <div className="flex flex-col">
              <span className="text-xs text-[#E2E8FF]">Completion</span>
              <span className="text-[#10B981] font-bold">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChecklistHeader;
