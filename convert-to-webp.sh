#!/bin/bash

# Convert large images to WebP format
# This will dramatically reduce bundle size

UPLOAD_DIR="public/lovable-uploads"
MIN_SIZE=500000  # 500KB
QUALITY=95  # High quality, minimal loss
CONVERTED=0
TOTAL_SAVED=0

echo ""
echo "🖼️  CONVERTING IMAGES TO WEBP"
echo "============================="
echo ""

if [ ! -d "$UPLOAD_DIR" ]; then
  echo "❌ Upload directory not found: $UPLOAD_DIR"
  exit 1
fi

# Check for cwebp (WebP converter)
if ! command -v cwebp &> /dev/null; then
  echo "❌ cwebp not installed"
  echo ""
  echo "Install with:"
  echo "  macOS:    brew install webp"
  echo "  Ubuntu:   sudo apt-get install webp"
  echo ""
  exit 1
fi

echo "Finding images larger than 500KB..."
echo ""

# Find large PNG and JPG files
find "$UPLOAD_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
  # Get file size
  SIZE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)

  if [ "$SIZE" -gt "$MIN_SIZE" ]; then
    SIZE_MB=$(echo "scale=2; $SIZE / 1024 / 1024" | bc)
    BASENAME=$(basename "$file")
    DIRNAME=$(dirname "$file")
    FILENAME="${BASENAME%.*}"

    # Output WebP filename
    WEBP_FILE="$DIRNAME/$FILENAME.webp"

    echo "Converting: $BASENAME (${SIZE_MB}MB)"

    # Convert to WebP with high quality (95 = near-lossless)
    cwebp -q $QUALITY -m 6 -af "$file" -o "$WEBP_FILE" 2>/dev/null

    if [ -f "$WEBP_FILE" ]; then
      WEBP_SIZE=$(stat -f%z "$WEBP_FILE" 2>/dev/null || stat -c%s "$WEBP_FILE" 2>/dev/null)
      WEBP_MB=$(echo "scale=2; $WEBP_SIZE / 1024 / 1024" | bc)
      SAVED=$(echo "scale=2; $SIZE - $WEBP_SIZE" | bc)
      SAVED_MB=$(echo "scale=2; $SAVED / 1024 / 1024" | bc)
      PERCENT=$(echo "scale=1; ($SAVED / $SIZE) * 100" | bc)

      echo "  ✅ ${SIZE_MB}MB → ${WEBP_MB}MB (saved ${SAVED_MB}MB, ${PERCENT}%)"

      # Delete original if WebP is smaller
      if [ "$WEBP_SIZE" -lt "$SIZE" ]; then
        rm "$file"
        echo "  🗑️  Removed original PNG/JPG"
      fi

      CONVERTED=$((CONVERTED + 1))
      TOTAL_SAVED=$(echo "$TOTAL_SAVED + $SAVED" | bc)
    else
      echo "  ❌ Conversion failed"
    fi

    echo ""
  fi
done

if [ "$CONVERTED" -gt 0 ]; then
  TOTAL_SAVED_MB=$(echo "scale=2; $TOTAL_SAVED / 1024 / 1024" | bc)

  echo "============================="
  echo "✅ Converted: $CONVERTED images"
  echo "💾 Total saved: ${TOTAL_SAVED_MB}MB"
  echo ""
  echo "Bundle size reduced significantly!"
  echo ""
else
  echo "No images found that need conversion"
fi
