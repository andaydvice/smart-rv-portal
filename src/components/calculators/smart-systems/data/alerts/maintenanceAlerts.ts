import { AlertInfo } from '../../types/AlertTypes';

export const maintenanceAlerts: Record<string, AlertInfo> = {
  "WATER_LOW": {
    title: "Low Fresh Water",
    description: "Fresh water tank level below 15%",
    severity: "medium",
    steps: [
      "Locate water fill station with appropriate pressure regulator (40 60 PSI)",
      "Inspect water system for pressure drops indicating potential leaks",
      "Calculate remaining gallons based on tank capacity and usage rate",
      "Implement water saving devices on faucets and showerheads",
      "Calibrate tank sensors using manual measurement verification"
    ]
  },
  "TANK_FULL": {
    title: "Grey/Black Tank Full",
    description: "Waste tank capacity reached 90%",
    severity: "medium",
    steps: [
      "Locate dump station with proper sewer connection adapters",
      "Implement water conservation protocols until tanks are emptied",
      "Prepare sewer hose system with proper slope (1/4 inch per foot)",
      "Verify tank level accuracy using multiple sensor readings",
      "Map route to nearest dump station considering vehicle height and weight"
    ]
  },
  "FRIDGE_TEMP": {
    title: "Refrigerator Temperature Alert",
    description: "Refrigerator temperature outside safe range",
    severity: "high",
    steps: [
      "Verify power source and proper voltage (120V AC or 12V DC)",
      "Check door seal compression and alignment",
      "Clean condenser coils and verify proper airflow",
      "Monitor internal temperature with calibrated thermometer",
      "Schedule service if temperature exceeds 40°F for over 2 hours"
    ]
  }
};