#!/bin/sh
# Uncaged installer — https://getuncaged.dev
#
#   curl -fsSL https://getuncaged.dev/install.sh | bash
#
# Downloads the latest Uncaged for your Mac over curl. Because curl (unlike a
# browser) does NOT set the macOS quarantine flag, the app launches straight
# away — no Gatekeeper "unverified developer" prompt, no notarization, no
# xattr. Uncaged is ad-hoc signed and account-free by design.
#
# It's just a shell script — read it first if you like, that's the point.

set -eu

REPO="getuncaged/uncaged"
BASE="https://github.com/${REPO}/releases/latest/download"
APP="Uncaged.app"

red() { printf '\033[31m%s\033[0m\n' "$*"; }
grn() { printf '\033[32m%s\033[0m\n' "$*"; }
dim() { printf '\033[2m%s\033[0m\n' "$*"; }
err() { red "error: $*" >&2; exit 1; }

os="$(uname -s)"
arch="$(uname -m)"

if [ "$os" != "Darwin" ]; then
  err "this installer is macOS-only. On Linux grab the .deb/.rpm/AppImage/tarball at https://getuncaged.dev/#download ; on Windows use the installer or 'winget install Uncaged.Uncaged'."
fi

case "$arch" in
  arm64)  asset="Uncaged-macos-aarch64.zip" ;;
  x86_64) asset="Uncaged-macos-x86_64.zip" ;;
  *)      err "unsupported macOS architecture: $arch" ;;
esac

command -v curl >/dev/null 2>&1 || err "curl is required"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT INT TERM

printf 'Downloading Uncaged (%s)…\n' "$arch"
curl -fL# "${BASE}/${asset}" -o "${tmp}/uncaged.zip" || err "download failed"

printf 'Extracting…\n'
ditto -x -k "${tmp}/uncaged.zip" "${tmp}/x" || err "extract failed"
[ -d "${tmp}/x/${APP}" ] || err "unexpected archive layout (${APP} not found)"

# Prefer /Applications; fall back to ~/Applications if it isn't writable and we
# can't elevate.
dest_dir="/Applications"
SUDO=""
if [ ! -w "$dest_dir" ]; then
  if command -v sudo >/dev/null 2>&1 && [ -t 1 ]; then
    SUDO="sudo"
    dim "Installing to ${dest_dir} needs your password."
  else
    mkdir -p "${HOME}/Applications"
    dest_dir="${HOME}/Applications"
  fi
fi
dest="${dest_dir}/${APP}"

printf 'Installing to %s…\n' "$dest"
$SUDO rm -rf "$dest"
$SUDO mv "${tmp}/x/${APP}" "$dest"
# Insurance: strip quarantine in case anything upstream set it.
$SUDO xattr -dr com.apple.quarantine "$dest" 2>/dev/null || true

grn "✔ Uncaged installed → ${dest}"
dim "Opening it now…"
open "$dest" 2>/dev/null || dim "Launch it any time with:  open -a Uncaged"
