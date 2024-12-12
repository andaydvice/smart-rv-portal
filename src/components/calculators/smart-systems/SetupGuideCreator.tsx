import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { 
  Smartphone, 
  Bluetooth, 
  WifiHigh, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  ArrowRight, 
  ArrowLeft,
  Power,
  Settings,
  Shield
} from "lucide-react";

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
    title: "Power Up System",
    description: "Ensure your RV's main power system and smart hub are properly powered on",
    icon: <Power className="w-6 h-6 text-red-400" />,
    troubleshooting: [
      "Check if the main power switch is in the ON position",
      "Verify all circuit breakers are properly set",
      "Ensure battery levels are sufficient for system operation",
      "Check for any loose power connections",
      "Verify the smart hub's power indicator light is on",
      "If using shore power, confirm proper connection"
    ]
  },
  {
    id: 2,
    title: "Enable Bluetooth",
    description: "Turn on Bluetooth on your smartphone and ensure your RV's smart system is in pairing mode",
    icon: <Bluetooth className="w-6 h-6 text-blue-400" />,
    troubleshooting: [
      "Make sure Bluetooth is enabled in your phone settings",
      "Verify RV system power is on and check the main circuit breaker",
      "Stay within 30 feet of the RV system",
      "Check if your phone's Bluetooth version is compatible (4.0 or higher required)",
      "Remove any previously paired devices that might interfere",
      "Try forgetting the device and re-pairing"
    ]
  },
  {
    id: 3,
    title: "Connect to WiFi",
    description: "Connect to your RV's WiFi network using the provided network name and password",
    icon: <WifiHigh className="w-6 h-6 text-green-400" />,
    troubleshooting: [
      "Check WiFi password carefully and ensure caps lock is not enabled",
      "Ensure you are selecting the correct network name (SSID)",
      "Reset RV router by unplugging for 30 seconds if connection fails",
      "Verify you're within range (usually 100 feet) of the WiFi router",
      "Check if other devices can connect to verify router functionality",
      "Try forgetting the network and reconnecting with fresh credentials"
    ]
  },
  {
    id: 4,
    title: "Install App",
    description: "Download and install the official RV companion app from your device's app store",
    icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    troubleshooting: [
      "Ensure you're downloading the official app from your device's app store",
      "Check if your device meets the minimum system requirements",
      "Clear enough storage space for the app installation",
      "Update your device's operating system if required",
      "If installation fails, try clearing app store cache",
      "Check internet connection stability during download"
    ]
  },
  {
    id: 5,
    title: "Initial Configuration",
    description: "Set up your RV profile and customize system settings according to your preferences",
    icon: <Settings className="w-6 h-6 text-orange-400" />,
    troubleshooting: [
      "Complete all required fields in the profile setup",
      "Ensure date and time settings are correct",
      "Configure temperature units (Fahrenheit/Celsius)",
      "Set up notification preferences",
      "Verify all connected devices are properly named",
      "Test basic system controls after configuration"
    ]
  },
  {
    id: 6,
    title: "Security Setup",
    description: "Configure security settings and access controls for your RV's smart system",
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    troubleshooting: [
      "Create a strong password for system access",
      "Set up two-factor authentication if available",
      "Configure guest access settings if needed",
      "Review and set security notification preferences",
      "Test emergency shutdown procedures",
      "Document all security credentials safely"
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
            <p className="text-gray-100 mb-6">{currentStepData.description}</p>

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

            {showTroubleshooting && (
              <ScrollArea className="h-[200px] mt-4 rounded-md border border-gray-700 p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Info className="w-4 h-4" />
                    <h4 className="font-medium">Troubleshooting Tips</h4>
                  </div>
                  <ul className="space-y-2">
                    {currentStepData.troubleshooting.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-100">
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
            className="bg-[#1E3A8A] !border-blue-400 !text-blue-100 hover:!bg-[#8B5CF6] hover:!border-[#8B5CF6] hover:!text-white active:!bg-[#7C3AED] focus:!ring-2 focus:!ring-purple-400 disabled:!bg-gray-700 disabled:!border-gray-600 disabled:!text-gray-400 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="!bg-[#60A5FA] !text-white hover:!bg-[#8B5CF6] hover:!text-white active:!bg-[#7C3AED] focus:!ring-2 focus:!ring-purple-400 disabled:!bg-gray-700 disabled:!text-gray-400 transition-all"
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
