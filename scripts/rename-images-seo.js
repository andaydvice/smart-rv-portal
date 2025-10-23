#!/usr/bin/env node

/**
 * SEO-Friendly Image Renaming Script
 *
 * Renames optimized images with descriptive, keyword-rich filenames
 * Creates copies/symlinks for backward compatibility
 *
 * Benefits:
 * - Better image search rankings
 * - Improved accessibility
 * - Clear content descriptions for search engines
 * - Enhanced user experience
 *
 * Usage:
 *   npm run rename-images-seo
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image SEO mapping (same as imageSeoMapping.ts)
const imageSeoMapping = {
  "f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png": {
    seoName: "luxury-smart-rv-interior-panoramic-windows-modern-technology",
    alt: "Luxury smart RV interior with panoramic windows, modern intelligent design, and advanced technology systems",
    keywords: ["luxury rv interior", "smart rv technology", "panoramic windows"],
  },
  // Add more mappings as needed
};

const OPTIMIZED_DIR = path.join(process.cwd(), 'public/optimized-images');

/**
 * Rename optimized images with SEO-friendly names
 */
async function renameImages() {
  console.log('🏷️  SEO Image Renaming');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let renamed = 0;
  let skipped = 0;

  for (const [originalName, metadata] of Object.entries(imageSeoMapping)) {
    const { seoName } = metadata;
    const basename = originalName.replace(/\.[^/.]+$/, '');

    console.log(`\n📸 Processing: ${originalName}`);
    console.log(`   SEO name: ${seoName}`);

    // Find all files with this basename
    try {
      const files = await fs.readdir(OPTIMIZED_DIR);
      const matchingFiles = files.filter(f => f.startsWith(basename));

      for (const file of matchingFiles) {
        // Extract size suffix (e.g., "-800w", "-original")
        const match = file.match(/-(\w+)\.(webp|png|jpg)$/);
        if (!match) continue;

        const [, sizeSuffix, ext] = match;
        const oldPath = path.join(OPTIMIZED_DIR, file);
        const newFilename = `${seoName}-${sizeSuffix}.${ext}`;
        const newPath = path.join(OPTIMIZED_DIR, newFilename);

        // Check if already renamed
        try {
          await fs.access(newPath);
          console.log(`   ⏭️  Already exists: ${newFilename}`);
          skipped++;
          continue;
        } catch {
          // File doesn't exist, proceed with rename
        }

        // Copy file with new name (preserves original for compatibility)
        await fs.copyFile(oldPath, newPath);
        console.log(`   ✅ Created: ${newFilename}`);
        renamed++;
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Renamed: ${renamed} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log('\n✨ SEO-friendly image names created!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  renameImages().catch(console.error);
}

export { renameImages };
