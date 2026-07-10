# Uncaged installer for Windows — https://getuncaged.dev
#
#   irm https://getuncaged.dev/install.ps1 | iex
#
# Downloads the matching Uncaged installer from GitHub Releases and runs it
# silently (per-user, no admin prompt). It's just a script — read it first if
# you like.

$ErrorActionPreference = 'Stop'

$repo = 'getuncaged/uncaged'
$base = "https://github.com/$repo/releases/latest/download"

$arch = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'aarch64' } else { 'x86_64' }
$asset = "Uncaged-windows-$arch-setup.exe"
$dest = Join-Path $env:TEMP $asset

Write-Host "Downloading Uncaged for Windows ($arch)…"
Invoke-WebRequest -Uri "$base/$asset" -OutFile $dest

Write-Host "Installing…"
Start-Process -FilePath $dest -ArgumentList '/VERYSILENT', '/NORESTART' -Wait

Remove-Item $dest -ErrorAction SilentlyContinue
Write-Host "Uncaged installed. Launch it from the Start menu."
