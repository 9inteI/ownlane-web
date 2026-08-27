/* Quita la barra de estado (hora, isla dinamica, wifi, bateria) de las
 * capturas que se usan como imagen de fondo dentro de una celda.
 *
 * En un mockup con marco de movil la barra es correcta y hay que verla. Pero
 * cuando la captura se usa recortada dentro de una tarjeta, la isla aparece
 * flotando en medio de la nada y se lee como una mancha negra rara.
 *
 * One-off:  node scripts/recortar-barra.mjs
 */
import sharp from 'sharp';

// Medido sobre las capturas de 1206x2622: la barra ocupa hasta y=150 y el
// titulo de la pantalla empieza sobre y=170. Se corta en 158.
const CORTE = 158;
const ORIGEN = 'src/assets/capturas/app';

for (const tema of ['light', 'dark']) {
  for (const lang of ['es', 'en']) {
    const nombre = `progreso-${tema}-${lang}`;
    const { width, height } = await sharp(`${ORIGEN}/${nombre}.png`).metadata();
    await sharp(`${ORIGEN}/${nombre}.png`)
      .extract({ left: 0, top: CORTE, width, height: height - CORTE })
      .png({ compressionLevel: 9 })
      .toFile(`${ORIGEN}/${nombre}-sinbarra.png`);
    console.log(`${nombre}-sinbarra.png  ${width}x${height - CORTE}`);
  }
}
