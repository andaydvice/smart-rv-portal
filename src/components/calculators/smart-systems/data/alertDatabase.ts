import { AlertInfo } from '../types/AlertTypes';

export const alertDatabase: Record<string, AlertInfo> = {
  "BAT_LOW": {
    title: "Low Battery Warning",
    description: "Battery level has dropped below 20% capacity",
    severity: "high",
    steps: [
      "Connect to shore power using a surge protector rated for 50 amp service",
      "Start generator and verify proper voltage output (120V AC)",
      "Minimize power draw by shutting down air conditioning, water heater, and other high consumption devices",
      "Clean battery terminals and verify connections are torqued to manufacturer specifications",
      "Monitor charging system voltage and current through inverter display panel"
    ]
  },
  "WIFI_DISC": {
    title: "WiFi Disconnected",
    description: "Smart system has lost WiFi connectivity",
    severity: "medium",
    steps: [
      "Verify router power supply voltage and LED status indicators",
      "Check signal strength meter and relocate within 100 feet of access point",
      "Power cycle router and wait 2 minutes for full restart sequence",
      "Access router configuration page to confirm network SSID and security settings",
      "Inspect antenna connections and verify proper mounting orientation"
    ]
  },
  "TEMP_HIGH": {
    title: "High Temperature Alert",
    description: "Internal temperature exceeds normal operating range",
    severity: "high",
    steps: [
      "Verify AC unit amperage draw and refrigerant pressure levels",
      "Clear all return air vents and verify proper airflow (minimum 350 CFM)",
      "Ensure all windows and doors have proper weatherstripping and seals",
      "Check roof insulation R value and inspect for thermal bridging",
      "Position RV to minimize sun exposure and deploy awnings for shade"
    ]
  },
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
  "SOLAR_FAULT": {
    title: "Solar System Error",
    description: "Solar charging system malfunction detected",
    severity: "medium",
    steps: [
      "Test all panel connections with multimeter for voltage and continuity",
      "Inspect charge controller display for specific error codes",
      "Remove debris and clean panels with appropriate solar cleaning solution",
      "Measure battery bank voltage under load and at rest",
      "Document system performance data for solar technician analysis"
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
  },
  "INVERTER_FAIL": {
    title: "Inverter System Failure",
    description: "Power inverter not functioning correctly",
    severity: "medium",
    steps: [
      "Record specific error codes from inverter display panel",
      "Test battery voltage under load (should maintain above 12.2V)",
      "Perform complete power cycle following manufacturer protocol",
      "Inspect all high current connections with thermal imaging",
      "Contact certified technician with documented error history"
    ]
  },
  "GEN_FAULT": {
    title: "Generator Malfunction",
    description: "Generator system reporting operational issues",
    severity: "high",
    steps: [
      "Check fuel quality and verify proper octane rating",
      "Test oil level and condition with dipstick when cool",
      "Document specific error codes from generator control panel",
      "Inspect air filter for proper flow and contamination",
      "Schedule maintenance with authorized generator service center"
    ]
  },
  "SLIDE_ERR": {
    title: "Slide Out Error",
    description: "Slide out mechanism encountering problems",
    severity: "medium",
    steps: [
      "Clear slide path and verify minimum 3 foot clearance",
      "Check hydraulic reservoir level and pressure readings",
      "Inspect slide seals for proper compression and wear",
      "Test battery voltage under slide operation (minimum 12V)",
      "Document slide movement and any unusual sounds"
    ]
  },
  "LEVELING_FAIL": {
    title: "Auto Leveling System Error",
    description: "Automatic leveling system malfunction",
    severity: "medium",
    steps: [
      "Verify ground stability with minimum 4000 lb bearing capacity",
      "Check hydraulic fluid level and condition in reservoir",
      "Perform system reset following manufacturer sequence",
      "Inspect jack mechanisms for proper extension and retraction",
      "Document error codes and system behavior for service"
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
  },
  "AWNING_WIND": {
    title: "High Wind Awning Alert",
    description: "Wind speed exceeds safe awning deployment limit",
    severity: "high",
    steps: [
      "Retract awning immediately when wind exceeds 20 mph",
      "Secure all outdoor furniture and accessories",
      "Monitor local weather radar for approaching systems",
      "Inspect awning arms and fabric for wind damage",
      "Wait for sustained winds below 15 mph before redeploying"
    ]
  },
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
