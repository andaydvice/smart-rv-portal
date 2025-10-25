#!/bin/bash

# Setup script to install pre-commit hook with Phase 2 automation
# Run this once: ./setup-hooks.sh

echo "🔧 Installing enhanced pre-commit hook (Phase 2)..."

cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

echo ""
echo "🤖 Running Pre-Commit Quality Control (Phase 2)"
echo "================================================"
echo ""

EXIT_CODE=0

# Step 1: SEO Verification
echo "📋 Step 1/5: Verifying SEO changes..."
if [ -f "./verify-seo-changes.sh" ]; then
  ./verify-seo-changes.sh > /tmp/seo-check.log 2>&1
  if [ $? -ne 0 ]; then
    echo "❌ SEO verification failed!"
    cat /tmp/seo-check.log
    EXIT_CODE=1
  else
    echo "✅ SEO verification passed"
  fi
else
  echo "⚠️  SEO verification script not found"
fi

echo ""

# Step 2: Build Test
echo "🔨 Step 2/5: Testing build..."
npm run build > /tmp/build-test.log 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  tail -20 /tmp/build-test.log
  EXIT_CODE=1
else
  echo "✅ Build successful"
fi

echo ""

# Step 3: Performance Monitoring
echo "⚡ Step 3/5: Performance checks..."
if [ -f "./performance-check.sh" ]; then
  ./performance-check.sh > /tmp/perf-check.log 2>&1
  PERF_EXIT=$?
  if [ $PERF_EXIT -ne 0 ]; then
    echo "❌ Performance checks failed!"
    cat /tmp/perf-check.log
    EXIT_CODE=1
  else
    # Show summary only
    tail -10 /tmp/perf-check.log
  fi
else
  echo "⚠️  Performance check script not found"
fi

echo ""

# Step 4: Link Health Check
echo "🔗 Step 4/5: Link health check..."
if [ -f "./link-health-check.sh" ]; then
  ./link-health-check.sh > /tmp/link-check.log 2>&1
  if [ $? -ne 0 ]; then
    echo "⚠️  Some links may be broken (see log)"
    tail -15 /tmp/link-check.log
    # Don't fail commit, just warn
  else
    echo "✅ Link health check passed"
  fi
else
  echo "⚠️  Link health check script not found"
fi

echo ""

# Step 5: Schema Validation
echo "🔍 Step 5/5: Schema validation..."
if [ -f "./schema-validator.sh" ]; then
  ./schema-validator.sh > /tmp/schema-check.log 2>&1
  if [ $? -ne 0 ]; then
    echo "⚠️  Schema validation warnings (see log)"
    tail -20 /tmp/schema-check.log
    # Don't fail commit, just warn
  else
    echo "✅ Schema validation passed"
  fi
else
  echo "⚠️  Schema validator script not found"
fi

echo ""
echo "================================================"

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All critical pre-commit checks passed!"
  echo "Proceeding with commit..."
  exit 0
else
  echo "❌ Pre-commit checks FAILED"
  echo "Commit blocked. Fix critical issues above."
  echo ""
  echo "To skip checks (not recommended): git commit --no-verify"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit

echo "✅ Enhanced pre-commit hook installed (Phase 2)!"
echo ""
echo "The hook will now run automatically before every commit:"
echo "  1. SEO verification"
echo "  2. Build test"
echo "  3. Performance monitoring"
echo "  4. Link health check"
echo "  5. Schema validation"
echo ""
echo "To test it, try making a commit."
