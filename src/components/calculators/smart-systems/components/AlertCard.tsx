import { AlertCircle, Bell, Info } from "lucide-react";
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
  );
};