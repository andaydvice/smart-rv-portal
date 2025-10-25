#!/bin/bash

# Image Optimization Script
# Compresses large images in public/lovable-uploads

echo ""
echo "🖼️  IMAGE OPTIMIZATION"
echo "===================="
echo ""

UPLOAD_DIR="public/lovable-uploads"
OPTIMIZED=0
SKIPPED=0

if [ ! -d "$UPLOAD_DIR" ]; then
  echo "❌ Upload directory not found: $UPLOAD_DIR"
  exit 1
fi

# Check for optimization tools
if ! command -v optipng &> /dev/null && ! command -v convert &> /dev/null; then
  echo "📦 Installing image optimization tools..."
  echo ""
  echo "Run one of these commands:"
  echo "  macOS:    brew install optipng imagemagick"
  echo "  Ubuntu:   sudo apt-get install optipng imagemagick"
  echo ""
  exit 1
fi

echo "Scanning for large images (>500KB)..."
echo ""

# Find and optimize large PNG files
while IFS= read -r -d '' file; do
  ORIGINAL_SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
  ORIGINAL_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1024 / 1024" | bc)

  if [ $ORIGINAL_SIZE -gt 512000 ]; then
    echo "Optimizing: $(basename "$file") (${ORIGINAL_MB}MB)"

    # Create backup
    cp "$file" "${file}.backup"

    # Try optipng first (lossless)
    if command -v optipng &> /dev/null; then
      optipng -o2 -quiet "$file" 2>/dev/null
    fi

    # If still too large, use ImageMagick with quality reduction
    NEW_SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    if [ $NEW_SIZE -gt 512000 ] && command -v convert &> /dev/null; then
      convert "$file" -quality 85 -resize '1920x1920>' "$file"
    fi

    # Check results
    NEW_SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    NEW_MB=$(echo "scale=2; $NEW_SIZE / 1024 / 1024" | bc)
    SAVED=$(echo "scale=2; $ORIGINAL_SIZE - $NEW_SIZE" | bc)
    SAVED_MB=$(echo "scale=2; $SAVED / 1024 / 1024" | bc)

    if [ $NEW_SIZE -lt $ORIGINAL_SIZE ]; then
      echo "  ✅ Reduced from ${ORIGINAL_MB}MB to ${NEW_MB}MB (saved ${SAVED_MB}MB)"
      rm "${file}.backup"
      OPTIMIZED=$((OPTIMIZED + 1))
    else
      echo "  ⚠️  No reduction possible, skipping"
      mv "${file}.backup" "$file"
      SKIPPED=$((SKIPPED + 1))
    fi

    echo ""
  fi
done < <(find "$UPLOAD_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)

echo "===================="
echo "✅ Optimized: $OPTIMIZED images"
echo "⚠️  Skipped: $SKIPPED images"
echo ""

if [ $OPTIMIZED -gt 0 ]; then
  echo "Next steps:"
  echo "  1. Test the site to make sure images look good"
  echo "  2. Commit the optimized images:"
  echo "     git add public/lovable-uploads"
  echo "     git commit -m 'Optimize images to reduce bundle size'"
  echo ""
fi
