/* Deriva TODOS los assets de marca de los SVG de la app, en
 * src/assets/brand/fuente/ (los mismos ficheros que Xcode).
 *   node scripts/gen-marca.mjs
 *
 * Lo que sale:
 *   src/assets/brand/marca.svg      el corredor, fondo transparente, currentColor
 *   src/assets/brand/glifo.svg      la gota sola, para tamanos pequenos
 *   public/favicon.svg              el glifo con light-dark()
 *   public/apple-touch-icon.png     el icono de la app, tal cual esta en iOS
 *   public/icon-192.png, icon-512.png
 *   public/prensa/*                 kit de prensa
 *
 * Dos cosas no evidentes:
 *
 * 1. El viewBox se recorta a la tinta. Los cuadrados de Apple llevan margen de
 *    seguridad; en la web ese margen es aire muerto alrededor del hero.
 *
 * 2. Los ojos del personaje son agujeros de la silueta, no formas propias. Para
 *    poder parpadear se inyectan dos elipses ANTES del trazo: quedan detras, la
 *    tinta las tapa entera y solo asoman por los agujeros. Escalarlas en Y
 *    cierra el ojo. Las posiciones no se miden a ojo: se sacan rasterizando y
 *    buscando los huecos que no tocan el borde. */
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const FUENTE = 'src/assets/brand/fuente';
const LADO = 4096; // viewBox de los originales
const MUESTRA = 1024; // resolucion a la que se analiza

/** Quita el fondo cuadrado y deja la tinta en currentColor. */
const limpiar = (svg) =>
  svg
    .replace(/<rect[^>]*\/>\s*/, '')
    .replace(/<\?xml[^>]*\?>\s*/, '')
    // El fill se queda SOLO en el <svg> raiz. Si estuviera tambien en el <g>,
    // el <use> del destello no podria repintarlo de blanco para la mascara.
    .replace('fill="#000000"', '')
    .replace('<g transform=', '<g id="ol-trazo" transform=');

const rasterizar = async (svg) => {
  const { data, info } = await sharp(Buffer.from(tintar(svg, '#000')))
    .resize(MUESTRA, MUESTRA)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const alfa = new Uint8Array(MUESTRA * MUESTRA);
  for (let i = 0; i < alfa.length; i++) alfa[i] = data[i * info.channels + 3];
  return alfa;
};

