export interface AlertInfo {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  steps: string[];
}