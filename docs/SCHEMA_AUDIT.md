# Schema.org Audit System

Automated weekly audits to ensure all pages have proper schema.org structured data for optimal SEO performance.

## Overview

The schema audit system automatically checks all pages in the Smart RV Portal for schema.org markup and generates detailed reports. It runs automatically every Monday at 9:00 AM UTC and can also be triggered manually.

## Features

- 📊 **Comprehensive Scanning** - Audits all page components in `src/pages/`
- 🔍 **Schema Detection** - Identifies JSON-LD structured data in Helmet components
- 📈 **Coverage Tracking** - Monitors schema coverage percentage over time
- 🚨 **Automated Alerts** - Creates GitHub issues when coverage drops below 80%
- 📄 **Multiple Report Formats** - Generates JSON, Markdown, and CSV reports
- 📜 **Historical Tracking** - Saves audit history for trend analysis

## How It Works

### Audit Script

The audit script (`scripts/schema-audit.js`) performs the following:

1. **Scans all pages** in `src/pages/**/*.{tsx,jsx}`
2. **Detects schema types** by analyzing file contents for:
   - Helmet components with JSON-LD
   - Schema.org `@type` declarations
   - Common schema types (WebPage, Organization, Product, Article, etc.)
3. **Generates reports** in multiple formats
4. **Categorizes results** by page type

### GitHub Actions Workflow

The workflow (`.github/workflows/schema-audit.yml`) runs:

- **Automatically**: Every Monday at 9:00 AM UTC
- **On push**: When page files or the audit script changes
- **Manually**: Via GitHub Actions UI

#### Workflow Steps

1. Checkout repository
2. Setup Node.js environment
3. Install dependencies
4. Run schema audit script
5. Upload reports as artifacts
6. Commit reports to repository
7. Create GitHub issue if coverage < 80%
8. Post summary to workflow

## Running Locally

### Prerequisites

```bash
npm install
```

### Run Audit

```bash
npm run audit:schema
```

Or directly:

```bash
node scripts/schema-audit.js
```

### Output

The script generates three files in the `reports/` directory:

1. **schema-audit.json** - Full JSON report with all data
2. **schema-audit.html** - Beautiful visual HTML report with charts and recommendations
3. **schema-audit.md** - Markdown report for easy reading

### Example Output

```
========================================
   Schema.org Audit Report
   Smart RV Portal
========================================

Found 70 page components

Analyzing pages...

========================================
   Audit Results
========================================

Overall Statistics:
  Total Pages: 70
  ✓ Pages with Schema: 32 (46%)
  ✗ Pages without Schema: 38 (54%)

By Category:
  models               32/35 (91%)
  calculators          8/8 (100%)
  features             13/13 (100%)
  tools                6/6 (100%)
  guides               8/8 (100%)
  auth                 0/5 (0%)

Pages Missing Schema (38):
  ✗ /auth                                    (src/pages/Auth.tsx)
  ✗ /reset-password                          (src/pages/ResetPassword.tsx)
  ...

✓ Report saved to: reports/schema-audit.json
✓ HTML report saved to: reports/schema-audit.html
✓ Markdown report saved to: reports/schema-audit.md
```

## Report Files

### schema-audit.html ⭐ Recommended

**Beautiful visual report** with interactive elements:

- **Visual Stats Cards** - Total pages, excellent, needs work, missing schema
- **Progress Bars** - Coverage percentage with color coding
- **Detailed Table** - All pages with:
  - Clickable page URLs
  - Color-coded status badges (Excellent, Good, Needs Work, Missing)
  - Current schema tags
  - Missing and recommended schema tags with specific types
- **Category Breakdown** - Health percentages by section
- **Schema Types Usage** - Visual grid of schema types in use
- **Action Items** - Prioritized next steps

Open this file in your browser for the best viewing experience!

### schema-audit.json

Complete audit data in JSON format:

```json
{
  "totalPages": 70,
  "pagesWithSchema": 32,
  "pagesWithoutSchema": 38,
  "pagesByCategory": {
    "models": {
      "total": 35,
      "withSchema": 32,
      "withoutSchema": 3
    }
  },
  "missingSchemaPages": [
    {
      "route": "/auth",
      "file": "src/pages/Auth.tsx"
    }
  ],
  "schemaTypesByPage": {
    "/": ["Organization", "WebPage"],
    "/models": ["Product", "ItemList"]
  },
  "timestamp": "2025-10-24T10:00:00.000Z"
}
```