/** Caja de la tinta, en unidades de viewBox. */
const caja = (alfa) => {
  let x0 = MUESTRA, y0 = MUESTRA, x1 = -1, y1 = -1;
  for (let y = 0; y < MUESTRA; y++) {
    for (let x = 0; x < MUESTRA; x++) {
      if (alfa[y * MUESTRA + x] < 24) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  const k = LADO / MUESTRA;
  return { x: x0 * k, y: y0 * k, w: (x1 - x0 + 1) * k, h: (y1 - y0 + 1) * k };
};

/** Huecos cerrados de la silueta: transparente que no llega al borde. */
const agujeros = (alfa) => {
  const fuera = new Uint8Array(MUESTRA * MUESTRA);
  const pila = [];
  const meter = (x, y) => {
    if (x < 0 || y < 0 || x >= MUESTRA || y >= MUESTRA) return;
    const i = y * MUESTRA + x;
    if (fuera[i] || alfa[i] >= 24) return;
    fuera[i] = 1;
    pila.push(i);
  };
  for (let x = 0; x < MUESTRA; x++) { meter(x, 0); meter(x, MUESTRA - 1); }
  for (let y = 0; y < MUESTRA; y++) { meter(0, y); meter(MUESTRA - 1, y); }
  while (pila.length) {
    const i = pila.pop();
    const x = i % MUESTRA, y = (i / MUESTRA) | 0;
    meter(x + 1, y); meter(x - 1, y); meter(x, y + 1); meter(x, y - 1);
  }

  // Lo que queda transparente y no es "fuera" son huecos. Se agrupan.
  const visto = new Uint8Array(MUESTRA * MUESTRA);
  const grupos = [];
  for (let y = 0; y < MUESTRA; y++) {
    for (let x = 0; x < MUESTRA; x++) {
      const i = y * MUESTRA + x;
      if (visto[i] || fuera[i] || alfa[i] >= 24) continue;
      const cola = [i];
      visto[i] = 1;
      let n = 0, x0 = MUESTRA, y0 = MUESTRA, x1 = -1, y1 = -1;
      while (cola.length) {
        const j = cola.pop();
        const jx = j % MUESTRA, jy = (j / MUESTRA) | 0;
        n++;
        if (jx < x0) x0 = jx;
        if (jx > x1) x1 = jx;
        if (jy < y0) y0 = jy;
        if (jy > y1) y1 = jy;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = jx + dx, ny = jy + dy;
          if (nx < 0 || ny < 0 || nx >= MUESTRA || ny >= MUESTRA) continue;
          const k = ny * MUESTRA + nx;
          if (visto[k] || fuera[k] || alfa[k] >= 24) continue;
          visto[k] = 1;
          cola.push(k);
        }
      }
      grupos.push({ n, x0, y0, x1, y1 });
    }
  }
  const k = LADO / MUESTRA;
  return grupos
    .filter((g) => g.n > 30)
    .map((g) => ({
      cx: ((g.x0 + g.x1 + 1) / 2) * k,
      cy: ((g.y0 + g.y1 + 1) / 2) * k,
      rx: ((g.x1 - g.x0 + 1) / 2) * k,
      ry: ((g.y1 - g.y0 + 1) / 2) * k,
      n: g.n,
    }));
};

/** El SVG suelto, con un color concreto en vez de currentColor. */
const tintar = (svg, color) => svg.replace('fill="currentColor"', `fill="${color}"`);

const cabecera = (b, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.x.toFixed(1)} ${b.y.toFixed(1)} ${b.w.toFixed(1)} ${b.h.toFixed(1)}"${extra}>`;

const cuerpo = (svg) => svg.slice(svg.indexOf('<g '), svg.lastIndexOf('</svg>'));

/* ── La marca completa, con parpados ─────────────────────────────────────── */
const master = limpiar(readFileSync(`${FUENTE}/master.svg`, 'utf8'));
const alfaMaster = await rasterizar(master);
const bMaster = caja(alfaMaster);

/* La silueta tiene mas huecos que los dos ojos: la salpicadura deja alguno.
 * Los ojos son la pareja que va junta y mide igual, asi que se busca el par
 * que minimiza la diferencia de altura y de tamano. */
const huecos = agujeros(alfaMaster);
let ojos = [];
let mejor = Infinity;
for (let i = 0; i < huecos.length; i++) {
  for (let j = i + 1; j < huecos.length; j++) {
    const a = huecos[i], b = huecos[j];
    const coste =
      Math.abs(a.cy - b.cy) + 4 * Math.abs(a.rx - b.rx) + 4 * Math.abs(a.ry - b.ry);
    if (coste >= mejor) continue;
    mejor = coste;
    ojos = [a, b].sort((p, q) => p.cx - q.cx);
  }
}
if (ojos.length !== 2) throw new Error('No he encontrado los ojos en la silueta.');

// Los parpados van un pelin sobredimensionados: tienen que cubrir el agujero
// entero sin dejar una linea de fondo asomando por los bordes.
const parpados = ojos
  .map(
    (o, i) =>
      `\n    <ellipse class="ojo ojo-${i + 1}" cx="${o.cx.toFixed(0)}" cy="${o.cy.toFixed(0)}" rx="${(o.rx * 1.35).toFixed(0)}" ry="${(o.ry * 1.35).toFixed(0)}" style="transform:scaleY(0);transform-box:fill-box;transform-origin:center" />`
  )
  .join('');

writeFileSync(
  'src/assets/brand/marca.svg',
  `${cabecera(bMaster, ' fill="currentColor" aria-hidden="true" focusable="false"')}
  <g class="parpados">${parpados}
  </g>
  ${cuerpo(master).trim()}
</svg>\n`
);

/* ── El glifo: la gota, para nav y favicon ───────────────────────────────── */
const micro = limpiar(readFileSync(`${FUENTE}/micro.svg`, 'utf8'));
const bMicro = caja(await rasterizar(micro));
const glifo = `${cabecera(bMicro, ' fill="currentColor" aria-hidden="true" focusable="false"')}
  ${cuerpo(micro).trim()}
</svg>\n`;
writeFileSync('src/assets/brand/glifo.svg', glifo);

/* ── Favicon: el mismo glifo, con color propio ───────────────────────────── */
/* A 16 px el glifo entero se queda en nada: el favicon se recorta al cuadrado
 * de la derecha, que es donde esta la gota. */
const bGota = {
  x: bMicro.x + bMicro.w - bMicro.h,
  y: bMicro.y,
  w: bMicro.h,
  h: bMicro.h,
};
writeFileSync(
  'public/favicon.svg',
  `${cabecera(bGota, ' width="64" height="64" style="color-scheme:light dark" fill="light-dark(#1d1d1f,#f5f5f7)" aria-hidden="true"')}
  ${cuerpo(micro).trim()}
</svg>\n`
);

/* ── Iconos de aplicacion: el cuadrado de iOS, sin tocar ─────────────────── */
const iconoClaro = readFileSync(`${FUENTE}/icono-claro.svg`);
// Copia para el sitio (kit de prensa): la sirve <Image> ya redimensionada.
await sharp(iconoClaro).resize(512, 512).png({ compressionLevel: 9 }).toFile('src/assets/brand/icono.png');
for (const [nombre, tam] of [
  ['public/apple-touch-icon.png', 180],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
]) {
  await sharp(iconoClaro).resize(tam, tam).png({ compressionLevel: 9 }).toFile(nombre);
}

/* ── Kit de prensa ───────────────────────────────────────────────────────── */
mkdirSync('public/prensa', { recursive: true });
writeFileSync('public/prensa/ownlane-marca.svg', `${cabecera(bMaster, ' fill="#1d1d1f"')}\n  ${cuerpo(master).trim()}\n</svg>\n`);
// A resolucion nativa del vector y recortado a la tinta: es lo que se descarga
// del kit de prensa, asi que sale al tamano util, no al cuadrado de Apple.
await sharp(Buffer.from(tintar(master, '#1d1d1f')))
  .extract({
    left: Math.round(bMaster.x),
    top: Math.round(bMaster.y),
    width: Math.round(bMaster.w),
    height: Math.round(bMaster.h),
  })
  .png({ compressionLevel: 9 })
  .toFile('public/prensa/ownlane-marca.png');
await sharp(iconoClaro).resize(1024, 1024).png({ compressionLevel: 9 }).toFile('public/prensa/ownlane-icono.png');
await sharp(readFileSync(`${FUENTE}/icono-oscuro.svg`)).resize(1024, 1024).png({ compressionLevel: 9 }).toFile('public/prensa/ownlane-icono-oscuro.png');

console.log('marca.svg   viewBox', Object.values(bMaster).map((n) => n.toFixed(0)).join(' '));
console.log('glifo.svg   viewBox', Object.values(bMicro).map((n) => n.toFixed(0)).join(' '));
console.log('ojos        ', ojos.map((o) => `${o.cx.toFixed(0)},${o.cy.toFixed(0)} r${o.rx.toFixed(0)}x${o.ry.toFixed(0)}`).join('  '));
console.log('iconos, favicon y prensa: hechos');

/* ── Imagenes para compartir ─────────────────────────────────────────────────
 * og:image apuntaba a /og/landing-*.png y esa carpeta estaba vacia: cualquier
 * enlace compartido salia sin imagen. Se compone aqui, con la marca nueva, para
 * que no dependa de que alguien acuerde de exportarla a mano. */
const OG = { w: 1200, h: 630 };
const copia = {
  es: ['Empezar a correr es fácil.', 'Seguir corriendo, no.', 'iPhone y Apple Watch · Sin cuenta · Sin servidor'],
  en: ['Starting to run is easy.', 'Carrying on is not.', 'iPhone and Apple Watch · No account · No server'],
};

mkdirSync('public/og', { recursive: true });
for (const [lang, [l1, l2, pie]] of Object.entries(copia)) {
  // La marca, encajada a la derecha y sangrando por el borde. La cola se
  // disuelve con un degradado: si no, la tinta llega hasta el titular.
  const alto = 620;
  const ancho = (bMaster.w / bMaster.h) * alto;
  const x = OG.w - ancho + 76;
  const y = (OG.h - alto) / 2;
  const escala = alto / bMaster.h;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG.w}" height="${OG.h}" viewBox="0 0 ${OG.w} ${OG.h}">
  <defs>
    <linearGradient id="cola" gradientUnits="userSpaceOnUse" x1="690" y1="0" x2="960" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="difuminado"><rect width="${OG.w}" height="${OG.h}" fill="url(#cola)"/></mask>
  </defs>
  <rect width="${OG.w}" height="${OG.h}" fill="#f5f5f7"/>
  <g mask="url(#difuminado)">
    <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${escala.toFixed(5)}) translate(${-bMaster.x} ${-bMaster.y})" fill="#1d1d1f">
      ${cuerpo(master).trim()}
    </g>
  </g>
  <g font-family="SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif" fill="#1d1d1f">
    <text x="72" y="214" font-size="20" font-weight="600" letter-spacing="2.4" fill="#6e6e73">OWN LANE</text>
    <text x="72" y="298" font-size="54" font-weight="700" letter-spacing="-1.7">${l1}</text>
    <text x="72" y="364" font-size="54" font-weight="700" letter-spacing="-1.7" fill="#86868b">${l2}</text>
    <text x="72" y="444" font-size="22" fill="#6e6e73">${pie}</text>
  </g>
</svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`public/og/landing-${lang}.png`);
}
console.log('og/landing-es.png, og/landing-en.png');
