# Firmware Installer

A static, browser-based installer for ESP32-P4 firmware, built on
[ESP Web Tools](https://esphome.github.io/esp-web-tools/). No server
component, no build step - works from any static file host (GitHub
Pages, Netlify, or just opening the files locally).

Unlike installers that fetch binaries from a GitHub Releases API, this
one serves fixed binaries committed directly into this repo.

## For Troy: adding/updating firmware

Everything you need to touch lives in **`firmware-config.js`** - see the
comments at the top of that file. Short version:

- To update the firmware for an existing flash size: just replace the
  `.bin` file already referenced there. No other change needed.
- To add a new flash size: drop the new app binary under `firmware/`,
  add a bootloader + partition-table pair under `firmware/boot/` (see
  `firmware/boot/README.md`), then add one block to `firmware-config.js`.
- `defaultFlashSize` in that same file controls which size is
  pre-selected when the page loads.

## Testing locally

Browsers block `fetch()` on `file://` URLs, so serve the folder instead
of double-clicking `index.html`:

```bash
python -m http.server 8080
# then open http://localhost:8080/
```

Installing requires Chrome or Edge on a desktop computer (the
[Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)
isn't available in Firefox or on mobile).

## Deploying

Any static host works. For GitHub Pages: Settings → Pages → Build and
deployment → Source → "Deploy from a branch", pick the branch this is
on and the repo root, save. No build step or GitHub Action required.
