#!/bin/bash

# Post-Deployment Verification & Automatic Rollback
# Checks live site and rolls back if verification fails

SITE_URL="https://smartrvhub.com"
ROLLBACK_NEEDED=false

echo ""
echo "🔍 POST-DEPLOYMENT VERIFICATION"
echo "================================"
echo "Checking: $SITE_URL"
echo ""

# Wait for deployment to complete
echo "⏳ Waiting 30 seconds for Netlify deployment to stabilize..."
sleep 30

# Test 1: Check if site is reachable
echo "📡 Test 1/5: Site reachability..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL")
if [ "$HTTP_CODE" != "200" ]; then
  echo "❌ FAILED: Site returned HTTP $HTTP_CODE (expected 200)"
  ROLLBACK_NEEDED=true
else
  echo "✅ PASSED: Site is reachable (HTTP 200)"
fi

# Test 2: Check feature page for breadcrumbs
echo ""
echo "🍞 Test 2/5: Breadcrumbs on feature pages..."
FEATURE_PAGE="$SITE_URL/features/power-management"
BREADCRUMB_CHECK=$(curl -s "$FEATURE_PAGE" | grep -c "Breadcrumbs" || echo "0")
if [ "$BREADCRUMB_CHECK" -eq "0" ]; then
  echo "⚠️  WARNING: No breadcrumbs component found in HTML"
  echo "   (Note: Client-side rendering may be normal)"
else
  echo "✅ PASSED: Breadcrumbs component detected"
fi

# Test 3: Check for Product schema
echo ""
echo "📦 Test 3/5: Product schema markup..."
SCHEMA_CHECK=$(curl -s "$FEATURE_PAGE" | grep -c '"@type": "Product"' || echo "0")
if [ "$SCHEMA_CHECK" -eq "0" ]; then
  echo "⚠️  WARNING: Product schema not found in initial HTML"
  echo "   (Note: React-rendered schemas may not appear in source)"
else
  echo "✅ PASSED: Product schema detected"
fi

# Test 4: Check if site has JavaScript errors (by checking if React app loads)
echo ""
echo "⚚ Test 4/5: React app initialization..."
REACT_CHECK=$(curl -s "$SITE_URL" | grep -c 'id="root"' || echo "0")
if [ "$REACT_CHECK" -eq "0" ]; then
  echo "❌ FAILED: React root element not found - app may be broken"
  ROLLBACK_NEEDED=true
else
  echo "✅ PASSED: React root element present"
fi

# Test 5: Check critical assets load
echo ""
echo "📦 Test 5/5: Critical assets..."
ASSET_CHECK=$(curl -s "$SITE_URL" | grep -c 'assets/' || echo "0")
if [ "$ASSET_CHECK" -eq "0" ]; then
  echo "❌ FAILED: No asset bundles found - build may be broken"
  ROLLBACK_NEEDED=true
else
  echo "✅ PASSED: Asset bundles detected"
fi

echo ""
echo "================================"

# Decision: Rollback or Success
if [ "$ROLLBACK_NEEDED" = true ]; then
  echo ""
  echo "🚨 CRITICAL FAILURES DETECTED!"
  echo "================================"
  echo ""
  echo "⚠️  AUTOMATIC ROLLBACK INITIATED"
  echo ""
  echo "To rollback manually via Netlify:"
  echo "1. Go to Netlify dashboard"
  echo "2. Click 'Deploys' tab"
  echo "3. Find previous successful deploy"
  echo "4. Click 'Publish deploy'"
  echo ""
  echo "Or run: netlify rollback (if netlify-cli installed)"
  echo ""

  # If netlify CLI is available, attempt auto-rollback
  if command -v netlify &> /dev/null; then
    echo "🔄 Attempting automatic rollback via Netlify CLI..."
    netlify rollback
    if [ $? -eq 0 ]; then
      echo "✅ Rollback successful!"
    else
      echo "❌ Automatic rollback failed - manual intervention required"
    fi
  else
    echo "ℹ️  Install netlify-cli for automatic rollback: npm install -g netlify-cli"
  fi

  exit 1
else
  echo ""
  echo "✅ ALL CRITICAL TESTS PASSED!"
  echo "================================"
  echo ""
  echo "Deployment verified successfully."
  echo "Site is live and functioning: $SITE_URL"
  echo ""
  exit 0
fi
