import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: { id: number }[];
}

const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`w-3 h-3 rounded-full ${
              step.id === currentStep
                ? "bg-[#60A5FA]"
                : step.id < currentStep
                ? "bg-green-400"
                : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-white">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};

export default StepIndicator;