### schema-audit.md

Human-readable markdown report with tables and statistics.

## GitHub Actions Integration

### Viewing Reports

1. Go to **Actions** tab in GitHub
2. Click on **Weekly Schema Audit** workflow
3. Click on the latest run
4. Download **schema-audit-reports** artifact

### Historical Reports

Historical reports are saved in `reports/history/` with timestamps:

```
reports/
├── schema-audit.json          # Latest report
├── schema-audit.md            # Latest markdown
├── missing-schema.csv         # Latest CSV
└── history/
    ├── schema-audit-2025-10-24.json
    ├── schema-audit-2025-10-31.json
    └── schema-audit-2025-11-07.json
```

### Automated Issues

When schema coverage drops below 80%, the workflow automatically:

1. Creates a GitHub issue with:
   - Current coverage percentage
   - Number of pages missing schema
   - Links to detailed reports
   - Instructions for fixing
2. Updates the issue on subsequent runs
3. Labels the issue: `schema-audit`, `automated`, `seo`, `enhancement`

## Adding Schema to Pages

### Using Helmet Component

```tsx
import { Helmet } from 'react-helmet-async';

const MyPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page Title</title>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Page Title',
            description: 'Page description',
            url: 'https://smartrvhub.com/page-url'
          })}
        </script>
      </Helmet>
      {/* Page content */}
    </Layout>
  );
};
```

### Common Schema Types

- **WebPage** - General pages (tools, calculators, guides)
- **Product** - RV models and product pages
- **Article** - Blog posts and articles
- **ItemList** - Category or listing pages
- **BreadcrumbList** - Pages with breadcrumb navigation
- **Organization** - Homepage and about page
- **FAQPage** - FAQ sections

### Best Practices

1. **Always include**:
   - `@context`: `https://schema.org`
   - `@type`: Appropriate schema type
   - `name`: Page title
   - `description`: Page description
   - `url`: Canonical URL

2. **For Product pages**, add:
   - `brand`, `offers`, `aggregateRating`, `review`

3. **For Article pages**, add:
   - `author`, `datePublished`, `dateModified`, `image`

4. **Test your schema**:
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema Markup Validator](https://validator.schema.org/)

## Configuration

### Changing Schedule

Edit `.github/workflows/schema-audit.yml`:

```yaml
on:
  schedule:
    # Run every Sunday at 8:00 AM UTC
    - cron: '0 8 * * 0'
```

### Coverage Threshold

Default threshold is 80%. To change, edit the workflow:

```yaml
- name: Create issue if coverage drops below threshold
  if: steps.results.outputs.coverage < 80  # Change this value
```

### Excluded Patterns

To exclude certain pages from audit, edit `scripts/schema-audit.js`:

```javascript
findPages() {
  const patterns = [
    'src/pages/**/*.tsx',
    'src/pages/**/*.jsx',
    '!src/pages/admin/**',  // Exclude admin pages
    '!src/pages/test/**',   // Exclude test pages
  ];
}
```

## Troubleshooting

### Audit fails with "command not found"

Ensure you have Node.js installed and run `npm install` first.

### Reports not being generated

Check that the `reports/` directory has write permissions:

```bash
mkdir -p reports
chmod 755 reports
```

### GitHub Actions workflow not running

1. Ensure workflow file is in `.github/workflows/`
2. Check that the repository has Actions enabled
3. Verify the cron syntax is correct
4. Try triggering manually via GitHub UI

### False negatives (schema not detected)

The audit script looks for specific patterns. Ensure your schema:

1. Is within a `<script type="application/ld+json">` tag
2. Uses double quotes for JSON properties
3. Includes `"@context": "https://schema.org"`

## Monitoring & Maintenance

### Weekly Checklist

1. Review automated audit reports
2. Check for any new GitHub issues
3. Fix pages missing schema (if any)
4. Verify schema on newly added pages

### Monthly Review

1. Analyze historical trends
2. Update schema types as needed
3. Review schema best practices
4. Test schema markup with Google tools

### Continuous Improvement

- Add new schema types as page types evolve
- Update audit script for new patterns
- Refine threshold based on your goals
- Integrate with other SEO monitoring tools

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Playground](https://json-ld.org/playground/)
- [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)

## Support

For issues or questions about the schema audit system:

1. Check this documentation
2. Review audit reports in `reports/`
3. Create a GitHub issue with label `schema-audit`
4. Run audit locally with `npm run audit:schema` for debugging

---

*Last updated: October 2025*
