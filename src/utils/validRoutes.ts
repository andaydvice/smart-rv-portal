/**
 * Valid routes configuration for 404 handling
 * This list is used by the edge function to validate routes
 */
export const VALID_ROUTES = [
  // Main pages
  '/',
  '/features',
  '/models',
  '/models/compact',
  '/models/luxury', 
  '/models/adventure',
  '/models/compare',
  '/blog',
  '/about',
  '/products',
  '/pricing',
  '/contact',
  '/calculators',
  '/documentation',
  '/weather',
  '/rv-weather',
  '/storage-facilities',
  '/storage-preparation-checklist',
  '/troubleshooting',
  '/voice-control',
  '/account',
  '/rv-emergency-center',
  '/solar-power-guide',
  '/rv-apps-hub',
  '/technology',
  '/documentation/complete',
  '/search',
  
  // Feature pages
  '/features/audio-system',
  '/features/smart-tv',
  '/features/climate-control',
  '/features/security-system',
  '/features/energy-management',
  '/features/water-management',
  '/features/connectivity',
  '/features/navigation',
  '/features/monitoring',
  '/features/automation',
  '/features/maintenance',
  '/features/entertainment',
  '/features/lighting',
  '/features/storage',
  '/features/safety',
  
  // Admin pages
  '/admin/perf',
];

export const VALID_PATTERNS = [
  // Blog posts
  /^\/blog\/[a-z0-9\-]+$/,
];

/**
 * Check if a route is valid
 */
export function isValidRoute(path: string): boolean {
  // Check exact matches
  if (VALID_ROUTES.includes(path)) {
    return true;
  }
  
  // Check pattern matches
  return VALID_PATTERNS.some(pattern => pattern.test(path));
}

/**
 * Get 404 metadata based on the attempted path
 */
export function get404Metadata(path: string) {
  return {
    title: "Page Not Found (404) | Smart RV Technology Hub",
    description: "The page you're looking for doesn't exist. Explore our smart RV technology guides, product reviews, and digital nomad resources instead.",
    keywords: "404, page not found, smart RV technology, RV guides, RV products",
    canonical: `https://rv-tech-hub.lovable.app${path}`,
  };
}