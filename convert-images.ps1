# Image Optimization Script for Portfolio (Windows PowerShell)
# Converts PNG and JPG images to WebP format
# Usage: .\convert-images.ps1

$ImagesDir = "public/images"
$Quality = 80
$BackupDir = "public/images/originals"
$Converted = 0
$Skipped = 0

Write-Host "🖼️  Image Optimization Script (Windows)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "This script will convert images to WebP format" -ForegroundColor White
Write-Host "Directory: $ImagesDir" -ForegroundColor White
Write-Host "Quality: $Quality" -ForegroundColor White
Write-Host ""

# Check if ImageMagick is installed
try {
    $null = & convert -version
} catch {
    Write-Host "❌ ImageMagick is not installed" -ForegroundColor Red
    Write-Host "Install it from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    Write-Host "Or use: choco install imagemagick" -ForegroundColor Yellow
    exit 1
}

# Create backup directory
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "✅ Created backup directory: $BackupDir" -ForegroundColor Green
}

Write-Host ""
Write-Host "Converting PNG files..." -ForegroundColor Cyan

Get-ChildItem -Path $ImagesDir -Filter "*.png" | ForEach-Object {
    $filename = $_.Name
    $file = $_.FullName
    $webpFile = $file -replace '\.png$', '.webp'
    
    if (Test-Path $webpFile) {
        Write-Host "⏭️  Skipped: $filename (WebP already exists)" -ForegroundColor Yellow
        $Skipped++
    } else {
        # Convert to WebP
        & convert "$file" -quality $Quality "$webpFile"
        
        $originalSize = (Get-Item $file).Length / 1MB
        $webpSize = (Get-Item $webpFile).Length / 1MB
        $reduction = [math]::Round(100 - (($webpSize / $originalSize) * 100))
        
        Write-Host "✅ Converted: $filename ({0:F2}MB → {1:F2}MB, $reduction% smaller)" -f $originalSize, $webpSize -ForegroundColor Green
        $Converted++
    }
}

Write-Host ""
Write-Host "Converting JPG/JPEG files..." -ForegroundColor Cyan

Get-ChildItem -Path $ImagesDir -Filter "*.jpg", "*.jpeg" | ForEach-Object {
    $filename = $_.Name
    $file = $_.FullName
    $webpFile = $file -replace '\.(jpg|jpeg)$', '.webp'
    
    if (Test-Path $webpFile) {
        Write-Host "⏭️  Skipped: $filename (WebP already exists)" -ForegroundColor Yellow
        $Skipped++
    } else {
        # Convert to WebP
        & convert "$file" -quality $Quality "$webpFile"
        
        $originalSize = (Get-Item $file).Length / 1MB
        $webpSize = (Get-Item $webpFile).Length / 1MB
        $reduction = [math]::Round(100 - (($webpSize / $originalSize) * 100))
        
        Write-Host "✅ Converted: $filename ({0:F2}MB → {1:F2}MB, $reduction% smaller)" -f $originalSize, $webpSize -ForegroundColor Green
        $Converted++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📊 Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Converted: $Converted images" -ForegroundColor Green
Write-Host "⏭️  Skipped: $Skipped images" -ForegroundColor Yellow
Write-Host ""
Write-Host "✨ All images optimized!" -ForegroundColor Green
Write-Host "The component will automatically use WebP with PNG/JPG fallback" -ForegroundColor Green
