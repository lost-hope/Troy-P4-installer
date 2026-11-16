// app.js - single-chip (ESP32-P4) web installer, firmware served from this
// same repo (no GitHub Releases API involved) - everything selectable in
// the UI comes from firmware-config.js. See that file to add new flash
// sizes or swap in updated binaries.

(function () {
  'use strict';

  const CHIP_FAMILY = 'ESP32-P4';

  /** Build an esp-web-tools manifest for one flashSizes entry from firmware-config.js. */
  function buildManifest(sizeConfig) {
    return {
      name: FIRMWARE_CONFIG.projectName,
      version: FIRMWARE_CONFIG.version || '',
      new_install_prompt_erase: true,
      builds: [
        {
          chipFamily: CHIP_FAMILY,
          parts: [
            { path: sizeConfig.bootloader, offset: sizeConfig.bootloaderOffset },
            { path: sizeConfig.partitions, offset: sizeConfig.partitionsOffset },
            { path: sizeConfig.firmware, offset: sizeConfig.firmwareOffset }
          ]
        }
      ]
    };
  }

  /** Convert a manifest object into a blob URL consumable by esp-web-tools. */
  function createManifestUrl(manifest) {
    const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }

  /** Apply the currently selected flash size: rebuild the manifest and enable Install. */
  function applySelectedSize() {
    const select = document.getElementById('flashSizeSelect');
    const sizeConfig = FIRMWARE_CONFIG.flashSizes[select.value];
    const manifest = buildManifest(sizeConfig);

    document.getElementById('inst').setAttribute('manifest', createManifestUrl(manifest));
    document.getElementById('installBtn').disabled = false;
  }

  /** Populate the flash-size dropdown from firmware-config.js; hide the row if there's only one size. */
  function populateFlashSizeSelect() {
    const sizeIds = Object.keys(FIRMWARE_CONFIG.flashSizes);
    const select = document.getElementById('flashSizeSelect');

    sizeIds.forEach(function (id) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = FIRMWARE_CONFIG.flashSizes[id].label || id;
      select.appendChild(opt);
    });

    select.value = FIRMWARE_CONFIG.defaultFlashSize;
    select.addEventListener('change', applySelectedSize);

    document.getElementById('flashSizeRow').hidden = sizeIds.length < 2;
  }

  function init() {
    document.getElementById('heading').textContent = FIRMWARE_CONFIG.projectName;
    if (FIRMWARE_CONFIG.version) {
      document.getElementById('versionLabel').textContent = 'Version ' + FIRMWARE_CONFIG.version;
    }

    populateFlashSizeSelect();
    applySelectedSize();
  }

  init();
})();
