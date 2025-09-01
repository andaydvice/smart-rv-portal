import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Info, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SystemDetails } from "./components/SystemDetails";
import { systemsData } from "./data/systemsData";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { useAuth } from "@/components/auth/AuthContext";

const SmartSystemDecoder = () => {
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const { toast } = useToast();
  const { saveCalculation, isAuthenticated } = useCalculatorHistory();

  const handleSystemToggle = (systemId: string) => {
    console.log("Toggling system:", systemId);
    setSelectedSystems(current => {
      const updated = current.includes(systemId)
        ? current.filter(id => id !== systemId)
        : [...current, systemId];
      console.log("Updated selected systems:", updated);
      
      // Check compatibility with other selected systems
      const newSystem = systemsData[systemId];
      const otherSystems = updated.filter(id => id !== systemId);
      
      otherSystems.forEach(otherId => {
        const otherSystem = systemsData[otherId];
        if (newSystem.incompatibleWith?.includes(otherId) || 
            otherSystem.incompatibleWith?.includes(systemId)) {
          toast({
            title: "Compatibility Warning",
            description: `${newSystem.name} may have compatibility issues with ${otherSystem.name}`,
            variant: "destructive"
          });
        }
      });
      
      return updated;
    });
  };

  const handleSaveCalculation = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your calculations",
        variant: "destructive"
      });
      return;
    }

    if (selectedSystems.length === 0) {
      toast({
        title: "No systems selected",
        description: "Please select at least one system to save",
        variant: "destructive"
      });
      return;
    }

    const inputs = { selectedSystems };
    const systemNames = selectedSystems.map(id => systemsData[id].name);
    const results = { selectedSystemNames: systemNames };
    
    saveCalculation({
      calculatorType: "smart_system_decoder",
      inputs,
      results
    });

    toast({
      title: "Configuration saved!",
      description: "Your smart system configuration has been saved to your history."
    });
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Smart System Compatibility Checker</CardTitle>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Select your RV's smart components to check their compatibility and see detailed information about features and common issues.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(systemsData).map(([systemId, system]) => (
            <div
              key={systemId}
              className="flex items-start space-x-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700 outer1"
            >
              <Checkbox
                id={systemId}
                checked={selectedSystems.includes(systemId)}
                onCheckedChange={() => handleSystemToggle(systemId)}
                className="mt-1"
              />
              <label
                htmlFor={systemId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inner1"
              >
                {system.name}
              </label>
            </div>
          ))}
        </div>

        {selectedSystems.length > 0 && (
          <div className="space-y-3">
            {isAuthenticated && (
              <Button
                onClick={handleSaveCalculation}
                className="w-full bg-[#5B9BD5] hover:bg-[#4A8BC2] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            )}
            {!isAuthenticated && (
              <p className="text-sm text-gray-400 text-center">
                Sign in to save your system configurations
              </p>
            )}
          </div>
        )}

        <ScrollArea className="h-[400px] rounded-md border border-gray-700 p-4">
          {selectedSystems.length > 0 ? (
            selectedSystems.map(systemId => (
              <SystemDetails 
                key={systemId}
                system={systemsData[systemId]}
                systemId={systemId}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              Select one or more systems above to see detailed compatibility information
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SmartSystemDecoder;
