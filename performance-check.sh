#!/bin/bash

# Performance Monitoring Script
# Checks bundle size, images, and performance metrics

echo ""
echo "⚡ PERFORMANCE MONITORING"
echo "========================"
echo ""

EXIT_CODE=0

# Check 1: Bundle Size
echo "📦 Check 1/4: Bundle size analysis..."
if [ -d "dist" ]; then
  TOTAL_SIZE=$(du -sh dist | cut -f1)
  TOTAL_BYTES=$(du -sb dist | cut -f1)

  echo "Total bundle size: $TOTAL_SIZE"

  # Warning if over 10MB
  if [ $TOTAL_BYTES -gt 10485760 ]; then
    echo "⚠️  WARNING: Bundle is large (> 10MB)"
    echo "   Consider code splitting or lazy loading"
  fi

  # Critical if over 20MB
  if [ $TOTAL_BYTES -gt 20971520 ]; then
    echo "❌ CRITICAL: Bundle is too large (> 20MB)"
    EXIT_CODE=1
  fi

  # Show largest files
  echo ""
  echo "Largest files:"
  find dist -type f -exec du -h {} + | sort -rh | head -5
else
  echo "⚠️  Dist folder not found - run 'npm run build' first"
fi

echo ""

# Check 2: Image Optimization
echo "🖼️  Check 2/4: Image optimization..."
LARGE_IMAGES=$(find public/lovable-uploads -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k 2>/dev/null | wc -l)

if [ $LARGE_IMAGES -gt 0 ]; then
  echo "⚠️  Found $LARGE_IMAGES images larger than 500KB:"
  find public/lovable-uploads -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k 2>/dev/null | while read img; do
    SIZE=$(du -h "$img" | cut -f1)
    echo "   - $img ($SIZE)"
  done
  echo ""
  echo "Consider optimizing these images with:"
  echo "  - ImageOptim, TinyPNG, or similar tools"
  echo "  - Convert to WebP format"
else
  echo "✅ No oversized images found"
fi

echo ""

# Check 3: Dependencies Size
echo "📚 Check 3/4: Dependencies analysis..."
if [ -f "package.json" ]; then
  DEPS_COUNT=$(cat package.json | grep -c '"' || echo "0")
  echo "Total dependencies: $DEPS_COUNT"

  # Check for common bloat packages
  if grep -q '"moment"' package.json; then
    echo "⚠️  WARNING: 'moment' is large - consider 'date-fns' instead"
  fi

  if grep -q '"lodash"' package.json; then
    echo "ℹ️  INFO: Using 'lodash' - ensure tree-shaking is enabled"
  fi

  echo "✅ Dependencies check complete"
fi

echo ""

# Check 4: Critical CSS/JS Files
echo "⚙️  Check 4/4: Critical assets..."
if [ -d "dist/assets" ]; then
  JS_FILES=$(find dist/assets -name "*.js" -type f | wc -l)
  CSS_FILES=$(find dist/assets -name "*.css" -type f | wc -l)

  echo "JavaScript bundles: $JS_FILES"
  echo "CSS bundles: $CSS_FILES"

  # Find largest JS file
  LARGEST_JS=$(find dist/assets -name "*.js" -type f -exec du -h {} + | sort -rh | head -1)
  echo "Largest JS: $LARGEST_JS"

  # Check if main bundle is too large
  MAIN_JS_SIZE=$(find dist/assets -name "index*.js" -type f -exec du -b {} + | cut -f1 | head -1 || echo "0")
  if [ $MAIN_JS_SIZE -gt 1048576 ]; then
    echo "⚠️  WARNING: Main JS bundle > 1MB - consider code splitting"
  fi

  echo "✅ Assets check complete"
fi

echo ""
echo "========================"

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Performance checks passed!"
  echo ""
  echo "Recommendations:"
  echo "  - Keep bundle size under 10MB"
  echo "  - Optimize images over 500KB"
  echo "  - Use code splitting for large bundles"
  echo "  - Enable gzip/brotli compression"
else
  echo "❌ Performance checks FAILED"
  echo "Fix critical issues above before deploying"
fi

echo ""
exit $EXIT_CODE
