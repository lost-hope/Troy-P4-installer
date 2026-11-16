# firmware/boot/

An ESP32-P4 release binary is the **application only** - it has no
2nd-stage bootloader or partition table baked in, and won't boot on a
bare/erased chip by itself. These two files supply that:

| File | What it is | Offset |
|---|---|---|
| `bootloader_p4.bin` | 2nd-stage bootloader, QIO flash mode | `0x2000` |
| `partitions_16m.bin` | Partition table for a 16MB flash layout | `0x8000` |

(The app binary itself goes at `0x10000` - set in `firmware-config.js`,
not here.)

## Where these came from

Built with PlatformIO against WLED's `main` branch (`esp32p4_16MB` env,
commit `88a853b`, pioarduino `platform-espressif32` fork), then verified
against `esptool`'s own `CHIP_DEFS["esp32p4"].BOOTLOADER_FLASH_OFFSET`
(`0x2000`). These are generic for any ESP32-P4 app at this flash layout -
they don't contain anything WLED-specific, so they're safe to reuse here
as-is.

## Adding a different flash size (e.g. 32MB)

The bootloader can be reused unchanged (ESP32-P4's bootloader doesn't
encode flash size the way some other Espressif chips' bootloaders do -
confirm this still holds if you're reading this far in the future).
You'll need a new partition table sized for the new flash chip, built
from a partition CSV (see
[Espressif's partition table docs](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/partition-tables.html))
via:

```bash
esptool.py --chip esp32p4 merge-bin  # or: python -m esptool ...
# or, using esp-idf's own partition tool:
gen_esp32part.py your_32mb_partitions.csv partitions_32m.bin
```

If you don't have ESP-IDF/esptool installed, `pip install esptool` is
enough to get `gen_esp32part.py` on your PATH.
