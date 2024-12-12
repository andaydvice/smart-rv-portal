import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="bg-[#1E3A8A] !border-blue-400 !text-blue-100 hover:!bg-[#8B5CF6] hover:!border-[#8B5CF6] hover:!text-white active:!bg-[#7C3AED] focus:!ring-2 focus:!ring-purple-400 disabled:!bg-gray-700 disabled:!border-gray-600 disabled:!text-gray-400 transition-all"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="!bg-[#60A5FA] !text-white hover:!bg-[#8B5CF6] hover:!text-white active:!bg-[#7C3AED] focus:!ring-2 focus:!ring-purple-400 disabled:!bg-gray-700 disabled:!text-gray-400 transition-all"
      >
        {currentStep === totalSteps ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Complete
          </>
        ) : (
          <>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;