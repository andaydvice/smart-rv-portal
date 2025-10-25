#!/bin/bash

# Lighthouse Performance Monitoring
# Runs Lighthouse audits and checks scores against thresholds

echo ""
echo "🚦 LIGHTHOUSE PERFORMANCE MONITORING"
echo "====================================="
echo ""

EXIT_CODE=0

# Configuration
SITE_URL="${1:-https://smartrvhub.com}"
MIN_SCORE_FAIL=75    # Fail if any score below this
MIN_SCORE_WARN=85    # Warn if any score below this

# Check if Lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo "📦 Installing Lighthouse CLI..."
    npm install -g @lhci/cli@latest lighthouse
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Lighthouse"
        exit 1
    fi
fi

echo "🔍 Running Lighthouse audit on: $SITE_URL"
echo ""

# Create temp directory for reports
REPORT_DIR=$(mktemp -d)
REPORT_FILE="$REPORT_DIR/lighthouse-report.json"

# Run Lighthouse with headless Chrome
lighthouse "$SITE_URL" \
  --output=json \
  --output-path="$REPORT_FILE" \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
  --quiet \
  2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Lighthouse audit failed to run"
    echo "   Make sure the site is accessible at: $SITE_URL"
    rm -rf "$REPORT_DIR"
    exit 1
fi

# Extract scores from JSON report
PERFORMANCE=$(cat "$REPORT_FILE" | grep -o '"performance":[0-9.]*' | head -1 | cut -d: -f2)
ACCESSIBILITY=$(cat "$REPORT_FILE" | grep -o '"accessibility":[0-9.]*' | head -1 | cut -d: -f2)
BEST_PRACTICES=$(cat "$REPORT_FILE" | grep -o '"best-practices":[0-9.]*' | head -1 | cut -d: -f2)
SEO=$(cat "$REPORT_FILE" | grep -o '"seo":[0-9.]*' | head -1 | cut -d: -f2)

# Convert to percentages (Lighthouse returns 0-1 scale)
PERF_SCORE=$(echo "scale=0; $PERFORMANCE * 100 / 1" | bc 2>/dev/null || echo "0")
A11Y_SCORE=$(echo "scale=0; $ACCESSIBILITY * 100 / 1" | bc 2>/dev/null || echo "0")
BP_SCORE=$(echo "scale=0; $BEST_PRACTICES * 100 / 1" | bc 2>/dev/null || echo "0")
SEO_SCORE=$(echo "scale=0; $SEO * 100 / 1" | bc 2>/dev/null || echo "0")

# Display results
echo "📊 LIGHTHOUSE SCORES:"
echo "===================="
echo ""

# Helper function to display score with emoji
show_score() {
    local name=$1
    local score=$2
    local emoji="✅"
    local status=""

    if [ $score -lt $MIN_SCORE_FAIL ]; then
        emoji="❌"
        status=" FAIL"
        EXIT_CODE=1
    elif [ $score -lt $MIN_SCORE_WARN ]; then
        emoji="⚠️ "
        status=" WARNING"
    fi

    printf "  %s %-20s %3d/100 %s\n" "$emoji" "$name:" "$score" "$status"
}

show_score "Performance" $PERF_SCORE
show_score "Accessibility" $A11Y_SCORE
show_score "Best Practices" $BP_SCORE
show_score "SEO" $SEO_SCORE

echo ""
echo "===================="

# Calculate average score
AVG_SCORE=$(( (PERF_SCORE + A11Y_SCORE + BP_SCORE + SEO_SCORE) / 4 ))
echo "Average Score: $AVG_SCORE/100"
echo ""

# Thresholds info
echo "Score Thresholds:"
echo "  ✅ Good: ≥ $MIN_SCORE_WARN"
echo "  ⚠️  Warning: $MIN_SCORE_FAIL-$(($MIN_SCORE_WARN - 1))"
echo "  ❌ Fail: < $MIN_SCORE_FAIL"
echo ""

# Final status
if [ $EXIT_CODE -eq 0 ]; then
    if [ $AVG_SCORE -ge $MIN_SCORE_WARN ]; then
        echo "✅ All Lighthouse scores are excellent!"
    else
        echo "⚠️  Lighthouse scores are acceptable but could be improved"
    fi
else
    echo "❌ Lighthouse scores FAILED"
    echo "   One or more scores below minimum threshold ($MIN_SCORE_FAIL)"
    echo ""
    echo "Recommendations:"

    if [ $PERF_SCORE -lt $MIN_SCORE_WARN ]; then
        echo "  📦 Performance:"
        echo "     - Optimize images (use WebP, lazy loading)"
        echo "     - Enable compression (gzip/brotli)"
        echo "     - Minimize JavaScript bundles"
        echo "     - Use code splitting"
    fi

    if [ $A11Y_SCORE -lt $MIN_SCORE_WARN ]; then
        echo "  ♿ Accessibility:"
        echo "     - Add alt text to images"
        echo "     - Ensure proper color contrast"
        echo "     - Add ARIA labels where needed"
        echo "     - Test with screen readers"
    fi

    if [ $BP_SCORE -lt $MIN_SCORE_WARN ]; then
        echo "  🔒 Best Practices:"
        echo "     - Update dependencies"
        echo "     - Fix console errors"
        echo "     - Use HTTPS everywhere"
        echo "     - Add CSP headers"
    fi

    if [ $SEO_SCORE -lt $MIN_SCORE_WARN ]; then
        echo "  🔍 SEO:"
        echo "     - Add meta descriptions"
        echo "     - Use proper heading hierarchy"
        echo "     - Add structured data"
        echo "     - Fix crawlability issues"
    fi
fi

# Save detailed report (optional)
if [ -n "$LIGHTHOUSE_REPORT_PATH" ]; then
    cp "$REPORT_FILE" "$LIGHTHOUSE_REPORT_PATH"
    echo ""
    echo "📄 Detailed report saved to: $LIGHTHOUSE_REPORT_PATH"
fi

# Cleanup
rm -rf "$REPORT_DIR"

echo ""
exit $EXIT_CODE
