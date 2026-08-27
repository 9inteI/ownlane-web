/* Borde de goteo: el canto por el que un bloque de tinta chorrea.
 *
 * Un chorreton que crece NO se anima deformando el path —eso obliga a
 * recalcular la geometria en cada frame. Cada gota es su propio <path> con
 * transform-origin arriba, y se anima con scaleY, que va en la GPU.
 * Por eso el generador emite las gotas sueltas, no un contorno unico.
 *
 * One-off:  node scripts/gen-drips.mjs
 */
import { writeFileSync } from 'node:fs';

function prng(s) {
  return function () {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r2 = (n) => Math.round(n * 10) / 10;

const ANCHO = 1200;
const ALTO = 250;

/** Una gota: cuello estrecho que se ensancha en un bulbo al final.
 *  La cintura es lo que la hace leerse como pintura y no como una salchicha:
 *  el cuello tiene que ser MAS FINO que el bulbo, no igual. */
function gota(x, ancho, largo) {
  const w = ancho / 2;          // semiancho en el arranque, pegado al bloque
  const rb = w * 0.52;          // radio del bulbo: la mitad del arranque
  const cuello = rb * 0.78;     // la cintura, aun mas fina que el bulbo
  const yb = largo - rb;        // centro del bulbo

  return (
    `M${r2(x - w)} 0` +
    // lado izquierdo: se estrecha hasta la cintura y vuelve a abrir al bulbo
    `C${r2(x - w)} ${r2(largo * 0.22)} ${r2(x - cuello)} ${r2(largo * 0.3)} ${r2(x - cuello)} ${r2(largo * 0.55)}` +
    `C${r2(x - cuello)} ${r2(yb - rb * 0.72)} ${r2(x - rb)} ${r2(yb - rb * 0.6)} ${r2(x - rb)} ${r2(yb)}` +
    // el bulbo
    `a${r2(rb)} ${r2(rb)} 0 1 0 ${r2(rb * 2)} 0` +
    // lado derecho, en espejo
    `C${r2(x + rb)} ${r2(yb - rb * 0.6)} ${r2(x + cuello)} ${r2(yb - rb * 0.72)} ${r2(x + cuello)} ${r2(largo * 0.55)}` +
    `C${r2(x + cuello)} ${r2(largo * 0.3)} ${r2(x + w)} ${r2(largo * 0.22)} ${r2(x + w)} 0Z`
  );
}

function borde(semilla, cuantas = 11) {
  const rnd = prng(semilla);
  const gotas = [];
  const paso = ANCHO / cuantas;
  // Tres gotas largas garantizadas. Dejarlo al azar sale a veces un peine
  // de gotas todas iguales, que es justo lo que no queremos.
  const largas = new Set();
  while (largas.size < 3) largas.add(Math.floor(rnd() * cuantas));
  for (let i = 0; i < cuantas; i++) {
    const x = paso * (i + 0.5) + (rnd() - 0.5) * paso * 0.7;
    const ancho = 26 + rnd() * 60;
    // Una de cada cuatro cae mucho mas: si todas miden igual parece un peine.
    const largo = largas.has(i) ? 132 + rnd() * 96 : 34 + rnd() * 62;
    gotas.push({ x, d: gota(x, ancho, largo), retardo: r2(rnd() * 0.5), largo });
  }
  return gotas.sort((a, b) => a.x - b.x);
}

for (const [nombre, semilla] of [['drip-a', 11], ['drip-b', 47]]) {
  const gotas = borde(semilla);
  const cuerpo = gotas
    .map(
      (g) =>
        `  <path class="gota" style="--x:${r2(g.x)}px;--retardo:${g.retardo}s" d="${g.d}"/>`
    )
    .join('\n');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ANCHO} ${ALTO}" ` +
    `fill="currentColor" aria-hidden="true" focusable="false">\n` +
    cuerpo +
    `\n</svg>\n`;
  writeFileSync(`src/components/ink/${nombre}.svg`, svg);
  console.log(`${nombre}.svg  ${gotas.length} gotas  ${svg.length} B  max ${r2(Math.max(...gotas.map((g) => g.largo)))}px`);
}
