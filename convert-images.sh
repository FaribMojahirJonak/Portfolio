#!/bin/bash

# Image Optimization Script for Portfolio
# Converts PNG and JPG images to WebP format
# Usage: bash convert-images.sh

set -e

IMAGES_DIR="public/images"
QUALITY=80
BACKUP_DIR="public/images/originals"

echo "🖼️  Image Optimization Script"
echo "=============================="
echo "This script will convert images to WebP format"
echo "Directory: $IMAGES_DIR"
echo "Quality: $QUALITY"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed"
    echo "Install it with:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: choco install imagemagick"
    exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo "✅ Created backup directory: $BACKUP_DIR"

# Counter
converted=0
skipped=0

echo ""
echo "Converting PNG files..."
for file in "$IMAGES_DIR"/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        webp_file="${file%.png}.webp"
        
        if [ -f "$webp_file" ]; then
            echo "⏭️  Skipped: $filename (WebP already exists)"
            ((skipped++))
        else
            # Create backup (optional)
            # cp "$file" "$BACKUP_DIR/$filename"
            
            # Convert to WebP
            convert "$file" -quality $QUALITY "$webp_file"
            
            original_size=$(du -h "$file" | cut -f1)
            webp_size=$(du -h "$webp_file" | cut -f1)
            reduction=$((100 - ($(stat -c%s "$webp_file") * 100 / $(stat -c%s "$file"))))
            
            echo "✅ Converted: $filename ($original_size → $webp_size, $reduction% smaller)"
            ((converted++))
        fi
    fi
done

echo ""
echo "Converting JPG files..."
for file in "$IMAGES_DIR"/*.{jpg,jpeg}; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        webp_file="${file%.*}.webp"
        
        if [ -f "$webp_file" ]; then
            echo "⏭️  Skipped: $filename (WebP already exists)"
            ((skipped++))
        else
            # Create backup (optional)
            # cp "$file" "$BACKUP_DIR/$filename"
            
            # Convert to WebP
            convert "$file" -quality $QUALITY "$webp_file"
            
            original_size=$(du -h "$file" | cut -f1)
            webp_size=$(du -h "$webp_file" | cut -f1)
            reduction=$((100 - ($(stat -c%s "$webp_file") * 100 / $(stat -c%s "$file"))))
            
            echo "✅ Converted: $filename ($original_size → $webp_size, $reduction% smaller)"
            ((converted++))
        fi
    fi
done

echo ""
echo "=============================="
echo "📊 Summary"
echo "=============================="
echo "✅ Converted: $converted images"
echo "⏭️  Skipped: $skipped images"
echo ""
echo "✨ All images optimized!"
echo "The component will automatically use WebP with PNG/JPG fallback"
