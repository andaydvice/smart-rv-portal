#!/bin/bash

# Setup script to install pre-commit hook
# Run this once: ./setup-hooks.sh

echo "🔧 Installing pre-commit hook..."

cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

echo ""
echo "🤖 Running Pre-Commit Quality Control..."
echo "========================================"
echo ""

EXIT_CODE=0

# Run SEO Verification
echo "📋 Step 1/2: Verifying SEO changes..."
if [ -f "./verify-seo-changes.sh" ]; then
  ./verify-seo-changes.sh
  if [ $? -ne 0 ]; then
    echo ""
    echo "❌ SEO verification failed!"
    EXIT_CODE=1
  else
    echo "✅ SEO verification passed"
  fi
fi

echo ""

# Run Build Test
echo "🔨 Step 2/2: Testing build..."
npm run build > /tmp/build-test.log 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  tail -20 /tmp/build-test.log
  EXIT_CODE=1
else
  echo "✅ Build successful"
fi

echo ""
echo "========================================"

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All pre-commit checks passed!"
  exit 0
else
  echo "❌ Pre-commit checks FAILED"
  echo "Commit blocked. Fix issues and try again."
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit

echo "✅ Pre-commit hook installed!"
echo ""
echo "The hook will now run automatically before every commit."
echo "To test it, try making a commit."
