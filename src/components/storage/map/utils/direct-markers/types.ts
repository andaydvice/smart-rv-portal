
import { StorageFacility } from '../../../types';

/**
 * Types for direct marker functionality
 */
export interface DirectMarkerOptions {
  size?: number;
  color?: string;
  borderColor?: string;
  zIndex?: number;
}

export interface DirectPopupOptions {
  maxWidth?: number;
  minWidth?: number;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
  offset?: number;
}

export interface DirectMarkerClickHandler {
  (facilityId: string, event: MouseEvent): void;
}
