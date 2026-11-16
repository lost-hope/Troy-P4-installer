// firmware-config.js
//
// Edit THIS file to register firmware binaries and set defaults - nothing
// else needs to change. The installer (app.js) reads this file at page
// load and builds its flash-size selector and install manifest from it.
//
// To add a new flash size:
//   1. Put the compiled app binary somewhere under firmware/ (a new
//      subfolder per size keeps things tidy, e.g. firmware/32MB/app.bin).
//   2. Add a bootloader + partition-table pair for that size under
//      firmware/boot/ (see firmware/boot/README.md for how these were
//      generated and how to make your own for a different size/layout).
//   3. Copy one of the blocks below, point its paths at your new files,
//      and give it its own key (e.g. "32MB").
// To update an existing size's firmware: just replace the .bin file on
// disk at the path already listed below - no config change needed.

const FIRMWARE_CONFIG = {
  // Shown as the page heading.
  projectName: 'Troy’s ESP32-P4 Firmware Installer',

  // Optional free-text version/build label, shown under the heading.
  // Purely cosmetic - not used to pick files.
  version: '1.0.0',

  // Which key under flashSizes (below) is pre-selected on page load.
  defaultFlashSize: '16MB',

  // One entry per selectable flash size. The key (e.g. "16MB") is
  // internal and also what's shown in the UI unless you set `label`.
  flashSizes: {
    '16MB': {
      label: '16 MB',

      // Paths are relative to this project's root (where index.html is).
      firmware: 'firmware/16MB/app.bin',
      bootloader: 'firmware/boot/bootloader_p4.bin',
      partitions: 'firmware/boot/partitions_16m.bin',

      // Flash offsets in bytes - where each file gets written on the
      // chip. These three values are standard for ESP32-P4 and almost
      // certainly don't need to change even for a different flash size,
      // AS LONG AS you keep using the same partition-table layout scaled
      // up/down (bootloader offset and app offset are layout-independent
      // on ESP32-P4). See firmware/boot/README.md before changing these.
      bootloaderOffset: 0x2000,
      partitionsOffset: 0x8000,
      firmwareOffset: 0x10000
    }

    // Example of a second size, once you have real files for it:
    //
    // '32MB': {
    //   label: '32 MB',
    //   firmware: 'firmware/32MB/app.bin',
    //   bootloader: 'firmware/boot/bootloader_p4.bin',
    //   partitions: 'firmware/boot/partitions_32m.bin',
    //   bootloaderOffset: 0x2000,
    //   partitionsOffset: 0x8000,
    //   firmwareOffset: 0x10000
    // }
  }
};
