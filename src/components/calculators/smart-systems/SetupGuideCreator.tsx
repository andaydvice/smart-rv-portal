import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Smartphone, Bluetooth, WifiHigh, Check, X, AlertCircle, Info, ArrowRight, ArrowLeft } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  troubleshooting: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Enable Bluetooth",
    description: "Turn on Bluetooth on your smartphone and ensure your RV's smart system is powered on",
    icon: <Bluetooth className="w-6 h-6 text-blue-400" />,
    troubleshooting: [
      "Make sure Bluetooth is enabled in your phone settings",
      "Verify RV system power is on",
      "Stay within 30 feet of the RV system"
    ]
  },
  {
    id: 2,
    title: "Connect to WiFi",
    description: "Connect to your RV's WiFi network using the provided network name and password",
    icon: <WifiHigh className="w-6 h-6 text-green-400" />,
    troubleshooting: [
      "Check WiFi password carefully",
      "Ensure you are selecting the correct network name",
      "Reset RV router if connection fails"
    ]
  },
  {
    id: 3,
    title: "Pair Device",
    description: "Open your RV's companion app and follow the pairing instructions",
    icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    troubleshooting: [
      "Download latest version of RV companion app",
      "Allow all requested permissions",
      "Try force closing and reopening the app"
    ]
  }
];

const SetupGuideCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const { toast } = useToast();

  const currentStepData = steps.find(step => step.id === currentStep);

  const handleNext = () => {
    console.log("Moving to next step:", currentStep + 1);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setShowTroubleshooting(false);
      toast({
        title: "Step Complete",
        description: "Moving to next step",
      });
    }
  };

  const handlePrevious = () => {
    console.log("Moving to previous step:", currentStep - 1);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowTroubleshooting(false);
    }
  };

  const toggleTroubleshooting = () => {
    console.log("Toggling troubleshooting view");
    setShowTroubleshooting(!showTroubleshooting);
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Setup Guide Creator</CardTitle>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Follow this interactive guide to connect your smartphone to your RV's smart systems
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
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
            Step {currentStep} of {steps.length}
          </span>
        </div>

        {currentStepData && (
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              {currentStepData.icon}
              <h3 className="text-lg font-semibold text-white">
                {currentStepData.title}
              </h3>
            </div>
            <p className="text-gray-300 mb-6">{currentStepData.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA]/10"
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

            {showTroubleshooting && (
              <ScrollArea className="h-[200px] mt-4 rounded-md border border-gray-700 p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Info className="w-4 h-4" />
                    <h4 className="font-medium">Troubleshooting Tips</h4>
                  </div>
                  <ul className="space-y-2">
                    {currentStepData.troubleshooting.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Check className="w-4 h-4 mt-1 text-green-400" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollArea>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="bg-[#60A5FA] text-white hover:bg-[#60A5FA]/90"
          >
            {currentStep === steps.length ? (
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
      </CardContent>
    </Card>
  );
};

export default SetupGuideCreator;