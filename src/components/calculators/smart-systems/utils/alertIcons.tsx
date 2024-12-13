import React from 'react';
import { Zap, Shield, Settings, Wrench, Bell } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'electrical':
      return <Zap className="w-5 h-5 text-yellow-400" />;
    case 'safety':
      return <Shield className="w-5 h-5 text-red-400" />;
    case 'system':
      return <Settings className="w-5 h-5 text-blue-400" />;
    case 'maintenance':
      return <Wrench className="w-5 h-5 text-green-400" />;
    default:
      return <Bell className="w-5 h-5 text-purple-400" />;
  }
};

export const getAlertIcon = (code: string) => {
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