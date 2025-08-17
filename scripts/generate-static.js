#!/usr/bin/env node

/**
 * Build-time static site generation script
 * Generates static HTML files, sitemap, and robots.txt during build process
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

// Import our static generator utilities
const staticGeneratorPath = join(projectRoot, 'src/utils/static-generator.ts');
let staticGeneratorContent = readFileSync(staticGeneratorPath, 'utf-8');

// Convert TypeScript imports to work in Node.js context
staticGeneratorContent = staticGeneratorContent
  .replace(/export const /g, 'const ')
  .replace(/export \{[^}]+\}/g, '')
  .replace(/interface [^{]+\{[^}]+\}/g, '');

// Create a temporary JS file for execution
const tempJsPath = join(__dirname, 'temp-static-generator.js');
writeFileSync(tempJsPath, staticGeneratorContent);

// Import the functions
const { pageMetadata, generateStaticHTML, generateSitemap, generateRobotsTxt } = 
  await import(tempJsPath).catch(() => {
    console.error('Error importing static generator functions');
    process.exit(1);
  });

/**
 * Get file modification time for better lastmod dates
 */
function getFileModTime(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Generate static HTML files for all routes
 */
function generateStaticFiles() {
  console.log('🚀 Starting static file generation...');

  // Ensure dist directory exists
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  // Generate static HTML for each page
  Object.keys(pageMetadata).forEach(path => {
    const html = generateStaticHTML(path);
    
    // Create directory structure
    const filePath = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
    const fullPath = join(distDir, filePath);
    const dir = dirname(fullPath);
    
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    
    writeFileSync(fullPath, html);
    console.log(`✅ Generated: ${filePath}`);
  });

  // Generate sitemap.xml
  const sitemap = generateSitemap();
  writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated: sitemap.xml');

  // Generate robots.txt
  const robots = generateRobotsTxt();
  writeFileSync(join(distDir, 'robots.txt'), robots);
  console.log('✅ Generated: robots.txt');

  // Clean up temp file
  try {
    const fs = await import('fs');
    fs.unlinkSync(tempJsPath);
  } catch {}

  console.log('🎉 Static generation complete!');
}

// Run the generation
generateStaticFiles();