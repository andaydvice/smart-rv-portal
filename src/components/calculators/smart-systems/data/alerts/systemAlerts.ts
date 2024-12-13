import { AlertInfo } from '../../types/AlertTypes';

export const systemAlerts: Record<string, AlertInfo> = {
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
  }
};