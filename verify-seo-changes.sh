#!/bin/bash

# SEO Implementation Verification Script
# Run this to verify all claimed SEO changes are actually implemented

echo "=========================================="
echo "SEO CHANGES VERIFICATION"
echo "=========================================="
echo ""

# Feature Pages Check
echo "📄 FEATURE PAGES (13 total):"
echo "----------------------------"
total_feature_pages=0
pages_with_breadcrumbs=0
pages_with_schema=0

for file in src/pages/features/*.tsx; do
  filename=$(basename "$file")
  total_feature_pages=$((total_feature_pages + 1))

  has_breadcrumb_rendered=$(grep -c "<Breadcrumbs" "$file" 2>/dev/null || echo "0")
  has_product_schema=$(grep -c "productSchema(" "$file" 2>/dev/null || echo "0")

  if [ "$has_breadcrumb_rendered" -gt "0" ]; then
    pages_with_breadcrumbs=$((pages_with_breadcrumbs + 1))
  fi

  if [ "$has_product_schema" -gt "0" ]; then
    pages_with_schema=$((pages_with_schema + 1))
  fi

  status=""
  if [ "$has_breadcrumb_rendered" -gt "0" ] && [ "$has_product_schema" -gt "0" ]; then
    status="✅"
  else
    status="❌"
    echo "  $status $filename"
    [ "$has_breadcrumb_rendered" -eq "0" ] && echo "     Missing: Breadcrumbs rendered"
    [ "$has_product_schema" -eq "0" ] && echo "     Missing: Product schema"
  fi
done

echo ""
echo "Summary: $pages_with_breadcrumbs/$total_feature_pages have breadcrumbs"
echo "Summary: $pages_with_schema/$total_feature_pages have Product schema"
echo ""

# Model Pages Check
echo "🚐 MODEL PAGES (3 total):"
echo "-------------------------"
total_model_pages=0
models_with_breadcrumbs=0

for file in src/pages/models/{CompactModel,LuxuryModel,AdventureModel}.tsx; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    total_model_pages=$((total_model_pages + 1))

    has_breadcrumb=$(grep -c "<Breadcrumbs" "$file" 2>/dev/null || echo "0")

    if [ "$has_breadcrumb" -gt "0" ]; then
      models_with_breadcrumbs=$((models_with_breadcrumbs + 1))
      echo "  ✅ $filename"
    else
      echo "  ❌ $filename - Missing breadcrumbs"
    fi
  fi
done

echo ""
echo "Summary: $models_with_breadcrumbs/$total_model_pages have breadcrumbs"
echo ""

# Blog Posts Check
echo "📝 BLOG POSTS (with money page links):"
echo "--------------------------------------"
blog_count=0

for file in src/data/blog/tech/*.ts src/data/blog/travel/*.ts; do
  link_count=$(grep -c "/pricing\|/products\|/contact" "$file" 2>/dev/null || echo "0")
  if [ "$link_count" -gt "0" ]; then
    blog_count=$((blog_count + 1))
    echo "  ✅ $(basename $file) - $link_count links"
  fi
done

echo ""
echo "Summary: $blog_count blog posts have money page links"
echo ""

# Final Summary
echo "=========================================="
echo "FINAL VERIFICATION SUMMARY"
echo "=========================================="
echo "Feature Pages:"
echo "  - Breadcrumbs: $pages_with_breadcrumbs/13"
echo "  - Product Schema: $pages_with_schema/13"
echo ""
echo "Model Pages:"
echo "  - Breadcrumbs: $models_with_breadcrumbs/3"
echo ""
echo "Blog Posts:"
echo "  - With money page links: $blog_count"
echo ""

if [ "$pages_with_breadcrumbs" -eq "13" ] && [ "$pages_with_schema" -eq "13" ] && [ "$models_with_breadcrumbs" -eq "3" ] && [ "$blog_count" -ge "8" ]; then
  echo "✅ ALL SEO CHANGES VERIFIED!"
else
  echo "❌ SOME CHANGES MISSING - See details above"
fi
