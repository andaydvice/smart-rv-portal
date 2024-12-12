import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import TroubleshootingTips from "./TroubleshootingTips";

interface StepContentProps {
  step: {
    icon: JSX.Element;
    title: string;
    description: string;
    troubleshooting: string[];
  };
  showTroubleshooting: boolean;
  toggleTroubleshooting: () => void;
}

const StepContent = ({
  step,
  showTroubleshooting,
  toggleTroubleshooting,
}: StepContentProps) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        {step.icon}
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
      </div>
      <p className="text-gray-100 mb-6">{step.description}</p>

      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          className="bg-[#1E3A8A] !border-blue-400 !text-blue-100 hover:!bg-[#8B5CF6] hover:!border-[#8B5CF6] hover:!text-white active:!bg-[#7C3AED] focus:!ring-2 focus:!ring-purple-400 disabled:!bg-gray-700 disabled:!border-gray-600 disabled:!text-gray-400 transition-all"
          onClick={toggleTroubleshooting}
        >
          {showTroubleshooting ? (
            <X className="w-4 h-4 mr-2" />
          ) : (
            <AlertCircle className="w-4 h-4 mr-2" />
          )}
          {showTroubleshooting ? "Hide Help" : "Need Help?"}
        </Button>
      </div>

      {showTroubleshooting && <TroubleshootingTips tips={step.troubleshooting} />}
    </div>
  );
};

export default StepContent;