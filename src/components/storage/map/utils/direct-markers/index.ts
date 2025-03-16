
// Export types
export * from './types';

// Export core functionality
export { createDirectMarkers } from './directMarkerCreation';

// Export utility functions
export { 
  injectDirectMarkerStyles,
  applyMarkerStyling,
  applyPopupStyling
} from './styling';

export {
  createMarkerElement,
  removeExistingDirectMarkers,
  setupMarkerPositionUpdates
} from './marker';

export {
  createPopupElement,
  createPopupContent,
  addCloseButton,
  removeExistingDirectPopups,
  closeAllPopupsExcept
} from './popup';

export {
  setupMarkerClickEvent,
  setupDirectMarkerListeners
} from './eventListeners';
