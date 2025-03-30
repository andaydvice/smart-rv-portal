
import { Facility } from '../types';

// Function to render rating stars
export const renderRatingStars = (rating: number): JSX.Element => {
  return (
    <div className="flex items-center mt-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i} 
          className={i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        >★</span>
      ))}
      <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
    </div>
  );
};

// Function to ensure markers remain visible
export const forceMarkersVisible = (markersRef: React.MutableRefObject<google.maps.Marker[]>): void => {
  markersRef.current.forEach(marker => {
    const markerIcon = marker.getIcon();
    if (markerIcon) {
      // Type guard to check if the icon is an object with a url property
      const iconUrl = typeof markerIcon === 'object' && 'url' in markerIcon 
        ? markerIcon.url as string 
        : null;
        
      if (iconUrl) {
        // Ensure marker visibility through DOM manipulation if needed
        const el = document.querySelector(`.gm-style img[src="${iconUrl}"]`);
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.display = 'block';
        }
      }
    }
  });
};
