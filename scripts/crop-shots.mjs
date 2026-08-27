/* Recorta el mockup del movil de las capturas de App Store.
 *
 * Las capturas de Brand/capturas-appstore llevan el titular QUEMADO dentro de
 * la imagen y en espanol, asi que no sirven para /en/. Aqui se separa el movil
 * del titular; el titular pasa a HTML, traducible e indexable.
 *
 * La caja sale de las constantes de OwnLane/Tools/appstore-shots.py
 * (lienzo 1284x2778, ANCHO_MOVIL 1010 centrado, arriba 452).
 *
 * One-off:  node scripts/crop-shots.mjs
 */
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const ORIGEN = 'src/assets/capturas';
const ANCHO_MOVIL = 1010;
const ARRIBA = 452;

/** Fila en la que termina el movil.
 *
 *  No vale detectarlo por "primer pixel que no sea el fondo": el fondo del
 *  lienzo es #F5F5F7 y el de la propia app tambien, asi que la busqueda se
 *  paraba en la barra de pestanas y el recorte se comia el resto de la
 *  pantalla. Lo que si se distingue es la SOMBRA: appstore-shots.py la dibuja
 *  desplazada 16 px hacia abajo y desenfocada, asi que justo debajo del canto
 *  hay una franja claramente mas oscura. El borde es el salto de vuelta.
 */
function bordeInferior(px, ancho, alto, desde) {
  const cx = Math.round(ancho / 2);
  let vistoOscuro = false;
  for (let y = alto - 1; y > desde; y--) {
    const v = px(cx, y)[0];
    if (v <= 215) {
      vistoOscuro = true;
      continue;
    }
    if (vistoOscuro && v >= 230) return y; // por encima de la sombra: ya es pantalla
  }
  return alto - 1;
}

for (const fichero of readdirSync(ORIGEN).filter((f) => /^appstore-\d\.png$/.test(f))) {
  const ruta = `${ORIGEN}/${fichero}`;
  const { data, info } = await sharp(ruta).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const i = (y * info.width + x) * info.channels;
    return [data[i], data[i + 1], data[i + 2]];
  };

  const izquierda = Math.round((info.width - ANCHO_MOVIL) / 2);
  const abajo = bordeInferior(px, info.width, info.height, ARRIBA + 1200);
  const alto = abajo - ARRIBA + 1;

  // Sin redondear aqui. appstore-shots.py usa radio 58 sobre 1010 px de ancho
  // (5,7%), y la pantalla de un iPhone ronda el 14%: recortada con 58 se ve
  // cuadrada. El redondeo lo pone el marco en CSS, que si sabe el radio bueno.
  const salida = ruta.replace('.png', '-movil.png');
  await sharp(ruta)
    .extract({ left: izquierda, top: ARRIBA, width: ANCHO_MOVIL, height: alto })
    .png({ compressionLevel: 9 })
    .toFile(salida);

  console.log(`${fichero} -> ${ANCHO_MOVIL}x${alto}  relacion ${(ANCHO_MOVIL / alto).toFixed(4)}`);
}
