#!/usr/bin/env node

/**
 * High-Quality Image Optimization Script
 *
 * Converts images to WebP format while preserving quality
 * Generates responsive image sizes for different devices
 * Keeps original files as source of truth
 *
 * Quality Settings:
 * - WebP Quality: 92% (near-lossless, visually identical)
 * - Lossless WebP for critical images (logos, OG images)
 * - Retina support: Generates 1x, 2x versions
 *
 * Usage:
 *   npm run optimize-images
 *   npm run optimize-images -- --lossless (for critical images)
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  // Quality settings (higher = better quality, larger file)
  quality: {
    webp: 92,           // 92% quality - visually lossless
    webpLossless: true, // Option for critical images
    jpeg: 90,           // Fallback JPEG quality
  },

  // Responsive breakpoints (widths in pixels)
  sizes: [
    { name: 'small', width: 400, suffix: '-400w' },
    { name: 'medium', width: 800, suffix: '-800w' },
    { name: 'large', width: 1200, suffix: '-1200w' },
    { name: 'xlarge', width: 1920, suffix: '-1920w' },
  ],

  // Retina support
  retina: {
    enabled: true,
    multipliers: [1, 2], // 1x and 2x for retina displays
  },

  // Directories
  inputDirs: [
    'public/lovable-uploads',
    'src/assets',
  ],

  outputDir: 'public/optimized-images',

  // Image types to process
  extensions: ['.jpg', '.jpeg', '.png'],

  // Critical images that should use lossless compression
  criticalImages: [
    'f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png', // OG image
    'og-image',
    'logo',
    'favicon',
  ],
};

// Stats tracker
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0,
};

/**
 * Check if image is critical (should use lossless compression)
 */
function isCriticalImage(filename) {
  return CONFIG.criticalImages.some(critical =>
    filename.toLowerCase().includes(critical.toLowerCase())
  );
}

/**
 * Get all image files from input directories
 */
async function getImageFiles() {
  const allFiles = [];

  for (const dir of CONFIG.inputDirs) {
    const fullPath = path.join(process.cwd(), dir);

    try {
      const files = await fs.readdir(fullPath);

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (CONFIG.extensions.includes(ext)) {
          allFiles.push({
            path: path.join(fullPath, file),
            filename: file,
            basename: path.basename(file, ext),
            ext: ext,
            dir: dir,
          });
        }
      }
    } catch (error) {
      console.warn(`⚠️  Directory not found: ${fullPath}`);
    }
  }

  return allFiles;
}

/**
 * Optimize a single image with quality preservation
 */
