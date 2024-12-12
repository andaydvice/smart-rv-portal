import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Info, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SystemInfo {
  name: string;
  features: string[];
  commonIssues: string[];
}

const systemsData: Record<string, SystemInfo> = {
  "smart-power": {
    name: "Smart Power Management",
    features: [
      "Real time power consumption monitoring",
      "Automatic source switching between shore, solar, and generator power",
      "Load balancing to prevent circuit overload",
      "Battery health monitoring and alerts"
    ],
    commonIssues: [
      "System may need recalibration after battery replacement",
      "Connectivity issues can affect remote monitoring",
      "Sensor readings might drift over time requiring adjustment"
    ]
  },
  "climate-control": {
    name: "Smart Climate Control",
    features: [
      "Zone based temperature management",
      "Humidity monitoring and control",
      "Scheduled climate adjustments",
      "Energy efficient operation modes"
    ],
    commonIssues: [
      "Sensors may need periodic cleaning",
      "Temperature variations between zones",
      "System might need reboot after extended power loss"
    ]
  },
  "security": {
    name: "Smart Security System",
    features: [
      "Remote monitoring and alerts",
      "Motion detection with camera integration",
      "Door and window sensors",
      "GPS tracking capabilities"
    ],
    commonIssues: [
      "False alarms from pets or wind movement",
      "Battery backup system requires regular testing",
      "Camera night vision range may be affected by weather"
    ]
  },
  "entertainment": {
    name: "Smart Entertainment",
    features: [
      "Multi zone audio control",
      "Satellite TV integration",
      "Streaming service optimization",
      "Outdoor entertainment options"
    ],
    commonIssues: [
      "Signal strength varies by location",
      "System updates may affect saved settings",
      "Audio synchronization across zones"
    ]
  }
};

const SmartSystemDecoder = () => {
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSystemToggle = (systemId: string) => {
    console.log("Toggling system:", systemId);
    setSelectedSystems(current => {
      const updated = current.includes(systemId)
        ? current.filter(id => id !== systemId)
        : [...current, systemId];
      console.log("Updated selected systems:", updated);
      return updated;
    });

    toast({
      title: "System Selection Updated",
      description: `${systemsData[systemId].name} ${
        selectedSystems.includes(systemId) ? "removed from" : "added to"
      } your configuration`,
    });
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Smart System Decoder</CardTitle>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Select your RV's smart components from the checklist below to see detailed information about their features and common troubleshooting tips.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(systemsData).map(([systemId, system]) => (
            <div
              key={systemId}
              className="flex items-start space-x-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700"
            >
              <Checkbox
                id={systemId}
                checked={selectedSystems.includes(systemId)}
                onCheckedChange={() => handleSystemToggle(systemId)}
                className="mt-1"
              />
              <label
                htmlFor={systemId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {system.name}
              </label>
            </div>
          ))}
        </div>

        <ScrollArea className="h-[400px] rounded-md border border-gray-700 p-4">
          {selectedSystems.length > 0 ? (
            selectedSystems.map(systemId => {
              const system = systemsData[systemId];
              return (
                <div key={systemId} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-[#60A5FA] mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    {system.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                        {system.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        Common Issues
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                        {system.commonIssues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 py-8">
              Select one or more systems above to see detailed information
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SmartSystemDecoder;