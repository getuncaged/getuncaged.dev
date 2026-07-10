#!/bin/sh
# Uncaged installer — https://getuncaged.dev
#
#   curl -fsSL https://getuncaged.dev/install.sh | bash
#
# macOS: downloads the app over curl (which — unlike a browser — never sets the
# com.apple.quarantine flag), so it opens with no Gatekeeper prompt, no
# notarization, no xattr. Linux: installs the `uncaged` binary to ~/.local/bin.
# An optional arg forces the arch:  ... | bash -s -- arm64   (or intel).
#
# It's just a shell script — read it first if you like, that's the point.

set -eu

REPO="getuncaged/uncaged"
BASE="https://github.com/${REPO}/releases/latest/download"

red() { printf '\033[31m%s\033[0m\n' "$*"; }
grn() { printf '\033[32m%s\033[0m\n' "$*"; }
dim() { printf '\033[2m%s\033[0m\n' "$*"; }
err() { red "error: $*" >&2; exit 1; }

command -v curl >/dev/null 2>&1 || err "curl is required"

os="$(uname -s)"
arch="${1:-$(uname -m)}"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT INT TERM

case "$os" in
  Darwin)
    case "$arch" in
      arm64|aarch64|apple|apple-silicon|silicon) asset="Uncaged-macos-aarch64.zip"; label="Apple Silicon" ;;
      x86_64|x64|amd64|intel)                    asset="Uncaged-macos-x86_64.zip";  label="Intel" ;;
      *) err "unknown architecture '$arch' (use 'arm64' or 'intel')" ;;
    esac
    printf 'Downloading Uncaged for macOS (%s)…\n' "$label"
    curl -fL# "${BASE}/${asset}" -o "${tmp}/uncaged.zip" || err "download failed"
    printf 'Extracting…\n'
    ditto -x -k "${tmp}/uncaged.zip" "${tmp}/x" || err "extract failed"
    [ -d "${tmp}/x/Uncaged.app" ] || err "unexpected archive layout (Uncaged.app not found)"

    dest_dir="/Applications"; SUDO=""
    if [ ! -w "$dest_dir" ]; then
      if command -v sudo >/dev/null 2>&1 && [ -t 1 ]; then
        SUDO="sudo"; dim "Installing to ${dest_dir} needs your password."
      else
        mkdir -p "${HOME}/Applications"; dest_dir="${HOME}/Applications"
      fi
    fi
    dest="${dest_dir}/Uncaged.app"
    printf 'Installing to %s…\n' "$dest"
    $SUDO rm -rf "$dest"
    $SUDO mv "${tmp}/x/Uncaged.app" "$dest"
    $SUDO xattr -dr com.apple.quarantine "$dest" 2>/dev/null || true
    grn "✔ Uncaged installed → ${dest}"
    dim "Opening it now…"
    open "$dest" 2>/dev/null || dim "Launch it any time with:  open -a Uncaged"
    ;;

  Linux)
    case "$arch" in
      x86_64|x64|amd64|intel) asset="Uncaged-linux-x86_64.tar.gz"; label="x86_64" ;;
      arm64|aarch64) err "arm64 Linux builds aren't published yet — see https://getuncaged.dev/#download" ;;
      *) err "unsupported architecture '$arch'" ;;
    esac
    printf 'Downloading Uncaged for Linux (%s)…\n' "$label"
    curl -fL# "${BASE}/${asset}" -o "${tmp}/uncaged.tgz" || err "download failed"
    printf 'Extracting…\n'
    tar -xzf "${tmp}/uncaged.tgz" -C "${tmp}" || err "extract failed"
    binsrc="$(find "${tmp}" -type f -name uncaged 2>/dev/null | head -1)"
    [ -n "$binsrc" ] || err "binary 'uncaged' not found in archive"

    bindir="${HOME}/.local/bin"
    mkdir -p "$bindir"
    cp "$binsrc" "${bindir}/uncaged"
    chmod 0755 "${bindir}/uncaged"

    # Best-effort desktop entry so it shows up in the app menu.
    appdir="${HOME}/.local/share/applications"
    if mkdir -p "$appdir" 2>/dev/null; then
      { printf '%s\n' \
          '[Desktop Entry]' 'Type=Application' 'Name=Uncaged' \
          'Comment=Account-free, bring-your-own-model fork of the Warp terminal' \
          "Exec=${bindir}/uncaged" 'Terminal=false' \
          'Categories=Development;Utility;TerminalEmulator;' \
          > "${appdir}/uncaged.desktop"; } 2>/dev/null || true
    fi

    grn "✔ Uncaged installed → ${bindir}/uncaged"
    case ":${PATH}:" in
      *":${bindir}:"*) dim "Run it with:  uncaged" ;;
      *) dim "Add ~/.local/bin to your PATH, then run:  uncaged"
         dim "  e.g.  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.profile && . ~/.profile" ;;
    esac
    ;;

  *)
    err "unsupported OS '$os'. On Windows run: irm https://getuncaged.dev/install.ps1 | iex  — otherwise see https://getuncaged.dev/#download"
    ;;
esac
