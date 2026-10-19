import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

// Simple CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createPngBuffer(width, height, pixelFn) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  let pos = 0;

  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0; // Filter 0
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x / width, y / height, x, y);
      rawData[pos++] = Math.max(0, Math.min(255, Math.round(r)));
      rawData[pos++] = Math.max(0, Math.min(255, Math.round(g)));
      rawData[pos++] = Math.max(0, Math.min(255, Math.round(b)));
      rawData[pos++] = Math.max(0, Math.min(255, Math.round(a)));
    }
  }

  const deflated = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate PWA Icon with LPU branding
function renderLpuIcon(isMaskable) {
  return (u, v, x, y) => {
    const cx = 0.5;
    const cy = 0.5;
    const dx = u - cx;
    const dy = v - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Background: deep navy #0B192C -> #1E3E62
    const bgR = 11 + (30 - 11) * v;
    const bgG = 25 + (62 - 25) * v;
    const bgB = 44 + (98 - 44) * v;

    // Corner radius for standard app icon
    let alpha = 255;
    if (!isMaskable) {
      // Rounded rect check (radius 0.22)
      const r = 0.22;
      const qx = Math.max(0, Math.abs(dx) - (0.5 - r));
      const qy = Math.max(0, Math.abs(dy) - (0.5 - r));
      const cornerDist = Math.sqrt(qx * qx + qy * qy);
      if (cornerDist > r) {
        return [0, 0, 0, 0];
      }
    }

    // Outer golden/orange ring around badge
    let r = bgR, g = bgG, b = bgB;
    if (dist >= 0.36 && dist <= 0.39) {
      const ringAlpha = 0.45;
      r = r * (1 - ringAlpha) + 243 * ringAlpha;
      g = g * (1 - ringAlpha) + 112 * ringAlpha;
      b = b * (1 - ringAlpha) + 33 * ringAlpha;
    }

    // Graduation diamond cap top
    // (u, v) diamond vertices: (0.5, 0.23), (0.76, 0.36), (0.5, 0.49), (0.24, 0.36)
    const capX = Math.abs(u - 0.5) / 0.26;
    const capY = Math.abs(v - 0.36) / 0.13;
    if (capX + capY <= 1.0) {
      // Orange gradient #FF7A00 -> #F37021
      return [255 - 12 * v, 122 - 10 * v, 33, 255];
    }

    // Shield / crest lower arch
    // U-shape between v = 0.41 and 0.67, within x = 0.27 to 0.73
    if (v >= 0.41 && v <= 0.68 && Math.abs(u - 0.5) <= 0.23) {
      const uDist = Math.abs(u - 0.5) / 0.23;
      const vCurve = 0.45 + (1 - uDist * uDist) * 0.23;
      if (v <= vCurve) {
        // White shield banner
        return [245, 248, 255, 240];
      }
    }

    // Orange center emblem star/dot at v = 0.74
    const dotDist = Math.hypot(u - 0.5, v - 0.74);
    if (dotDist <= 0.04) {
      return [243, 112, 33, 255];
    }

    // Cap tassel hanging on the right (u ~ 0.78, v: 0.37 to 0.62)
    if (Math.abs(u - 0.78) <= 0.015 && v >= 0.37 && v <= 0.62) {
      return [243, 112, 33, 255];
    }

    return [r, g, b, alpha];
  };
}

const outDir = path.resolve('client', 'public', 'icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Generating PWA icons...');
const icon192 = createPngBuffer(192, 192, renderLpuIcon(false));
fs.writeFileSync(path.join(outDir, 'icon-192.png'), icon192);
console.log('Created icon-192.png (192x192)');

const icon512 = createPngBuffer(512, 512, renderLpuIcon(false));
fs.writeFileSync(path.join(outDir, 'icon-512.png'), icon512);
console.log('Created icon-512.png (512x512)');

const maskable512 = createPngBuffer(512, 512, renderLpuIcon(true));
fs.writeFileSync(path.join(outDir, 'icon-maskable-512.png'), maskable512);
console.log('Created icon-maskable-512.png (512x512 maskable)');

const appleIcon = createPngBuffer(180, 180, renderLpuIcon(false));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), appleIcon);
console.log('Created apple-touch-icon.png (180x180)');
