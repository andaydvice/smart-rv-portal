#!/bin/bash

# Link Health Checker
# Scans codebase for internal links and checks if they exist

echo ""
echo "🔗 LINK HEALTH CHECK"
echo "===================="
echo ""

EXIT_CODE=0
BROKEN_LINKS=0
TOTAL_LINKS=0

# Find all internal links in TypeScript/TSX files
echo "📋 Scanning for internal links..."
echo ""

# Common link patterns to check
LINK_PATTERNS=(
  "to=\"/"
  "href=\"/"
  "Link.*to.*/"
  "navigate\(\"/"
)

declare -A FOUND_LINKS

# Scan TypeScript/TSX files for links
for pattern in "${LINK_PATTERNS[@]}"; do
  while IFS= read -r line; do
    # Extract the link path
    LINK=$(echo "$line" | grep -oP '(?<=")[^"]*(?=")' | grep '^/' | head -1)
    if [ ! -z "$LINK" ]; then
      FOUND_LINKS["$LINK"]=1
    fi
  done < <(grep -rh "$pattern" src/ 2>/dev/null || true)
done

echo "Found ${#FOUND_LINKS[@]} unique internal links"
echo ""

# Define valid routes (pages that exist)
VALID_ROUTES=(
  "/"
  "/pricing"
  "/products"
  "/contact"
  "/features"
  "/features/power-management"
  "/features/security-system"
  "/features/audio-system"
  "/features/smart-tv"
  "/features/smart-kitchen"
  "/features/climate-control"
  "/features/internet-connectivity"
  "/features/navigation-system"
  "/features/entertainment"
  "/features/remote-control"
  "/features/smart-automation"
  "/features/water-systems"
  "/features/automated-driving"
  "/models"
  "/models/compact"
  "/models/luxury"
  "/models/adventure"
  "/tools"
  "/tools/readiness-assessment"
  "/tools/feature-matcher"
  "/tools/lifestyle-planner"
  "/tools/rv-finder"
  "/tools/technology-checklist"
  "/tools/educational-consultant"
  "/blog"
  "/calculators"
  "/troubleshooting"
)

# Check each found link
echo "Checking links..."
for link in "${!FOUND_LINKS[@]}"; do
  TOTAL_LINKS=$((TOTAL_LINKS + 1))

  # Skip external links, anchors, and query strings
  if [[ $link == http* ]] || [[ $link == \#* ]] || [[ $link == *\?* ]]; then
    continue
  fi

  # Check if link matches any valid route
  VALID=false
  for route in "${VALID_ROUTES[@]}"; do
    if [[ "$link" == "$route" ]] || [[ "$link" == "$route"* ]]; then
      VALID=true
      break
    fi
  done

  if [ "$VALID" = false ]; then
    echo "❌ Potentially broken link: $link"
    BROKEN_LINKS=$((BROKEN_LINKS + 1))
    EXIT_CODE=1
  fi
done

echo ""

# Check for money page links in blog posts
echo "💰 Checking money page links in blog posts..."
BLOG_FILES=$(find src/data/blog -name "*.ts" 2>/dev/null || true)
MISSING_LINKS=0

for blog in $BLOG_FILES; do
  HAS_MONEY_LINK=$(grep -c "/pricing\|/products\|/contact" "$blog" 2>/dev/null || echo "0")
  if [ "$HAS_MONEY_LINK" -eq "0" ]; then
    echo "⚠️  $(basename $blog) has no money page links"
    MISSING_LINKS=$((MISSING_LINKS + 1))
  fi
done

echo ""
echo "===================="
echo "SUMMARY:"
echo "  Total links scanned: $TOTAL_LINKS"
echo "  Potentially broken: $BROKEN_LINKS"
echo "  Blog posts without money links: $MISSING_LINKS"
echo ""

if [ $BROKEN_LINKS -gt 0 ]; then
  echo "⚠️  WARNING: Some links may be broken"
  echo "   Review the links above and verify they exist"
elif [ $TOTAL_LINKS -eq 0 ]; then
  echo "ℹ️  No internal links found to check"
else
  echo "✅ All scanned links appear valid"
fi

echo ""
exit $EXIT_CODE
