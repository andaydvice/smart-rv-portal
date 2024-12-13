import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Bell, Info, MessageCircle } from "lucide-react";

interface AlertInfo {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  steps: string[];
}

const alertDatabase: Record<string, AlertInfo> = {
  "BAT_LOW": {
    title: "Low Battery Warning",
    description: "Battery level has dropped below 20% capacity",
    severity: "high",
    steps: [
      "Connect to shore power if available",
      "Start generator if shore power unavailable",
      "Reduce power consumption by turning off non-essential systems",
      "Check battery connections for corrosion",
      "Monitor charging progress through control panel"
    ]
  },
  "WIFI_DISC": {
    title: "WiFi Disconnected",
    description: "Smart system has lost WiFi connectivity",
    severity: "medium",
    steps: [
      "Check if router is powered and functioning",
      "Verify you're within range of the WiFi network",
      "Restart router if necessary",
      "Ensure network credentials haven't changed",
      "Check for any physical damage to antenna"
    ]
  },
  "TEMP_HIGH": {
    title: "High Temperature Alert",
    description: "Internal temperature exceeds normal operating range",
    severity: "high",
    steps: [
      "Check air conditioning functionality",
      "Ensure all vents are unobstructed",
      "Close windows and doors if using AC",
      "Check for proper insulation",
      "Consider moving to shaded area if parked"
    ]
  },
  "WATER_LOW": {
    title: "Low Fresh Water",
    description: "Fresh water tank level below 15%",
    severity: "medium",
    steps: [
      "Locate nearest water fill station",
      "Check for leaks in water system",
      "Monitor usage until refill possible",
      "Consider conservation measures",
      "Verify sensor accuracy through manual check"
    ]
  },
  "GAS_DETECT": {
    title: "Gas Detection Alert",
    description: "Possible gas leak detected",
    severity: "high",
    steps: [
      "Immediately turn off all gas appliances",
      "Open windows and doors for ventilation",
      "Exit the RV if smell is present",
      "Contact emergency services if needed",
      "Schedule professional inspection before reuse"
    ]
  },
  "TANK_FULL": {
    title: "Grey/Black Tank Full",
    description: "Waste tank capacity reached 90%",
    severity: "medium",
    steps: [
      "Locate nearest dump station",
      "Reduce water usage until emptied",
      "Prepare sewer hose and connections",
      "Check tank sensor accuracy",
      "Plan route to dump station"
    ]
  },
  "SOLAR_FAULT": {
    title: "Solar System Error",
    description: "Solar charging system malfunction detected",
    severity: "medium",
    steps: [
      "Check solar panel connections",
      "Verify charge controller status",
      "Clean solar panels if dirty",
      "Test battery bank voltage",
      "Contact solar system specialist if persists"
    ]
  },
  "DOOR_OPEN": {
    title: "Door Open While Moving",
    description: "External door or compartment not properly secured",
    severity: "high",
    steps: [
      "Safely pull over when possible",
      "Check all external doors and compartments",
      "Verify door latch functionality",
      "Test door sensors",
      "Resume travel once secured"
    ]
  },
  "TIRE_PRESS": {
    title: "Tire Pressure Warning",
    description: "Abnormal tire pressure detected",
    severity: "high",
    steps: [
      "Check tire pressure when cool",
      "Inspect tires for damage",
      "Add air if needed to reach specifications",
      "Monitor pressure during travel",
      "Have tires inspected if issue persists"
    ]
  },
  "INVERTER_FAIL": {
    title: "Inverter System Failure",
    description: "Power inverter not functioning correctly",
    severity: "medium",
    steps: [
      "Check inverter display for error codes",
      "Verify battery voltage levels",
      "Reset inverter if possible",
      "Check for loose connections",
      "Contact technician if issue persists"
    ]
  }
};

const SmartAlertTranslator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredAlerts = Object.entries(alertDatabase).filter(([code, alert]) =>
    code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: AlertInfo["severity"]) => {
    switch (severity) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getSeverityIcon = (severity: AlertInfo["severity"]) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "medium":
        return <Bell className="w-5 h-5 text-yellow-400" />;
      case "low":
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <MessageCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-[#091020] border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#60A5FA]" />
          <CardTitle className="text-xl text-[#60A5FA]">Smart Alert Translator</CardTitle>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Search and understand RV system alerts and learn how to resolve them
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          placeholder="Search alerts by code or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
        />
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(([code, alert]) => (
                <div
                  key={code}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {getSeverityIcon(alert.severity)}
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">Code: {code}</p>
                    </div>
                    <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()} Priority
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{alert.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">Resolution Steps:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {alert.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-400">{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                No alerts found matching your search
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SmartAlertTranslator;