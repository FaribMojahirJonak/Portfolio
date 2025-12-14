param()
Set-Location "$PSScriptRoot\.."
$ErrorActionPreference = 'Stop'
$dest = "public/fonts"
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
$pairs = @(
  'Orbitron-400|https://fonts.gstatic.com/s/orbitron/v35/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpg.ttf',
  'Orbitron-500|https://fonts.gstatic.com/s/orbitron/v35/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6xpg.ttf',
  'Orbitron-600|https://fonts.gstatic.com/s/orbitron/v35/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyxSmxpg.ttf',
  'Orbitron-700|https://fonts.gstatic.com/s/orbitron/v35/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny_Cmxpg.ttf',
  'Orbitron-900|https://fonts.gstatic.com/s/orbitron/v35/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nysimxpg.ttf',
  'Rajdhani-300|https://fonts.gstatic.com/s/rajdhani/v17/LDI2apCSOBg7S-QT7pasEcOs.ttf',
  'Rajdhani-400|https://fonts.gstatic.com/s/rajdhani/v17/LDIxapCSOBg7S-QT7q4A.ttf',
  'Rajdhani-500|https://fonts.gstatic.com/s/rajdhani/v17/LDI2apCSOBg7S-QT7pb0EMOs.ttf',
  'Rajdhani-600|https://fonts.gstatic.com/s/rajdhani/v17/LDI2apCSOBg7S-QT7pbYF8Os.ttf',
  'Rajdhani-700|https://fonts.gstatic.com/s/rajdhani/v17/LDI2apCSOBg7S-QT7pa8FsOs.ttf'
)
foreach ($pair in $pairs) {
  $name,$url = $pair -split '\|'
  $out = Join-Path $dest "$name.ttf"
  Invoke-WebRequest -Uri $url -OutFile $out
  Write-Host "Saved $out"
}
