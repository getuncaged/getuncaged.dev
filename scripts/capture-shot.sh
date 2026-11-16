#!/bin/sh
# Capture a real Uncaged window into public/shots/ (for OG images, docs or a future section).
#
#   ./scripts/capture-shot.sh splits        → public/shots/splits.png + .webp
#
# Click the Uncaged window when the camera cursor appears. -o drops the window
# shadow, so the frame is the app's own edge. Shoot at 150% UI zoom in a
# ~1200pt-wide window so text survives being scaled into the page.
set -eu
name="${1:?usage: capture-shot.sh <name>}"
out="public/shots/${name}.png"
screencapture -w -o -x "$out"
command -v cwebp >/dev/null 2>&1 && cwebp -quiet -lossless -z 9 "$out" -o "public/shots/${name}.webp"
echo "saved $out"
