import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Smartphone,
  Bluetooth, 
  WifiHigh,
  Power,
  Settings,
  Shield
} from "lucide-react";
import StepIndicator from "./setup-guide/StepIndicator";
import StepContent from "./setup-guide/StepContent";
import NavigationButtons from "./setup-guide/NavigationButtons";

const steps = [
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
        <StepIndicator
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />

        {currentStepData && (
          <StepContent
            step={currentStepData}
            showTroubleshooting={showTroubleshooting}
            toggleTroubleshooting={toggleTroubleshooting}
          />
        )}

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </CardContent>
    </Card>
  );
};

export default SetupGuideCreator;