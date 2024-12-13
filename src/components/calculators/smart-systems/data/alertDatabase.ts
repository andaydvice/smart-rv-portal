import { AlertInfo } from '../types/AlertTypes';
import { electricalAlerts } from './alerts/electricalAlerts';
import { systemAlerts } from './alerts/systemAlerts';
import { mechanicalAlerts } from './alerts/mechanicalAlerts';
import { safetyAlerts } from './alerts/safetyAlerts';
import { maintenanceAlerts } from './alerts/maintenanceAlerts';

export const alertDatabase: Record<string, AlertInfo> = {
  ...electricalAlerts,
  ...systemAlerts,
  ...mechanicalAlerts,
  ...safetyAlerts,
  ...maintenanceAlerts
};