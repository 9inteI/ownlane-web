/* Recorta el mockup del movil de las capturas de App Store.
 *
 * Las capturas de Brand/capturas-appstore llevan el titular QUEMADO dentro de
 * la imagen y en espanol, asi que no sirven para /en/. Aqui se separa el movil
 * del titular; el titular pasa a HTML, traducible y indexable.
 *
 * La caja sale de las constantes de OwnLane/Tools/appstore-shots.py
 * (lienzo 1284x2778, ANCHO_MOVIL 1010 centrado, arriba 452, radio 58) pero el
 * borde inferior se detecta leyendo pixeles, porque el alto del movil depende
 * del aspecto de la captura original.
 *
 * One-off:  node scripts/crop-shots.mjs
 */
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const ORIGEN = 'src/assets/capturas';
const ANCHO_MOVIL = 1010;
const ARRIBA = 452;
const RADIO = 58;
const FONDO = [245, 245, 247];

const esFondo = (r, g, b) =>
  Math.abs(r - FONDO[0]) < 6 && Math.abs(g - FONDO[1]) < 6 && Math.abs(b - FONDO[2]) < 6;

for (const fichero of readdirSync(ORIGEN).filter((f) => /^appstore-\d\.png$/.test(f))) {
  const ruta = `${ORIGEN}/${fichero}`;
  const img = sharp(ruta);
  const { width, height } = await img.metadata();
  const izquierda = Math.round((width - ANCHO_MOVIL) / 2);

  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const i = (y * info.width + x) * info.channels;
    return [data[i], data[i + 1], data[i + 2]];
  };

  // Ultima fila, subiendo desde abajo, que no sea fondo en el eje del movil.
  const cx = Math.round(width / 2);
  let abajo = height - 1;
  while (abajo > ARRIBA && esFondo(...px(cx, abajo))) abajo--;
  const alto = abajo - ARRIBA + 1;

  // Esquinas transparentes: asi el mockup compone igual en claro y en oscuro.
  const mascara = Buffer.from(
    `<svg width="${ANCHO_MOVIL}" height="${alto}">` +
      `<rect width="${ANCHO_MOVIL}" height="${alto}" rx="${RADIO}" ry="${RADIO}" fill="#fff"/></svg>`
  );

  const salida = ruta.replace('.png', '-movil.png');
  await sharp(ruta)
    .extract({ left: izquierda, top: ARRIBA, width: ANCHO_MOVIL, height: alto })
    .composite([{ input: mascara, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(salida);

  console.log(`${fichero} -> ${ANCHO_MOVIL}x${alto}`);
}
