/* Deriva favicon y apple-touch-icon del logo maestro (2508px, 3.7 MB).
 * El maestro nunca se sirve entero: aqui salen los tamanos reales.
 *   node scripts/gen-iconos.mjs */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const LOGO = 'src/assets/brand/ownlane-logo.png';

for (const [nombre, tam] of [
  ['public/apple-touch-icon.png', 180],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
]) {
  await sharp(LOGO).resize(tam, tam, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(nombre);
  console.log(nombre, tam);
}

// El favicon es la mancha, no el logo: a 16px el corredor no se ve.
const splat = readFileSync('src/components/ink/splats/splat-1.svg', 'utf8')
  .replace('fill="currentColor"', 'fill="#1d1d1f"')
  .replace('<svg ', '<svg width="64" height="64" ');
writeFileSync(
  'public/favicon.svg',
  splat.replace(
    '<svg ',
    '<svg style="color-scheme:light dark" '
  ).replace('fill="#1d1d1f"', 'fill="light-dark(#1d1d1f,#f5f5f7)"')
);
console.log('public/favicon.svg');
