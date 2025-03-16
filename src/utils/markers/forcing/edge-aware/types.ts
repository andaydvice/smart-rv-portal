
/**
 * Type definitions for edge-aware marker utilities
 */

export interface EdgePadding {
  top: number;
  right: number; 
  bottom: number;
  left: number;
}

export interface MarkerPosition {
  x: number;
  y: number;
}

export type EdgeAwareClickHandler = (e: MouseEvent) => void;