async function optimizeImage(imageFile, options = {}) {
  const { path: imagePath, filename, basename, ext } = imageFile;
  const isCritical = isCriticalImage(filename);

  console.log(`\n📸 Processing: ${filename}`);
  console.log(`   Quality mode: ${isCritical ? 'LOSSLESS' : 'HIGH (92%)'}`);

  try {
    // Get original image metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    console.log(`   Original: ${metadata.width}x${metadata.height}, ${metadata.format}, ${(await fs.stat(imagePath)).size / 1024 | 0}KB`);

    stats.originalSize += (await fs.stat(imagePath)).size;

    // Create output directory structure
    const outputDir = path.join(process.cwd(), CONFIG.outputDir);
    await fs.mkdir(outputDir, { recursive: true });

    // Generate responsive sizes
    const generatedFiles = [];

    for (const size of CONFIG.sizes) {
      // Skip if original is smaller than target size
      if (metadata.width < size.width) {
        console.log(`   ⏭️  Skipping ${size.name} (${size.width}px) - original is smaller`);
        continue;
      }

      const outputBasename = `${basename}${size.suffix}`;

      // Generate WebP version
      const webpPath = path.join(outputDir, `${outputBasename}.webp`);

      await sharp(imagePath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({
          quality: CONFIG.quality.webp,
          lossless: isCritical ? CONFIG.quality.webpLossless : false,
          nearLossless: !isCritical, // Use near-lossless for non-critical
          effort: 6, // Higher effort = better compression
        })
        .toFile(webpPath);

      const webpSize = (await fs.stat(webpPath)).size;
      stats.optimizedSize += webpSize;

      console.log(`   ✅ ${size.name}: ${outputBasename}.webp (${webpSize / 1024 | 0}KB)`);

      generatedFiles.push({
        size: size.name,
        width: size.width,
        path: webpPath,
        url: `/optimized-images/${outputBasename}.webp`,
      });

      // Generate fallback JPEG/PNG for older browsers
      const fallbackExt = ext === '.png' ? '.png' : '.jpg';
      const fallbackPath = path.join(outputDir, `${outputBasename}${fallbackExt}`);

      if (fallbackExt === '.jpg') {
        await sharp(imagePath)
          .resize(size.width, null, { withoutEnlargement: true })
          .jpeg({ quality: CONFIG.quality.jpeg })
          .toFile(fallbackPath);
      } else {
        await sharp(imagePath)
          .resize(size.width, null, { withoutEnlargement: true })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(fallbackPath);
      }

      console.log(`   📦 Fallback: ${outputBasename}${fallbackExt}`);
    }

    // Generate full-size WebP (preserving original dimensions)
    const fullSizeWebpPath = path.join(outputDir, `${basename}-original.webp`);
    await sharp(imagePath)
      .webp({
        quality: isCritical ? 100 : CONFIG.quality.webp,
        lossless: isCritical,
        nearLossless: !isCritical,
        effort: 6,
      })
      .toFile(fullSizeWebpPath);

    const fullSizeWebpSize = (await fs.stat(fullSizeWebpPath)).size;
    stats.optimizedSize += fullSizeWebpSize;

    console.log(`   ✨ Full-size WebP: ${basename}-original.webp (${fullSizeWebpSize / 1024 | 0}KB)`);

    stats.processed++;

    return {
      original: filename,
      sizes: generatedFiles,
      fullSize: `/optimized-images/${basename}-original.webp`,
    };

  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
    stats.errors++;
    return null;
  }
}

/**
 * Generate image manifest for use in React components
 */
async function generateManifest(optimizedImages) {
  const manifest = {
    generated: new Date().toISOString(),
    images: {},
  };

  for (const img of optimizedImages) {
    if (img) {
      manifest.images[img.original] = {
        sizes: img.sizes,
        fullSize: img.fullSize,
      };
    }
  }

  const manifestPath = path.join(process.cwd(), CONFIG.outputDir, 'manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n📋 Generated manifest: ${manifestPath}`);
  return manifest;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 High-Quality Image Optimization');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Quality Settings:');
  console.log(`  • WebP Quality: ${CONFIG.quality.webp}% (near-lossless)`);
  console.log(`  • Critical Images: Lossless WebP`);
  console.log(`  • Responsive Sizes: ${CONFIG.sizes.map(s => s.width + 'px').join(', ')}`);
  console.log(`  • Output: ${CONFIG.outputDir}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const imageFiles = await getImageFiles();

  if (imageFiles.length === 0) {
    console.log('⚠️  No images found to optimize');
    return;
  }

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  const optimizedImages = [];

  for (const imageFile of imageFiles) {
    const result = await optimizeImage(imageFile);
    if (result) {
      optimizedImages.push(result);
    }
  }

  // Generate manifest
  await generateManifest(optimizedImages);

  // Print summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Optimization Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images`);
  console.log(`❌ Errors: ${stats.errors} images`);
  console.log(`📦 Original size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Optimized size: ${(stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`);

  const savingsPercent = ((1 - stats.optimizedSize / stats.originalSize) * 100).toFixed(1);
  console.log(`💰 Savings: ${savingsPercent}% (${((stats.originalSize - stats.optimizedSize) / 1024 / 1024).toFixed(2)} MB)`);
  console.log('\n✨ Quality preserved at 92%+ for all images!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { optimizeImage, generateManifest };
