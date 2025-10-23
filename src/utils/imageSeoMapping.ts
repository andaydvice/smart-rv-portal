/**
 * Image SEO Mapping
 *
 * Maps UUID filenames to SEO-friendly descriptive names with keywords
 * This improves image search rankings and accessibility
 *
 * Format:
 * {
 *   "original-uuid.png": {
 *     seoName: "descriptive-keyword-rich-name",
 *     alt: "Detailed alt text with keywords",
 *     title: "Image title for hover text",
 *     caption: "Optional caption with context",
 *     keywords: ["keyword1", "keyword2", "keyword3"]
 *   }
 * }
 */

export const imageSeomapping = {
  // Hero and Main Images
  "f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png": {
    seoName: "luxury-smart-rv-interior-panoramic-windows-modern-technology",
    alt: "Luxury smart RV interior with panoramic windows, modern intelligent design, and advanced technology systems",
    title: "Smart RV Hub - Luxury Interior with Panoramic Views",
    caption: "Experience the future of mobile living with our luxury smart RV featuring panoramic windows and integrated technology",
    keywords: ["luxury rv interior", "smart rv technology", "panoramic rv windows", "modern rv design", "intelligent rv systems"],
    priority: "critical", // For lossless compression
  },

  // Add mappings for other images
  // Template for new images:
  // "uuid.png": {
  //   seoName: "primary-keyword-secondary-keyword-description",
  //   alt: "Detailed description with primary and secondary keywords",
  //   title: "Hover text",
  //   caption: "Optional caption",
  //   keywords: ["keyword1", "keyword2"],
  // },
};

/**
 * Get SEO metadata for an image
 * @param filename - Original filename (UUID or SEO name)
 * @returns SEO metadata or defaults
 */
export function getImageSEO(filename: string) {
  // Check if it's a UUID filename
  const metadata = imageSeoMapping[filename];

  if (metadata) {
    return metadata;
  }

  // Generate default metadata from filename
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const readableName = nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim();

  return {
    seoName: nameWithoutExt,
    alt: readableName,
    title: readableName,
    caption: "",
    keywords: readableName.split(" ").filter(word => word.length > 3),
  };
}

/**
 * Generate SEO-friendly filename from description
 * @param description - Human-readable description
 * @returns SEO-friendly filename
 */
export function generateSeoFilename(description: string): string {
  return description
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove duplicate hyphens
    .substring(0, 100); // Limit length
}

/**
 * Get optimized image path with SEO-friendly name
 * @param originalFilename - UUID filename
 * @param size - Image size suffix (e.g., "800w", "original")
 * @returns Optimized image path with SEO name
 */
export function getOptimizedImagePath(originalFilename: string, size: string = "original"): string {
  const metadata = imageSeoMapping[originalFilename];
  const basename = originalFilename.replace(/\.[^/.]+$/, "");

  if (metadata?.seoName) {
    // Use SEO-friendly name if available
    return `/optimized-images/${metadata.seoName}-${size}.webp`;
  }

  // Fallback to UUID name
  return `/optimized-images/${basename}-${size}.webp`;
}

export default imageSeoMapping;
