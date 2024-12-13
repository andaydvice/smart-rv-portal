export interface SystemInfo {
  name: string;
  features: string[];
  commonIssues: string[];
  compatibleWith?: string[];
  incompatibleWith?: string[];
}

export interface SystemsData {
  [key: string]: SystemInfo;
}