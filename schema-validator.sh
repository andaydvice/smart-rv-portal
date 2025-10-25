#!/bin/bash

# SEO Schema Validator
# Validates schema.org markup in the codebase

echo ""
echo "🔍 SEO SCHEMA VALIDATION"
echo "========================"
echo ""

EXIT_CODE=0

# Check 1: Product Schema in Feature Pages
echo "📦 Check 1/4: Product schema in feature pages..."
FEATURE_PAGES=$(find src/pages/features -name "*.tsx" 2>/dev/null | wc -l)
PAGES_WITH_SCHEMA=0

for file in src/pages/features/*.tsx; do
  if grep -q "productSchema(" "$file" 2>/dev/null; then
    PAGES_WITH_SCHEMA=$((PAGES_WITH_SCHEMA + 1))

    # Validate required fields
    FILENAME=$(basename "$file")
    HAS_NAME=$(grep -A 10 "productSchema(" "$file" | grep -c "name:" || echo "0")
    HAS_DESCRIPTION=$(grep -A 10 "productSchema(" "$file" | grep -c "description:" || echo "0")
    HAS_BRAND=$(grep -A 10 "productSchema(" "$file" | grep -c "brand:" || echo "0")

    if [ $HAS_NAME -eq 0 ] || [ $HAS_DESCRIPTION -eq 0 ] || [ $HAS_BRAND -eq 0 ]; then
      echo "  ⚠️  $FILENAME - Missing required Product schema fields"
    fi
  fi
done

echo "  Found Product schema in $PAGES_WITH_SCHEMA/$FEATURE_PAGES feature pages"

if [ $PAGES_WITH_SCHEMA -lt $FEATURE_PAGES ]; then
  echo "  ⚠️  Some feature pages missing Product schema"
fi

echo ""

# Check 2: FAQ Schema
echo "❓ Check 2/4: FAQ schema validation..."
FAQ_SCHEMAS=$(grep -r "faqSchema(" src/ 2>/dev/null | wc -l)

if [ $FAQ_SCHEMAS -gt 0 ]; then
  echo "  ✅ Found FAQ schema in $FAQ_SCHEMAS locations"

  # Check for proper FAQ structure
  FILES_WITH_FAQ=$(grep -rl "faqSchema(" src/ 2>/dev/null)
  for file in $FILES_WITH_FAQ; do
    # Verify FAQ has question and answer fields
    if ! grep -A 20 "faqSchema(" "$file" | grep -q "question:" 2>/dev/null; then
      echo "  ⚠️  $(basename $file) - FAQ missing 'question' field"
    fi
    if ! grep -A 20 "faqSchema(" "$file" | grep -q "answer:" 2>/dev/null; then
      echo "  ⚠️  $(basename $file) - FAQ missing 'answer' field"
    fi
  done
else
  echo "  ℹ️  No FAQ schemas found"
fi

echo ""

# Check 3: Breadcrumb Schema
echo "🍞 Check 3/4: Breadcrumb components..."
PAGES_WITH_BREADCRUMBS=$(grep -r "<Breadcrumbs" src/pages 2>/dev/null | wc -l)

echo "  Found Breadcrumbs component in $PAGES_WITH_BREADCRUMBS pages"

# Check if breadcrumbs have proper items structure
INVALID_BREADCRUMBS=$(grep -r "<Breadcrumbs" src/pages 2>/dev/null | grep -v "items=" | wc -l)
if [ $INVALID_BREADCRUMBS -gt 0 ]; then
  echo "  ⚠️  $INVALID_BREADCRUMBS breadcrumb components missing 'items' prop"
fi

echo ""

# Check 4: Meta Tags & Helmet
echo "📝 Check 4/4: SEO meta tags..."
PAGES_WITH_HELMET=$(grep -r "<Helmet>" src/pages 2>/dev/null | wc -l)
PAGES_WITH_TITLE=$(grep -r "<title>" src/pages 2>/dev/null | wc -l)
PAGES_WITH_DESCRIPTION=$(grep -r "meta name=\"description\"" src/pages 2>/dev/null | wc -l)
PAGES_WITH_CANONICAL=$(grep -r "rel=\"canonical\"" src/pages 2>/dev/null | wc -l)

echo "  Pages with Helmet: $PAGES_WITH_HELMET"
echo "  Pages with title tag: $PAGES_WITH_TITLE"
echo "  Pages with meta description: $PAGES_WITH_DESCRIPTION"
echo "  Pages with canonical URL: $PAGES_WITH_CANONICAL"

if [ $PAGES_WITH_DESCRIPTION -lt $PAGES_WITH_HELMET ]; then
  echo "  ⚠️  Some pages missing meta descriptions"
fi

if [ $PAGES_WITH_CANONICAL -lt $PAGES_WITH_HELMET ]; then
  echo "  ⚠️  Some pages missing canonical URLs"
fi

echo ""

# Schema.org Types Check
echo "📊 Schema Types Found:"
echo "  - Product: $(grep -r '@type.*Product' src/ 2>/dev/null | wc -l)"
echo "  - FAQPage: $(grep -r '@type.*FAQPage' src/ 2>/dev/null | wc -l)"
echo "  - WebPage: $(grep -r '@type.*WebPage' src/ 2>/dev/null | wc -l)"
echo "  - BreadcrumbList: $(grep -r '@type.*BreadcrumbList' src/ 2>/dev/null | wc -l)"
echo "  - Organization: $(grep -r '@type.*Organization' src/ 2>/dev/null | wc -l)"

echo ""
echo "========================"

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Schema validation complete!"
  echo ""
  echo "Recommendations:"
  echo "  - Ensure all product pages have Product schema"
  echo "  - Add FAQ schema to pages with common questions"
  echo "  - Include breadcrumbs on all navigable pages"
  echo "  - Always include meta descriptions and canonical URLs"
else
  echo "❌ Schema validation found issues"
  echo "Fix warnings above for better SEO"
fi

echo ""
exit $EXIT_CODE
