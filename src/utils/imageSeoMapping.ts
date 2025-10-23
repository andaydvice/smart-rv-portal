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
 *     keywords: ["keyword1", "keyword2", "keyword3"],
 *     priority: "critical" | "high" | "normal"
 *   }
 * }
 */

export const imageSeoMapping = {
  // ========================================
  // HERO & MAIN IMAGES (Critical Priority)
  // ========================================

  "f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png": {
    seoName: "luxury-smart-rv-interior-panoramic-windows-modern-technology",
    alt: "Luxury smart RV interior with panoramic windows, modern intelligent design, and advanced technology systems",
    title: "Smart RV Hub - Luxury Interior with Panoramic Views",
    caption: "Experience the future of mobile living with our luxury smart RV featuring panoramic windows and integrated technology",
    keywords: ["luxury rv interior", "smart rv technology", "panoramic rv windows", "modern rv design", "intelligent rv systems"],
    priority: "critical",
  },

  // ========================================
  // PRODUCTS PAGE (High Priority)
  // ========================================

  "e2566d0d-bbd0-4401-9293-2d105eea8105.png": {
    seoName: "smart-rv-products-technology-showcase-connected-systems",
    alt: "Smart RV products and technology showcase featuring connected systems and intelligent automation",
    title: "Smart RV Products - Advanced Technology Solutions",
    caption: "Comprehensive smart RV products for modern mobile living",
    keywords: ["smart rv products", "rv technology solutions", "connected rv systems", "rv automation products", "intelligent rv upgrades"],
    priority: "high",
  },

  // ========================================
  // LUXURY MODEL PAGE (High Priority)
  // ========================================

  "Luxury-Class-RVs-min.jpg": {
    seoName: "luxury-class-rvs-premium-motorhomes-high-end-features",
    alt: "Luxury class RVs and premium motorhomes with high-end features and elegant design",
    title: "Luxury Class RVs - Premium Mobile Living",
    caption: "Experience unparalleled luxury in our premium RV collection",
    keywords: ["luxury class rvs", "premium motorhomes", "high-end rv", "luxury rv features", "elegant rv design"],
    priority: "high",
  },

  "5f18c537-149c-494e-9adf-6a1c096e3e3a.png": {
    seoName: "luxury-rv-smart-technology-integration-automation-systems",
    alt: "Luxury RV smart technology integration with advanced automation systems and intelligent controls",
    title: "Luxury RV Technology Integration",
    caption: "State-of-the-art technology seamlessly integrated into luxury design",
    keywords: ["luxury rv technology", "smart rv integration", "rv automation systems", "intelligent rv controls", "premium rv tech"],
    priority: "high",
  },

  "Luxury_RV_Living-min.jpg": {
    seoName: "luxury-rv-living-lifestyle-modern-mobile-home-comfort",
    alt: "Luxury RV living lifestyle with modern mobile home comfort and sophisticated amenities",
    title: "Luxury RV Living - Premium Lifestyle",
    caption: "Live the luxury RV lifestyle with comfort and sophistication",
    keywords: ["luxury rv living", "rv lifestyle", "mobile home luxury", "premium rv comfort", "sophisticated rv amenities"],
    priority: "high",
  },

  "Premium-Travel-Trailers-min.jpg": {
    seoName: "premium-travel-trailers-luxury-towable-rvs-high-quality",
    alt: "Premium travel trailers and luxury towable RVs with high-quality construction and modern amenities",
    title: "Premium Travel Trailers - Luxury Towables",
    caption: "Premium travel trailers combining luxury with mobility",
    keywords: ["premium travel trailers", "luxury towable rvs", "high-quality trailers", "modern rv amenities", "travel trailer luxury"],
    priority: "high",
  },

  "795a8cdd-cf65-487f-b550-4e4458d0aa9e.png": {
    seoName: "luxury-rv-floor-plan-spacious-layout-premium-design",
    alt: "Luxury RV floor plan with spacious layout and premium interior design features",
    title: "Luxury RV Floor Plans",
    caption: "Thoughtfully designed floor plans for luxury RV living",
    keywords: ["luxury rv floor plan", "spacious rv layout", "premium rv design", "rv interior layout", "luxury motorhome floorplan"],
    priority: "high",
  },

  // ========================================
  // TECHNOLOGY PAGE (High Priority)
  // ========================================

  "9ad50274-5f5b-47fa-8278-32599d734b3e.png": {
    seoName: "smart-rv-technology-dashboard-control-panel-interface",
    alt: "Smart RV technology dashboard with digital control panel and intuitive touchscreen interface",
    title: "Smart RV Technology Dashboard",
    caption: "Control your entire RV from one intelligent dashboard",
    keywords: ["smart rv dashboard", "rv control panel", "digital rv interface", "touchscreen rv controls", "rv technology hub"],
    priority: "high",
  },

  "db5f9104-32a0-458f-a2ca-5ecb38415ec9.png": {
    seoName: "rv-connectivity-solutions-internet-mobile-network-technology",
    alt: "RV connectivity solutions with high-speed internet, mobile network technology, and signal boosters",
    title: "RV Connectivity Solutions - Stay Connected",
    caption: "Stay connected anywhere with advanced RV internet solutions",
    keywords: ["rv connectivity", "rv internet solutions", "mobile rv network", "rv signal booster", "connected rv technology"],
    priority: "high",
  },

  // ========================================
  // VOICE CONTROL (Medium-High Priority)
  // ========================================

  "ab7d2423-0ab6-4868-83b1-c84f220e5736.png": {
    seoName: "rv-voice-control-smart-assistant-hands-free-automation",
    alt: "RV voice control system with smart assistant integration for hands-free automation and control",
    title: "RV Voice Control - Hands-Free Smart Living",
    caption: "Control your RV with simple voice commands",
    keywords: ["rv voice control", "smart assistant rv", "hands-free rv control", "voice automation rv", "alexa google rv integration"],
    priority: "high",
  },

  "35c8b551-66ab-42cc-ac02-3fe09d805dd5.png": {
    seoName: "voice-activated-rv-systems-alexa-google-assistant-integration",
    alt: "Voice-activated RV systems with Alexa and Google Assistant integration for smart home automation",
    title: "Voice-Activated RV Systems",
    caption: "Seamless integration with popular voice assistants",
    keywords: ["voice activated rv", "alexa rv integration", "google assistant rv", "smart home rv automation", "voice command rv"],
    priority: "high",
  },

  // ========================================
  // STORAGE & FACILITIES (Medium Priority)
  // ========================================

  "e9503bf4-354a-4790-8a83-fefea32abc5b.png": {
    seoName: "rv-storage-facilities-secure-indoor-outdoor-parking",
    alt: "RV storage facilities with secure indoor and outdoor parking options for motorhomes and trailers",
    title: "RV Storage Facilities - Secure Parking Solutions",
    caption: "Find secure storage facilities for your RV nationwide",
    keywords: ["rv storage facilities", "secure rv parking", "indoor rv storage", "outdoor rv storage", "motorhome storage"],
    priority: "normal",
  },

  // ========================================
  // TROUBLESHOOTING & SUPPORT (Medium Priority)
  // ========================================

  "a6746652-04f0-4f89-a55d-b241e7bd972a.png": {
    seoName: "rv-troubleshooting-guide-diagnostic-tools-repair-solutions",
    alt: "RV troubleshooting guide with diagnostic tools, repair solutions, and maintenance tips for common issues",
    title: "RV Troubleshooting Guide - Expert Solutions",
    caption: "Solve common RV problems with expert troubleshooting guides",
    keywords: ["rv troubleshooting", "rv diagnostic tools", "rv repair guide", "rv maintenance tips", "rv problem solving"],
    priority: "normal",
  },

  // ========================================
  // CONTACT & SUPPORT (Medium Priority)
  // ========================================

  "7d42772e-e96c-45cd-9a40-5e59be1c0a60.png": {
    seoName: "rv-customer-support-contact-expert-consultation-service",
    alt: "RV customer support and contact center for expert consultation and technical service assistance",
    title: "RV Customer Support - Expert Assistance",
    caption: "Get expert support for all your RV technology needs",
    keywords: ["rv customer support", "rv expert consultation", "rv technical service", "rv help center", "rv support team"],
    priority: "normal",
  },

  "f88c014b-5b32-4db0-8742-f9e8b531654e.png": {
    seoName: "contact-smart-rv-hub-customer-service-support-team",
    alt: "Contact Smart RV Hub customer service and support team for assistance with RV technology solutions",
    title: "Contact Smart RV Hub - We're Here to Help",
    caption: "Reach out to our expert team for personalized assistance",
    keywords: ["contact smart rv hub", "rv customer service", "rv support team", "rv technology help", "rv consultation"],
    priority: "normal",
  },
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
