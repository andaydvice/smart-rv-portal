import { AlertInfo } from '../../types/AlertTypes';

export const safetyAlerts: Record<string, AlertInfo> = {
  "GAS_DETECT": {
    title: "Gas Detection Alert",
    description: "Possible gas leak detected",
    severity: "high",
    steps: [
      "Immediately close LP gas valve at tank and verify solenoid operation",
      "Open all windows and roof vents to achieve complete air exchange",
      "Evacuate RV and maintain safe distance of at least 50 feet",
      "Contact emergency services if gas odor persists",
      "Schedule certified RV technician inspection of gas lines and connections"
    ]
  },
  "DOOR_OPEN": {
    title: "Door Open While Moving",
    description: "External door or compartment not properly secured",
    severity: "high",
    steps: [
      "Safely reduce speed and activate hazard lights",
      "Inspect all compartment and door latching mechanisms",
      "Test electronic door sensors and verify proper calibration",
      "Check door alignment and adjust hinges if necessary",
      "Verify proper operation of door monitoring system"
    ]
  },
  "TIRE_PRESS": {
    title: "Tire Pressure Warning",
    description: "Abnormal tire pressure detected",
    severity: "high",
    steps: [
      "Check cold tire pressure against manufacturer load rating charts",
      "Perform visual inspection for sidewall damage or foreign objects",
      "Adjust pressure to specifications based on actual loaded weight",
      "Document pressure changes over time for trend analysis",
      "Schedule professional tire inspection if pressure loss exceeds 2 PSI per day"
    ]
  }
};