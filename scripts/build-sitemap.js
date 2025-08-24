#!/usr/bin/env node

/**
 * Build script to generate sitemap and robots.txt for current project
 * This ensures all URLs match the current domain and timestamps are current
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://smartrvhub.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/models', priority: '0.9', changefreq: 'weekly' },
  { path: '/models/compact', priority: '0.7', changefreq: 'weekly' },
  { path: '/models/luxury', priority: '0.7', changefreq: 'weekly' },
  { path: '/models/adventure', priority: '0.7', changefreq: 'weekly' },
  { path: '/models/compare', priority: '0.9', changefreq: 'weekly' },
  { path: '/features', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/guides', priority: '0.7', changefreq: 'monthly' },
  { path: '/troubleshooting', priority: '0.7', changefreq: 'monthly' },
];

function generateSitemap() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const xmlFooter = '</urlset>';
  
  const urls = routes.map(route => `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');
  
  return `${xmlHeader}${urls}\n${xmlFooter}`;
}

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

# Last updated: ${CURRENT_DATE}`;
}

function main() {
  const publicDir = path.join(__dirname, '../public');
  
  // Generate and write sitemap
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');
  
  // Generate and write robots.txt
  const robots = generateRobots();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('✅ Generated robots.txt');
  
  console.log(`🚀 All files updated for domain: ${DOMAIN}`);
}

main();