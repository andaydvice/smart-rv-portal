/**
 * Image Optimization Utilities
 * Helpers for responsive images, lazy loading, and performance
 */

/**
 * Standard image dimensions for responsive breakpoints
 */
export const IMAGE_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultraWide: 1920,
} as const;

/**
 * Generate srcSet string for responsive images
 * @param baseUrl - Base image URL
 * @param widths - Array of widths to generate srcSet for
 * @returns srcSet string
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  // For now, we can't dynamically resize images from lovable-uploads
  // But we prepare the infrastructure for when we can
  // This will return the same URL for all sizes until we have image processing
  return widths.map(width => `${baseUrl} ${width}w`).join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * @param type - Type of image (hero, card, thumbnail, etc.)
 * @returns sizes string
 */
export function generateSizes(type: 'hero' | 'card' | 'thumbnail' | 'full' | 'feature'): string {
  switch (type) {
    case 'hero':
      return '100vw';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw';
    case 'full':
      return '100vw';
    case 'feature':
      return '(max-width: 768px) 100vw, 50vw';
    default:
      return '100vw';
  }
}

/**
 * Common image dimensions for different use cases
 */
export const IMAGE_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  heroMobile: { width: 640, height: 400 },
  card: { width: 400, height: 300 },
  cardLarge: { width: 600, height: 400 },
  thumbnail: { width: 200, height: 150 },
  feature: { width: 800, height: 600 },
} as const;

/**
 * Get optimized image props for common scenarios
 * @param src - Image source URL
 * @param alt - Alt text
 * @param type - Type of image
 * @param priority - Whether to prioritize loading
 * @returns Optimized image props
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  type: 'hero' | 'card' | 'thumbnail' | 'feature' = 'card',
  priority: boolean = false
) {
  const dimensions = IMAGE_DIMENSIONS[type] || IMAGE_DIMENSIONS.card;

  return {
    src,
    alt,
    width: dimensions.width,
    height: dimensions.height,
    sizes: generateSizes(type),
    loading: priority ? ('eager' as const) : ('lazy' as const),
    priority,
  };
}

/**
 * Convert image URL to WebP URL
 * @param url - Original image URL
 * @returns WebP URL (for future use when we have WebP conversion)
 */
export function toWebP(url: string): string {
  // For now, return the original URL
  // In the future, this could point to a WebP version
  // e.g., url.replace(/\.(jpg|jpeg|png)$/, '.webp')
  return url;
}

/**
 * Check if an image should be prioritized based on its URL or usage
 * @param src - Image source URL
 * @returns Whether the image should be prioritized
 */
export function shouldPrioritizeImage(src: string): boolean {
  // Known critical images that should load immediately
  const criticalImages = [
    'f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d', // Hero section
    'rv-technology-tools-hero',
    'hero',
    'rv-hero-image',
  ];

  return criticalImages.some(pattern => src.includes(pattern));
}

/**
 * Generate blur placeholder data URL for an image
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @returns Data URL for blur placeholder
 */
export function generateBlurPlaceholder(width: number = 10, height: number = 10): string {
  // Generate a simple gray blur placeholder
  // In production, this could be a tiny base64-encoded version of the actual image
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23091020'/%3E%3C/svg%3E`;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#091020';
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}
