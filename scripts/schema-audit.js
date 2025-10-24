#!/usr/bin/env node

/**
 * Enhanced Schema Audit Script with Visual HTML Reports
 *
 * Generates beautiful, actionable reports showing:
 * - Page URLs with current schema status
 * - Specific schema recommendations for each page type
 * - Visual coverage charts
 * - Actionable next steps
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Schema recommendations by page type
const schemaRecommendations = {
  '/': {
    required: ['Organization', 'WebSite'],
    recommended: ['BreadcrumbList'],
    description: 'Homepage should identify your organization and website'
  },
  '/models': {
    required: ['ItemList', 'WebPage'],
    recommended: ['Product'],
    description: 'Model listing pages should use ItemList schema'
  },
  '/models/.*': {
    required: ['Product'],
    recommended: ['AggregateRating', 'Offer'],
    description: 'Individual model pages should use Product schema with offers'
  },
  '/blog': {
    required: ['Blog', 'ItemList'],
    recommended: ['WebPage'],
    description: 'Blog listing should use Blog and ItemList schemas'
  },
  '/blog/.*': {
    required: ['Article', 'BreadcrumbList'],
    recommended: ['Person', 'ImageObject'],
    description: 'Blog posts should use Article schema with author and images'
  },
  '/calculators': {
    required: ['WebPage', 'WebApplication'],
    recommended: ['HowTo'],
    description: 'Calculator tools should use WebApplication schema'
  },
  '/tools': {
    required: ['WebPage', 'SoftwareApplication'],
    recommended: ['HowTo'],
    description: 'Interactive tools should use SoftwareApplication schema'
  },
  '/features': {
    required: ['WebPage'],
    recommended: ['Product', 'ItemList'],
    description: 'Feature pages benefit from Product or WebPage schema'
  },
  '/guides': {
    required: ['Article', 'HowTo'],
    recommended: ['BreadcrumbList'],
    description: 'Guide pages should use Article or HowTo schema'
  },
  '.*': {
    required: ['WebPage'],
    recommended: ['BreadcrumbList'],
    description: 'All pages should at minimum have WebPage schema'
  }
};

class SchemaAuditor {
  constructor() {
    this.results = {
      totalPages: 0,
      pagesWithSchema: 0,
      pagesWithoutSchema: 0,
      pagesWithCorrectSchema: 0,
      pagesNeedingImprovement: 0,
      pageDetails: [],
      pagesByCategory: {},
      schemaTypeUsage: {},
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get schema recommendations for a route
   */
  getRecommendationsForRoute(route) {
    for (const [pattern, recommendation] of Object.entries(schemaRecommendations)) {
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(route)) {
        return recommendation;
      }
    }
    return schemaRecommendations['.*'];
  }

  /**
   * Find all page components
   */
  async findPages() {
    const patterns = [
      'src/pages/**/*.tsx',
      'src/pages/**/*.jsx',
    ];

    const pages = [];
    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: process.cwd() });
      pages.push(...files);
    }

    return pages;
  }

  /**
   * Extract route path from file path
   */
  getRouteFromPath(filePath) {
    let route = filePath
      .replace(/^src\/pages\//, '')
      .replace(/\.(tsx|jsx)$/, '');

    if (route === 'Index') {
      return '/';
    }

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
    const recommendations = this.getRecommendationsForRoute(route);

    const schemaTypes = [];
    let hasSchema = false;

    // Check for Helmet with JSON-LD
    if (/<script type="application\/ld\+json">/.test(content) && /"@context":\s*"https?:\/\/schema\.org"/.test(content)) {
      hasSchema = true;

      // Detect all schema types
      const typeMatches = content.match(/"@type":\s*"(\w+)"/g);
      if (typeMatches) {
        typeMatches.forEach(match => {
          const type = match.match(/"@type":\s*"(\w+)"/)[1];
          if (!schemaTypes.includes(type)) {
            schemaTypes.push(type);
          }
        });
      }
    }

    // Determine status
    let status = 'missing';
    let missingTypes = [];
    let additionalRecommendations = [];

    if (hasSchema) {
      const hasAllRequired = recommendations.required.every(type => schemaTypes.includes(type));
      const hasRecommended = recommendations.recommended.some(type => schemaTypes.includes(type));

      if (hasAllRequired && hasRecommended) {
        status = 'excellent';
      } else if (hasAllRequired) {
        status = 'good';
        additionalRecommendations = recommendations.recommended.filter(type => !schemaTypes.includes(type));
      } else {
        status = 'needs-improvement';
        missingTypes = recommendations.required.filter(type => !schemaTypes.includes(type));
      }
    } else {
      missingTypes = recommendations.required;
      additionalRecommendations = recommendations.recommended;
    }

    return {
      filePath,
      route,
      url: `https://smartrvhub.com${route}`,
      hasSchema,
      schemaTypes,
      status,
      recommendations,
      missingTypes,
      additionalRecommendations,
    };
  }

  /**
   * Run the audit
   */
  async runAudit() {
    console.log('\n🔍 Running comprehensive schema audit...\n');

    const pages = await this.findPages();
    this.results.totalPages = pages.length;

    for (const page of pages) {
      const analysis = this.analyzePage(page);
      this.results.pageDetails.push(analysis);

      // Update counters
      if (analysis.hasSchema) {
        this.results.pagesWithSchema++;
      } else {
        this.results.pagesWithoutSchema++;
      }

      if (analysis.status === 'excellent') {
        this.results.pagesWithCorrectSchema++;
      } else if (analysis.status === 'good' || analysis.status === 'needs-improvement') {
        this.results.pagesNeedingImprovement++;
      }

      // Track schema type usage
      analysis.schemaTypes.forEach(type => {
        this.results.schemaTypeUsage[type] = (this.results.schemaTypeUsage[type] || 0) + 1;
      });

      // Categorize by route
      const category = this.getCategoryFromRoute(analysis.route);
      if (!this.results.pagesByCategory[category]) {
        this.results.pagesByCategory[category] = {
          total: 0,
          excellent: 0,
          good: 0,
          needsImprovement: 0,
          missing: 0,
        };
      }
      this.results.pagesByCategory[category].total++;
      if (analysis.status === 'excellent') this.results.pagesByCategory[category].excellent++;
      else if (analysis.status === 'good') this.results.pagesByCategory[category].good++;
      else if (analysis.status === 'needs-improvement') this.results.pagesByCategory[category].needsImprovement++;
      else this.results.pagesByCategory[category].missing++;
    }

    // Sort pages by status (worst first)
    this.results.pageDetails.sort((a, b) => {
      const statusOrder = { 'missing': 0, 'needs-improvement': 1, 'good': 2, 'excellent': 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    this.printResults();
    this.saveReports();
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
    console.log('✅ Audit complete!\n');
    console.log(`📊 Analyzed ${this.results.totalPages} pages`);
    console.log(`✓  ${this.results.pagesWithCorrectSchema} pages have excellent schema`);
    console.log(`⚠  ${this.results.pagesNeedingImprovement} pages need improvement`);
    console.log(`✗  ${this.results.pagesWithoutSchema} pages missing schema\n`);
  }

  /**
   * Save reports
   */
  saveReports() {
    const reportDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Save JSON
    const jsonPath = path.join(reportDir, 'schema-audit.json');
    fs.writeFileSync(jsonPath, JSON.stringify(this.results, null, 2));
    console.log(`💾 JSON report: ${jsonPath}`);

    // Save HTML
    const htmlPath = path.join(reportDir, 'schema-audit.html');
    fs.writeFileSync(htmlPath, this.generateHTMLReport());
    console.log(`🎨 HTML report: ${htmlPath}`);

    // Save markdown
    const mdPath = path.join(reportDir, 'schema-audit.md');
    fs.writeFileSync(mdPath, this.generateMarkdownReport());
    console.log(`📄 Markdown report: ${mdPath}`);

    console.log(`\n✨ Open ${htmlPath} in your browser for the visual report!\n`);
  }

  /**
   * Generate beautiful HTML report
   */
  generateHTMLReport() {
    const coveragePercent = Math.round((this.results.pagesWithSchema / this.results.totalPages) * 100);
    const excellentPercent = Math.round((this.results.pagesWithCorrectSchema / this.results.totalPages) * 100);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schema Audit Report - Smart RV Portal</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      line-height: 1.6;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem;
      text-align: center;
    }
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }
    .timestamp {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 1rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
      background: #f8f9fa;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .stat-label {
      color: #6c757d;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .excellent { color: #28a745; }
    .good { color: #17a2b8; }
    .warning { color: #ffc107; }
    .danger { color: #dc3545; }

    .progress-bar {
      width: 100%;
      height: 30px;
      background: #e9ecef;
      border-radius: 15px;
      overflow: hidden;
      margin: 1rem 0;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #28a745, #20c997);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      transition: width 1s ease;
    }

    .content {
      padding: 2rem;
    }
    .section {
      margin-bottom: 3rem;
    }
    .section-title {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #2d3748;
      border-bottom: 3px solid #667eea;
      padding-bottom: 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
    }
    td {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
    }
    tr:hover {
      background: #f8f9fa;
    }

    .status-badge {
      display: inline-block;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-excellent {
      background: #d4edda;
      color: #155724;
    }
    .status-good {
      background: #d1ecf1;
      color: #0c5460;
    }
    .status-needs-improvement {
      background: #fff3cd;
      color: #856404;
    }
    .status-missing {
      background: #f8d7da;
      color: #721c24;
    }

    .schema-tag {
      display: inline-block;
      background: #e7f3ff;
      color: #0066cc;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin: 0.2rem;
      font-family: 'Courier New', monospace;
    }
    .missing-tag {
      background: #ffe0e0;
      color: #cc0000;
    }
    .recommended-tag {
      background: #fff4e0;
      color: #cc8800;
    }

    .url-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .url-link:hover {
      text-decoration: underline;
    }

    .file-path {
      color: #6c757d;
      font-size: 0.85rem;
      font-family: 'Courier New', monospace;
    }

    .chart-container {
      margin: 2rem 0;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .action-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin: 2rem 0;
    }
    .action-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .action-card ul {
      list-style: none;
      padding-left: 0;
    }
    .action-card li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
    }
    .action-card li:before {
      content: "→";
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔍 Schema Audit Report</h1>
      <p>Smart RV Portal - Comprehensive Schema.org Analysis</p>
      <div class="timestamp">Generated: ${new Date(this.results.timestamp).toLocaleString()}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${this.results.totalPages}</div>
        <div class="stat-label">Total Pages</div>
      </div>
      <div class="stat-card">
        <div class="stat-number excellent">${this.results.pagesWithCorrectSchema}</div>
        <div class="stat-label">Excellent</div>
      </div>
      <div class="stat-card">
        <div class="stat-number warning">${this.results.pagesNeedingImprovement}</div>
        <div class="stat-label">Needs Work</div>
      </div>
      <div class="stat-card">
        <div class="stat-number danger">${this.results.pagesWithoutSchema}</div>
        <div class="stat-label">Missing Schema</div>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <h2 class="section-title">📊 Overall Coverage</h2>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${coveragePercent}%">
            ${coveragePercent}% Coverage
          </div>
        </div>
        <p style="margin-top: 1rem; color: #6c757d;">
          ${this.results.pagesWithSchema} of ${this.results.totalPages} pages have schema markup
        </p>
      </div>

      ${this.generatePageDetailsHTML()}

      ${this.generateCategoryBreakdownHTML()}

      ${this.generateSchemaTypesHTML()}

      ${this.generateActionItemsHTML()}
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Generate page details table HTML
   */
  generatePageDetailsHTML() {
    let html = `
      <div class="section">
        <h2 class="section-title">📄 Page Details</h2>
        <table>
          <thead>
            <tr>
              <th>Page URL</th>
              <th>Status</th>
              <th>Current Schema</th>
              <th>Missing / Recommended</th>
            </tr>
          </thead>
          <tbody>
    `;

    this.results.pageDetails.forEach(page => {
      const statusClass = `status-${page.status}`;
      const statusText = {
        'excellent': '✓ Excellent',
        'good': '✓ Good',
        'needs-improvement': '⚠ Needs Work',
        'missing': '✗ Missing'
      }[page.status];

      html += `
        <tr>
          <td>
            <a href="${page.url}" class="url-link" target="_blank">${page.route}</a>
            <div class="file-path">${page.filePath}</div>
          </td>
          <td>
            <span class="status-badge ${statusClass}">${statusText}</span>
          </td>
          <td>
            ${page.schemaTypes.length > 0
              ? page.schemaTypes.map(type => `<span class="schema-tag">${type}</span>`).join(' ')
              : '<span style="color: #999;">None</span>'}
          </td>
          <td>
            ${page.missingTypes.length > 0
              ? page.missingTypes.map(type => `<span class="schema-tag missing-tag">Missing: ${type}</span>`).join(' ')
              : ''}
            ${page.additionalRecommendations.length > 0
              ? page.additionalRecommendations.map(type => `<span class="schema-tag recommended-tag">Add: ${type}</span>`).join(' ')
              : ''}
            ${page.missingTypes.length === 0 && page.additionalRecommendations.length === 0
              ? '<span style="color: #28a745;">✓ Complete</span>'
              : ''}
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    return html;
  }

  /**
   * Generate category breakdown HTML
   */
  generateCategoryBreakdownHTML() {
    let html = `
      <div class="section">
        <h2 class="section-title">📁 By Category</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
              <th>Excellent</th>
              <th>Good</th>
              <th>Needs Work</th>
              <th>Missing</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
    `;

    Object.entries(this.results.pagesByCategory)
      .sort((a, b) => b[1].total - a[1].total)
      .forEach(([category, stats]) => {
        const healthPercent = Math.round(((stats.excellent + stats.good) / stats.total) * 100);
        const healthColor = healthPercent >= 80 ? '#28a745' : healthPercent >= 50 ? '#ffc107' : '#dc3545';

        html += `
          <tr>
            <td><strong>${category}</strong></td>
            <td>${stats.total}</td>
            <td><span class="excellent">${stats.excellent}</span></td>
            <td><span class="good">${stats.good}</span></td>
            <td><span class="warning">${stats.needsImprovement}</span></td>
            <td><span class="danger">${stats.missing}</span></td>
            <td>
              <div style="background: #e9ecef; border-radius: 10px; overflow: hidden; height: 20px;">
                <div style="background: ${healthColor}; width: ${healthPercent}%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: 600;">
                  ${healthPercent}%
                </div>
              </div>
            </td>
          </tr>
        `;
      });

    html += `
          </tbody>
        </table>
      </div>
    `;

    return html;
  }

  /**
   * Generate schema types usage HTML
   */
  generateSchemaTypesHTML() {
    let html = `
      <div class="section">
        <h2 class="section-title">🏷️ Schema Types in Use</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
    `;

    Object.entries(this.results.schemaTypeUsage)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        html += `
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; font-weight: 700; color: #667eea;">${count}</div>
            <div style="color: #6c757d; font-size: 0.9rem;">${type}</div>
          </div>
        `;
      });

    html += `
        </div>
      </div>
    `;

    return html;
  }

  /**
   * Generate action items HTML
   */
  generateActionItemsHTML() {
    const criticalPages = this.results.pageDetails.filter(p => p.status === 'missing').slice(0, 10);
    const needsWorkPages = this.results.pageDetails.filter(p => p.status === 'needs-improvement').slice(0, 10);

    return `
      <div class="action-card">
        <h3>🎯 Next Steps</h3>
        <ul>
          ${criticalPages.length > 0 ? `<li><strong>Priority 1:</strong> Add schema to ${criticalPages.length} pages without any markup</li>` : ''}
          ${needsWorkPages.length > 0 ? `<li><strong>Priority 2:</strong> Complete schema on ${needsWorkPages.length} pages with partial markup</li>` : ''}
          <li><strong>Review:</strong> Check recommended schema types for better SEO results</li>
          <li><strong>Test:</strong> Validate schema with Google Rich Results Test</li>
          <li><strong>Monitor:</strong> This audit runs automatically every Monday</li>
        </ul>
      </div>
    `;
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport() {
    // Keep the existing markdown generation logic
    return `# Schema Audit Report\n\nGenerated: ${new Date(this.results.timestamp).toLocaleString()}\n\n## Summary\n\n- Total Pages: ${this.results.totalPages}\n- Excellent: ${this.results.pagesWithCorrectSchema}\n- Needs Work: ${this.results.pagesNeedingImprovement}\n- Missing: ${this.results.pagesWithoutSchema}`;
  }
}

// Run the audit
const auditor = new SchemaAuditor();
auditor.runAudit().catch(error => {
  console.error('❌ Error running audit:', error);
  process.exit(1);
});
