import { AlertCircle, Bell, Info, Zap, Shield, Settings, Wrench } from "lucide-react";
import { AlertInfo } from "../types/AlertTypes";

interface AlertCardProps {
  code: string;
  alert: AlertInfo;
}

export const AlertCard = ({ code, alert }: AlertCardProps) => {
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

  const getAlertIcon = (code: string) => {
    if (code.startsWith("VOLTAGE_") || code.startsWith("GROUND_") || 
        code.startsWith("INVERTER_") || code.startsWith("NEUTRAL_") ||
        code.startsWith("SURGE_") || code.startsWith("BATTERY_") ||
        code.startsWith("AC_") || code.startsWith("DC_")) {
      return <Zap className="w-5 h-5 text-yellow-400" />;
    } else if (code.startsWith("GAS_") || code.startsWith("DOOR_") || 
               code.startsWith("TIRE_")) {
      return <Shield className="w-5 h-5 text-red-400" />;
    } else if (code.startsWith("WIFI_") || code.startsWith("TEMP_") ||
               code.startsWith("BAT_")) {
      return <Settings className="w-5 h-5 text-blue-400" />;
    } else if (code.startsWith("WATER_") || code.startsWith("TANK_") ||
               code.startsWith("FRIDGE_") || code.startsWith("SLIDE_") ||
               code.startsWith("LEVELING_")) {
      return <Wrench className="w-5 h-5 text-green-400" />;
    }
    return <Bell className="w-5 h-5 text-purple-400" />;
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
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2">
          {getAlertIcon(code)}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {getSeverityIcon(alert.severity)}
              {alert.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">Code: {code}</p>
          </div>
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
  );
};