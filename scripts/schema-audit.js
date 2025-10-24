#!/usr/bin/env node

/**
 * Schema Audit Script
 *
 * Audits all pages in the Smart RV Portal for schema.org structured data
 * Generates reports of missing or invalid schema implementations
 *
 * Usage: node scripts/schema-audit.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Schema patterns to look for
const schemaPatterns = {
  helmet: /<script type="application\/ld\+json">/,
  inlineSchema: /"@context":\s*"https?:\/\/schema\.org"/,
  webPage: /"@type":\s*"WebPage"/,
  organization: /"@type":\s*"Organization"/,
  product: /"@type":\s*"Product"/,
  article: /"@type":\s*"Article"/,
  itemList: /"@type":\s*"ItemList"/,
  breadcrumbList: /"@type":\s*"BreadcrumbList"/,
};

// Required schema types by page category
const requiredSchemaByCategory = {
  '/models': ['Product', 'ItemList'],
  '/blog': ['Article', 'BreadcrumbList'],
  '/calculators': ['WebPage'],
  '/tools': ['WebPage'],
  '/features': ['WebPage'],
  '/': ['Organization', 'WebPage'],
};

class SchemaAuditor {
  constructor() {
    this.results = {
      totalPages: 0,
      pagesWithSchema: 0,
      pagesWithoutSchema: 0,
      pagesByCategory: {},
      missingSchemaPages: [],
      schemaTypesByPage: {},
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Find all page components
   */
  findPages() {
    const patterns = [
      'src/pages/**/*.tsx',
      'src/pages/**/*.jsx',
    ];

    const pages = [];
    patterns.forEach(pattern => {
      const files = glob.sync(pattern, { cwd: process.cwd() });
      pages.push(...files);
    });

    return pages;
  }

  /**
   * Extract route path from file path
   */
  getRouteFromPath(filePath) {
    // Remove src/pages/ prefix and file extension
    let route = filePath
      .replace(/^src\/pages\//, '')
      .replace(/\.(tsx|jsx)$/, '');

    // Convert Index to root
    if (route === 'Index') {
      return '/';
    }

    // Convert file path to route path
    route = '/' + route
      .replace(/\/Index$/, '')
      .replace(/([A-Z])/g, (match, p1, offset) => {
        return offset > 0 ? '-' + p1.toLowerCase() : p1.toLowerCase();
      });

    return route;
  }

  /**
   * Analyze a single page file for schema
   */
  analyzePage(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const route = this.getRouteFromPath(filePath);

    const schemaTypes = [];
    let hasSchema = false;

    // Check for Helmet with JSON-LD
    if (schemaPatterns.helmet.test(content) && schemaPatterns.inlineSchema.test(content)) {
      hasSchema = true;

      // Detect schema types
      if (schemaPatterns.webPage.test(content)) schemaTypes.push('WebPage');
      if (schemaPatterns.organization.test(content)) schemaTypes.push('Organization');
      if (schemaPatterns.product.test(content)) schemaTypes.push('Product');
      if (schemaPatterns.article.test(content)) schemaTypes.push('Article');
      if (schemaPatterns.itemList.test(content)) schemaTypes.push('ItemList');
      if (schemaPatterns.breadcrumbList.test(content)) schemaTypes.push('BreadcrumbList');
    }

    return {
      filePath,
      route,
      hasSchema,
      schemaTypes,
      content: content.substring(0, 500), // First 500 chars for context
    };
  }

  /**
   * Run the audit
   */
  async runAudit() {
    console.log(`${colors.cyan}========================================${colors.reset}`);
    console.log(`${colors.cyan}   Schema.org Audit Report${colors.reset}`);
    console.log(`${colors.cyan}   Smart RV Portal${colors.reset}`);
    console.log(`${colors.cyan}========================================${colors.reset}\n`);

    const pages = this.findPages();
    this.results.totalPages = pages.length;

    console.log(`${colors.blue}Found ${pages.length} page components${colors.reset}\n`);
    console.log(`${colors.yellow}Analyzing pages...${colors.reset}\n`);

    for (const page of pages) {
      const analysis = this.analyzePage(page);

      if (analysis.hasSchema) {
        this.results.pagesWithSchema++;
        this.results.schemaTypesByPage[analysis.route] = analysis.schemaTypes;
      } else {
        this.results.pagesWithoutSchema++;
        this.results.missingSchemaPages.push({
          route: analysis.route,
          file: analysis.filePath,
        });
      }

      // Categorize by route prefix
      const category = this.getCategoryFromRoute(analysis.route);
      if (!this.results.pagesByCategory[category]) {
        this.results.pagesByCategory[category] = {
          total: 0,
          withSchema: 0,
          withoutSchema: 0,
        };
      }
      this.results.pagesByCategory[category].total++;
      if (analysis.hasSchema) {
        this.results.pagesByCategory[category].withSchema++;
      } else {
        this.results.pagesByCategory[category].withoutSchema++;
      }
    }

    this.printResults();
    this.saveReport();
  }

  /**
   * Get category from route
   */
  getCategoryFromRoute(route) {
    if (route === '/') return 'home';
    const parts = route.split('/').filter(Boolean);
    return parts[0] || 'other';
  }

  /**
   * Print results to console
   */
  printResults() {
    console.log(`${colors.cyan}========================================${colors.reset}`);
    console.log(`${colors.cyan}   Audit Results${colors.reset}`);
    console.log(`${colors.cyan}========================================${colors.reset}\n`);

    // Overall stats
    console.log(`${colors.blue}Overall Statistics:${colors.reset}`);
    console.log(`  Total Pages: ${this.results.totalPages}`);
    console.log(`  ${colors.green}✓ Pages with Schema: ${this.results.pagesWithSchema} (${Math.round(this.results.pagesWithSchema / this.results.totalPages * 100)}%)${colors.reset}`);
    console.log(`  ${colors.red}✗ Pages without Schema: ${this.results.pagesWithoutSchema} (${Math.round(this.results.pagesWithoutSchema / this.results.totalPages * 100)}%)${colors.reset}\n`);

    // By category
    console.log(`${colors.blue}By Category:${colors.reset}`);
    Object.entries(this.results.pagesByCategory)
      .sort((a, b) => b[1].total - a[1].total)
      .forEach(([category, stats]) => {
        const percentage = Math.round(stats.withSchema / stats.total * 100);
        const status = percentage >= 80 ? colors.green : percentage >= 50 ? colors.yellow : colors.red;
        console.log(`  ${category.padEnd(20)} ${status}${stats.withSchema}/${stats.total} (${percentage}%)${colors.reset}`);
      });
    console.log('');

    // Pages missing schema
    if (this.results.missingSchemaPages.length > 0) {
      console.log(`${colors.yellow}Pages Missing Schema (${this.results.missingSchemaPages.length}):${colors.reset}`);
      this.results.missingSchemaPages
        .sort((a, b) => a.route.localeCompare(b.route))
        .forEach(page => {
          console.log(`  ${colors.red}✗${colors.reset} ${page.route.padEnd(40)} ${colors.cyan}(${page.file})${colors.reset}`);
        });
      console.log('');
    }

    // Schema types detected
    console.log(`${colors.blue}Schema Types Detected:${colors.reset}`);
    const schemaTypeCounts = {};
    Object.values(this.results.schemaTypesByPage).forEach(types => {
      types.forEach(type => {
        schemaTypeCounts[type] = (schemaTypeCounts[type] || 0) + 1;
      });
    });
    Object.entries(schemaTypeCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`  ${type.padEnd(20)} ${colors.green}${count} pages${colors.reset}`);
      });
    console.log('');

    // Recommendations
    console.log(`${colors.magenta}Recommendations:${colors.reset}`);
    if (this.results.pagesWithoutSchema > 0) {
      console.log(`  ${colors.yellow}•${colors.reset} Add schema.org structured data to ${this.results.pagesWithoutSchema} pages`);
      console.log(`  ${colors.yellow}•${colors.reset} Focus on high-traffic pages first (homepage, calculators, models)`);
      console.log(`  ${colors.yellow}•${colors.reset} Use Helmet component with JSON-LD script tags`);
    } else {
      console.log(`  ${colors.green}✓${colors.reset} All pages have schema markup!`);
    }
    console.log('');
  }

  /**
   * Save report to file
   */
  saveReport() {
    const reportDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Save JSON report
    const jsonPath = path.join(reportDir, 'schema-audit.json');
    fs.writeFileSync(jsonPath, JSON.stringify(this.results, null, 2));
    console.log(`${colors.green}✓ Report saved to: ${jsonPath}${colors.reset}`);

    // Save markdown report
    const mdPath = path.join(reportDir, 'schema-audit.md');
    const markdown = this.generateMarkdownReport();
    fs.writeFileSync(mdPath, markdown);
    console.log(`${colors.green}✓ Markdown report saved to: ${mdPath}${colors.reset}`);

    // Save CSV for missing pages
    if (this.results.missingSchemaPages.length > 0) {
      const csvPath = path.join(reportDir, 'missing-schema.csv');
      const csv = 'Route,File Path\n' +
        this.results.missingSchemaPages
          .map(p => `${p.route},"${p.file}"`)
          .join('\n');
      fs.writeFileSync(csvPath, csv);
      console.log(`${colors.green}✓ CSV report saved to: ${csvPath}${colors.reset}`);
    }
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport() {
    const md = [];
    md.push('# Schema.org Audit Report');
    md.push('');
    md.push(`**Generated:** ${new Date(this.results.timestamp).toLocaleString()}`);
    md.push('');
    md.push('## Overall Statistics');
    md.push('');
    md.push(`- **Total Pages:** ${this.results.totalPages}`);
    md.push(`- **Pages with Schema:** ${this.results.pagesWithSchema} (${Math.round(this.results.pagesWithSchema / this.results.totalPages * 100)}%)`);
    md.push(`- **Pages without Schema:** ${this.results.pagesWithoutSchema} (${Math.round(this.results.pagesWithoutSchema / this.results.totalPages * 100)}%)`);
    md.push('');
    md.push('## By Category');
    md.push('');
    md.push('| Category | With Schema | Without Schema | Total | Coverage |');
    md.push('|----------|-------------|----------------|-------|----------|');
    Object.entries(this.results.pagesByCategory)
      .sort((a, b) => b[1].total - a[1].total)
      .forEach(([category, stats]) => {
        const percentage = Math.round(stats.withSchema / stats.total * 100);
        md.push(`| ${category} | ${stats.withSchema} | ${stats.withoutSchema} | ${stats.total} | ${percentage}% |`);
      });
    md.push('');

    if (this.results.missingSchemaPages.length > 0) {
      md.push('## Pages Missing Schema');
      md.push('');
      md.push('| Route | File |');
      md.push('|-------|------|');
      this.results.missingSchemaPages
        .sort((a, b) => a.route.localeCompare(b.route))
        .forEach(page => {
          md.push(`| ${page.route} | \`${page.file}\` |`);
        });
      md.push('');
    }

    md.push('## Schema Types Detected');
    md.push('');
    const schemaTypeCounts = {};
    Object.values(this.results.schemaTypesByPage).forEach(types => {
      types.forEach(type => {
        schemaTypeCounts[type] = (schemaTypeCounts[type] || 0) + 1;
      });
    });
    md.push('| Schema Type | Page Count |');
    md.push('|-------------|------------|');
    Object.entries(schemaTypeCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        md.push(`| ${type} | ${count} |`);
      });
    md.push('');

    md.push('## Recommendations');
    md.push('');
    if (this.results.pagesWithoutSchema > 0) {
      md.push(`- Add schema.org structured data to ${this.results.pagesWithoutSchema} pages`);
      md.push('- Focus on high-traffic pages first (homepage, calculators, models)');
      md.push('- Use Helmet component with JSON-LD script tags');
      md.push('- Follow schema.org best practices for each page type');
    } else {
      md.push('✓ All pages have schema markup!');
    }

    return md.join('\n');
  }
}

// Run the audit
const auditor = new SchemaAuditor();
auditor.runAudit().catch(error => {
  console.error(`${colors.red}Error running audit:${colors.reset}`, error);
  process.exit(1);
});
