#!/bin/bash
# Pre-commit Quality Check Script
# Run this before every commit

set -e

echo "🔍 Running pre-commit quality checks..."

# 1. Check for pages missing Layout component
echo "Checking for pages without Layout component..."
PAGES_WITHOUT_LAYOUT=$(find src/pages -name "*.tsx" -type f -exec grep -L "import Layout from" {} \; | grep -v "Index.tsx" | grep -v "ErrorPage.tsx" || true)

if [ -n "$PAGES_WITHOUT_LAYOUT" ]; then
  echo "❌ ERROR: The following pages are missing Layout import:"
  echo "$PAGES_WITHOUT_LAYOUT"
  echo ""
  echo "Fix: Add 'import Layout from \"@/components/layout/Layout\";' and wrap content in <Layout>"
  exit 1
fi

# 2. Run TypeScript check
echo "Running TypeScript check..."
if ! npx tsc --noEmit --skipLibCheck; then
  echo "❌ TypeScript errors found. Fix them before committing."
  exit 1
fi

# 3. Run build test
echo "Running build test..."
if ! npm run build > /tmp/build.log 2>&1; then
  echo "❌ Build failed. Check /tmp/build.log for details."
  tail -50 /tmp/build.log
  exit 1
fi

# 4. Check for console.log in production code (warning only)
echo "Checking for console.log statements..."
CONSOLE_LOGS=$(grep -r "console.log" src/ --include="*.tsx" --include="*.ts" | grep -v "console.warn" | grep -v "console.error" || true)
if [ -n "$CONSOLE_LOGS" ]; then
  echo "⚠️  WARNING: Found console.log statements (consider removing):"
  echo "$CONSOLE_LOGS" | head -5
fi

echo ""
echo "✅ All quality checks passed!"
echo ""
echo "Next steps:"
echo "1. Test locally: npm run preview"
echo "2. Visit your routes and verify they load correctly"
echo "3. Check browser console for errors"
echo "4. Verify site navigation and footer appear"
