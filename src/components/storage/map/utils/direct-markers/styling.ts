
import mapboxgl from 'mapbox-gl';

/**
 * Injects CSS styles for direct markers
 */
export function injectDirectMarkerStyles(): void {
  if (document.getElementById('direct-marker-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'direct-marker-styles';
  style.textContent = `
    .direct-marker {
      width: 24px !important;
      height: 24px !important;
      border-radius: 50% !important;
      background-color: #F97316 !important;
      border: 2px solid white !important;
      box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
      transform: translate(-50%, -50%) !important;
      cursor: pointer !important;
      position: absolute !important;
      z-index: 9999 !important;
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      pointerEvents: auto !important;
    }
    
    .direct-popup {
      z-index: -9999 !important;
      position: absolute !important;
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.2s !important;
    }
    
    .direct-popup.visible,
    .direct-popup.clicked {
      z-index: 10000 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Applies styling to a marker element
 */
export function applyMarkerStyling(markerElement: HTMLElement, options?: {
  backgroundColor?: string;
  borderColor?: string;
  size?: number;
  zIndex?: number;
}): void {
  const {
    backgroundColor = '#F97316',
    borderColor = 'white',
    size = 24,
    zIndex = 9999
  } = options || {};
  
  markerElement.style.position = 'absolute';
  markerElement.style.backgroundColor = backgroundColor;
  markerElement.style.width = `${size}px`;
  markerElement.style.height = `${size}px`;
  markerElement.style.borderRadius = '50%';
  markerElement.style.border = `2px solid ${borderColor}`;
  markerElement.style.cursor = 'pointer';
  markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  markerElement.style.zIndex = zIndex.toString();
  markerElement.style.transform = 'translate(-50%, -50%)';
  markerElement.style.visibility = 'visible';
  markerElement.style.display = 'block';
  markerElement.style.opacity = '1';
  markerElement.style.pointerEvents = 'auto';
}

/**
 * Applies styling to a popup element
 */
export function applyPopupStyling(popupElement: HTMLElement, options?: {
  backgroundColor?: string;
  textColor?: string;
  minWidth?: number;
  maxWidth?: number;
}): void {
  const {
    backgroundColor = '#131a2a',
    textColor = 'white',
    minWidth = 220,
    maxWidth = 300
  } = options || {};
  
  popupElement.style.position = 'absolute';
  popupElement.style.transform = 'translate(-50%, -100%)';
  popupElement.style.backgroundColor = backgroundColor;
  popupElement.style.color = textColor;
  popupElement.style.padding = '12px';
  popupElement.style.borderRadius = '4px';
  popupElement.style.minWidth = `${minWidth}px`;
  popupElement.style.maxWidth = `${maxWidth}px`;
  popupElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  popupElement.style.zIndex = '10000';
  popupElement.style.display = 'none';
  popupElement.style.visibility = 'hidden';
  popupElement.style.pointerEvents = 'auto';
}
