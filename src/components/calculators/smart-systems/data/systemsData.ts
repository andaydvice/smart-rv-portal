import { SystemsData } from "../types/SystemTypes";

export const systemsData: SystemsData = {
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
    ],
    compatibleWith: ["climate-control", "security"],
    incompatibleWith: ["legacy-power"]
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
    ],
    compatibleWith: ["smart-power", "entertainment"],
    incompatibleWith: ["manual-thermostat"]
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
    ],
    compatibleWith: ["smart-power", "entertainment"],
    incompatibleWith: ["analog-cameras"]
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
    ],
    compatibleWith: ["climate-control", "security"],
    incompatibleWith: ["basic-av"]
  }
};
