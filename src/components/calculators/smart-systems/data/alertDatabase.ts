import { AlertInfo } from '../types/AlertTypes';

export const alertDatabase: Record<string, AlertInfo> = {
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
  },
  "GEN_FAULT": {
    title: "Generator Malfunction",
    description: "Generator system reporting operational issues",
    severity: "high",
    steps: [
      "Check fuel level and quality",
      "Inspect oil level and condition",
      "Look for error codes on control panel",
      "Verify air filter condition",
      "Schedule maintenance if issues persist"
    ]
  },
  "SLIDE_ERR": {
    title: "Slide-Out Error",
    description: "Slide-out mechanism encountering problems",
    severity: "medium",
    steps: [
      "Check for obstacles in slide path",
      "Verify hydraulic fluid levels",
      "Inspect slide seals for damage",
      "Test battery voltage",
      "Contact RV technician if mechanism stuck"
    ]
  },
  "LEVELING_FAIL": {
    title: "Auto-Leveling System Error",
    description: "Automatic leveling system malfunction",
    severity: "medium",
    steps: [
      "Check ground stability and obstacles",
      "Verify hydraulic fluid levels",
      "Reset system through control panel",
      "Inspect jack mechanisms",
      "Use manual leveling if necessary"
    ]
  },
  "FRIDGE_TEMP": {
    title: "Refrigerator Temperature Alert",
    description: "Refrigerator temperature outside safe range",
    severity: "high",
    steps: [
      "Check power source (gas/electric)",
      "Verify door seal and closure",
      "Clean cooling fins if accessible",
      "Monitor food safety",
      "Contact appliance technician if persists"
    ]
  },
  "AWNING_WIND": {
    title: "High Wind Awning Alert",
    description: "Wind speed exceeds safe awning deployment limit",
    severity: "high",
    steps: [
      "Retract awning immediately",
      "Secure any loose outdoor items",
      "Monitor weather conditions",
      "Inspect awning for damage",
      "Wait for safe conditions before redeploying"
    ]
  }
};