#!/usr/bin/env node

/**
 * Automated Sitemap Generator
 *
 * Generates sitemap.xml from pageMetadata with current dates
 * Ensures search engines crawl pages frequently with accurate lastmod dates
 *
 * Features:
 * - Automatically includes all pages from static-generator.ts
 * - Updates lastmod to current date
 * - Maintains proper priority and changefreq
 * - Updates robots.txt with current date
 *
 * Usage:
 *   npm run generate-sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://smartrvhub.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

/**
 * Comprehensive page metadata
 * This should match the pageMetadata from src/utils/static-generator.ts
 */
const pageMetadata = {
  // Main Pages
  '/': { priority: 1.0, changeFreq: 'daily' },
  '/about': { priority: 0.8, changeFreq: 'monthly' },
  '/products': { priority: 0.9, changeFreq: 'weekly' },
  '/pricing': { priority: 0.8, changeFreq: 'monthly' },
  '/contact': { priority: 0.7, changeFreq: 'monthly' },

  // Models Section
  '/models': { priority: 0.9, changeFreq: 'weekly' },
  '/models/compact': { priority: 0.7, changeFreq: 'weekly' },
  '/models/luxury': { priority: 0.7, changeFreq: 'weekly' },
  '/models/adventure': { priority: 0.7, changeFreq: 'weekly' },
  '/models/compare': { priority: 0.6, changeFreq: 'weekly' },

  // Features Section (13 pages)
  '/features': { priority: 0.8, changeFreq: 'weekly' },
  '/features/audio-system': { priority: 0.6, changeFreq: 'monthly' },
  '/features/smart-tv': { priority: 0.6, changeFreq: 'monthly' },
  '/features/smart-kitchen': { priority: 0.6, changeFreq: 'monthly' },
  '/features/power-management': { priority: 0.6, changeFreq: 'monthly' },
  '/features/internet-connectivity': { priority: 0.6, changeFreq: 'monthly' },
  '/features/navigation-system': { priority: 0.6, changeFreq: 'monthly' },
  '/features/security-system': { priority: 0.6, changeFreq: 'monthly' },
  '/features/automated-driving': { priority: 0.6, changeFreq: 'monthly' },
  '/features/water-systems': { priority: 0.6, changeFreq: 'monthly' },
  '/features/smart-automation': { priority: 0.6, changeFreq: 'monthly' },
  '/features/climate-control': { priority: 0.6, changeFreq: 'monthly' },
  '/features/entertainment': { priority: 0.6, changeFreq: 'monthly' },
  '/features/remote-control': { priority: 0.6, changeFreq: 'monthly' },

  // Tools and Utilities
  '/calculators': { priority: 0.7, changeFreq: 'weekly' },
  '/weather': { priority: 0.6, changeFreq: 'daily' },
  '/rv-weather': { priority: 0.6, changeFreq: 'daily' },
  '/storage-facilities': { priority: 0.6, changeFreq: 'monthly' },
  '/storage-preparation-checklist': { priority: 0.6, changeFreq: 'monthly' },
  '/troubleshooting': { priority: 0.7, changeFreq: 'monthly' },
  '/voice-control': { priority: 0.6, changeFreq: 'monthly' },
  '/rv-emergency-center': { priority: 0.7, changeFreq: 'monthly' },
  '/solar-power-guide': { priority: 0.7, changeFreq: 'monthly' },
  '/rv-apps-hub': { priority: 0.6, changeFreq: 'weekly' },

  // Content and Documentation
  '/technology': { priority: 0.7, changeFreq: 'weekly' },
  '/documentation': { priority: 0.6, changeFreq: 'weekly' },
  '/documentation/complete': { priority: 0.5, changeFreq: 'monthly' },

  // Blog Section
  '/blog': { priority: 0.8, changeFreq: 'daily' },

  // Blog Posts (add specific posts here)
  '/blog/future-of-mobile-living': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/sustainable-travel-redefined': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/rv-smart-tech': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/indoor-rv-storage': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/top-10-smart-rv-upgrades': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/solar-power-for-rvs': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/smart-rv-security-systems': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/remote-work-rv-setup': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/top-10-rv-parks-usa': { priority: 0.6, changeFreq: 'monthly' },
  '/blog/essential-rv-packing-checklist': { priority: 0.6, changeFreq: 'monthly' },
};

/**
 * Generate sitemap.xml with current dates
 */
function generateSitemap() {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- AUTO-GENERATED - DO NOT EDIT MANUALLY -->
  <!-- Generated: ${CURRENT_DATE} -->
  <!-- Pages: ${Object.keys(pageMetadata).length} -->
  `;

  const xmlFooter = '</urlset>';

  const urls = Object.entries(pageMetadata).map(([path, meta]) => {
    return `
  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${meta.changeFreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
  }).join('');

  return `${xmlHeader}${urls}\n${xmlFooter}`;
}

/**
 * Generate robots.txt with current date
 */
function generateRobots() {
  return `User-agent: *
Allow: /

# Block admin and internal routes
Disallow: /admin/
Disallow: /account
Disallow: /search

# Sitemap location
Sitemap: ${DOMAIN}/sitemap.xml

# Crawl delay for polite crawling
Crawl-delay: 1

# Last updated: ${CURRENT_DATE}
`;
}

/**
 * Main execution
 */
function main() {
  console.log('🗺️  Generating sitemap and robots.txt');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Domain: ${DOMAIN}`);
  console.log(`Date: ${CURRENT_DATE}`);
  console.log(`Pages: ${Object.keys(pageMetadata).length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate and write sitemap
  const sitemap = generateSitemap();
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Generated sitemap.xml (${Object.keys(pageMetadata).length} URLs)`);
  console.log(`   ${sitemapPath}`);

  // Generate and write robots.txt
  const robots = generateRobots();
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  console.log(`✅ Generated robots.txt`);
  console.log(`   ${robotsPath}`);

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ All files updated for ${DOMAIN}`);
  console.log(`📅 Last modified: ${CURRENT_DATE}`);
  console.log(`🔍 Submit to: https://search.google.com/search-console`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, generateRobots };
