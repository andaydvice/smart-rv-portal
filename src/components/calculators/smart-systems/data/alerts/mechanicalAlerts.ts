import { AlertInfo } from '../../types/AlertTypes';

export const mechanicalAlerts: Record<string, AlertInfo> = {
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
  }
};