import { AlertInfo } from '../../types/AlertTypes';

export const electricalAlerts: Record<string, AlertInfo> = {
  "VOLTAGE_DROP": {
    title: "Voltage Drop Detection",
    description: "System detected significant voltage fluctuation outside normal parameters",
    severity: "high",
    steps: [
      "Monitor voltage readings at distribution panel (acceptable range 114V to 126V AC)",
      "Verify shore power connection amperage matches RV requirements (30A or 50A)",
      "Inspect power cord for signs of damage or overheating",
      "Test voltage at pedestal to confirm campground power quality",
      "Document voltage readings under different load conditions"
    ]
  },
  "GROUND_FAULT": {
    title: "Ground Fault Circuit Issue",
    description: "Ground fault protection system has detected current leakage",
    severity: "high",
    steps: [
      "Immediately disconnect shore power and switch to battery backup",
      "Test each circuit individually using certified circuit analyzer",
      "Measure ground resistance (should be less than 25 ohms)",
      "Inspect all outdoor electrical connections for moisture intrusion",
      "Verify GFCI breaker operation with calibrated test equipment"
    ]
  },
  "INVERTER_OVERLOAD": {
    title: "Inverter System Overload",
    description: "Power draw exceeds inverter capacity",
    severity: "high",
    steps: [
      "Record current power consumption using amp meter at main panel",
      "Calculate total connected load (should not exceed 80% of inverter rating)",
      "Identify and disconnect non essential loads until system stabilizes",
      "Monitor inverter temperature and cooling system operation",
      "Verify battery bank voltage under load conditions"
    ]
  },
  "NEUTRAL_BOND": {
    title: "Neutral Bonding Issue",
    description: "Improper neutral to ground bonding detected",
    severity: "high",
    steps: [
      "Conduct complete electrical isolation test at transfer switch",
      "Verify proper neutral ground bonding at service entrance only",
      "Test for voltage presence between neutral and ground (should read 0V)",
      "Inspect transfer switch operation and connections",
      "Document all neutral and ground connection points"
    ]
  },
  "SURGE_EVENT": {
    title: "Power Surge Detection",
    description: "Voltage surge protection system activated",
    severity: "medium",
    steps: [
      "Check surge protector status indicators and record event data",
      "Inspect connected equipment for signs of damage",
      "Test outlet polarity and grounding at all receptacles",
      "Verify surge protector sacrificial component status",
      "Document surge event timing and duration"
    ]
  },
  "BATTERY_BALANCE": {
    title: "Battery Bank Imbalance",
    description: "Voltage variation detected across battery bank",
    severity: "medium",
    steps: [
      "Measure individual battery voltages (variation should not exceed 0.1V)",
      "Test specific gravity in each cell of flooded batteries",
      "Record charging system voltage and current output",
      "Verify battery interconnection resistance (less than 0.1 ohm)",
      "Monitor battery temperature distribution across bank"
    ]
  },
  "AC_FREQUENCY": {
    title: "AC Frequency Deviation",
    description: "AC power frequency outside normal range",
    severity: "high",
    steps: [
      "Monitor AC frequency (should maintain 60Hz ±0.5Hz)",
      "Test generator governor adjustment if applicable",
      "Verify transfer switch frequency sensing operation",
      "Document frequency variations under different loads",
      "Inspect inverter frequency control systems"
    ]
  },
  "DC_RIPPLE": {
    title: "DC System Ripple",
    description: "Excessive AC ripple detected in DC system",
    severity: "medium",
    steps: [
      "Measure DC ripple voltage (should not exceed 100mV)",
      "Test all charging system diodes for proper operation",
      "Verify capacitor condition in charging circuits",
      "Monitor battery charging efficiency and temperature",
      "Record ripple measurements at various charge states"
    ]
  }
};