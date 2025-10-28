/**
 * Vite Plugin for Static Site Generation
 * Generates static HTML files during build process
 */

import { Plugin } from 'vite';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { pageMetadata, generateStaticHTML, generateSitemap, generateRobotsTxt } from '../src/utils/static-generator';

export function staticGeneratorPlugin(): Plugin {
  return {
    name: 'static-generator',
    apply: 'build',
    generateBundle(options, bundle) {
      const outputDir = options.dir || 'dist';

      console.log('🚀 Generating static files...');

      // Find the main entry JS bundle
      const entryBundle = Object.values(bundle).find(
        (chunk: any) => chunk.type === 'chunk' && chunk.isEntry && chunk.name === 'index'
      );

      if (!entryBundle || entryBundle.type !== 'chunk') {
        console.error('❌ Could not find entry bundle for static generator');
        return;
      }

      // Use fileName as-is since it already includes 'assets/' from Vite config
      const bundlePath = `/${entryBundle.fileName}`;
      console.log(`📦 Using bundle path: ${bundlePath}`);

      // Validate bundlePath
      if (!bundlePath || bundlePath.includes('undefined')) {
        throw new Error('❌ Failed to determine bundle path for static generator');
      }

      // Generate static HTML for each page
      Object.keys(pageMetadata).forEach(path => {
        const html = generateStaticHTML(path, bundlePath);

        // Create the appropriate filename
        const fileName = path === '/' ? 'index.html' : `${path.slice(1).replace(/\//g, '-')}.html`;

        // Add to bundle
        this.emitFile({
          type: 'asset',
          fileName,
          source: html
        });

        console.log(`✅ Generated static HTML: ${fileName}`);
      });

      // Generate sitemap.xml
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: generateSitemap()
      });

      // Generate robots.txt
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: generateRobotsTxt()
      });

      console.log('🎉 Static generation complete!');
    }
  };
}