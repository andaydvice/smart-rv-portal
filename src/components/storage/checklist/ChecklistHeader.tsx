
import React from 'react';
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Save, RotateCcw, CheckCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ChecklistHeaderProps {
  completionPercentage: number;
  lastSavedAt: string | null;
  getLastSavedMessage: () => string;
  onSave: () => void;
  onReset: () => void;
  onPrint: () => void;
  isSaving?: boolean;
}

const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({
  completionPercentage,
  lastSavedAt,
  getLastSavedMessage,
  onSave,
  onReset,
  onPrint,
  isSaving = false
}) => {
  console.log(`ChecklistHeader rendering with completion: ${completionPercentage}%`);
  
  // Force a valid number for percentage
  const safePercentage = typeof completionPercentage === 'number' && !isNaN(completionPercentage)
    ? Math.max(0, Math.min(completionPercentage, 100))
    : 0;
  
  return (
    <CardHeader className="p-6 border-b border-gray-700">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold text-white">RV Storage Preparation Checklist</h2>
          <p className="text-[#E2E8FF]">Track your progress as you prepare your RV for storage</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1" style={{ position: 'relative', width: '100%' }}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#E2E8FF]">Completion: {safePercentage}%</span>
              {lastSavedAt && (
                <span className="text-gray-400 text-xs">{getLastSavedMessage()}</span>
              )}
            </div>
            <div className="progress-container" style={{ position: 'relative', width: '100%', height: '8px' }}>
              <Progress 
                value={safePercentage} 
                className="h-2 bg-gray-700" 
                indicatorClassName="bg-[#60A5FA]" 
                style={{ height: '8px' }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 print:hidden">
          <Button 
            variant="outline" 
            className="bg-[#151A22] border-gray-700 text-white hover:bg-[#1d2532] hover:text-white"
            onClick={onSave}
            disabled={isSaving}
            style={{ visibility: 'visible', display: 'inline-flex' }}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-[#151A22] border-gray-700 text-white hover:bg-[#1d2532] hover:text-white"
            onClick={onPrint}
            disabled={isSaving}
            style={{ visibility: 'visible', display: 'inline-flex' }}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Checklist
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-[#151A22] border-gray-700 text-white hover:bg-[#1d2532] hover:text-white hover:border-red-500"
            onClick={onReset}
            disabled={isSaving}
            style={{ visibility: 'visible', display: 'inline-flex' }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          
          {safePercentage === 100 && (
            <div className="ml-auto flex items-center text-green-400">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span>Checklist Complete!</span>
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default ChecklistHeader;
