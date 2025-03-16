
import { StorageFacility } from '../types';
import mapboxgl from 'mapbox-gl';

/**
 * Types for emergency marker functionality
 */

export interface EmergencyMarkerOptions {
  pulsing?: boolean;
  highlightColor?: string;
  size?: number;
  zIndex?: number;
}

export interface EmergencyPopupOptions {
  maxWidth?: number;
  minWidth?: number;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
  offset?: number;
}

export interface MarkerClickHandlerOptions {
  preventEdgeCutoff?: boolean;
  delay?: number;
  edgePadding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export type MarkerClickHandler = (facilityId: string, event?: MouseEvent) => void;
