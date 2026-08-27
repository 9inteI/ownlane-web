/* Manchas dramaticas para los momentos grandes de la web.
 *
 * Las tres de gen-splats.mjs son el port literal de InkSplash.swift y se quedan
 * como estan: son las que usa la app y las que van de fondo al 6-10%. Pero esa
 * geometria coloca TODOS los bulbos tangentes al marco, con radios parecidos,
 * asi que a plena opacidad se lee como una margarita, no como pintura. En la app
 * da igual porque nunca pasa del 17%; aqui si importa.
 *
 * Estas anaden lo que falta para que se lea como salpicadura: distancia al
 * centro irregular, radios muy desiguales, brazos largos y finos, y gotas
 * satelite dispersas. Deterministas: PRNG con semilla fija, misma salida siempre.
 *
 * One-off:  node scripts/gen-splatter.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';

/** mulberry32: PRNG pequeno y estable, para que el SVG no cambie entre builds. */
function prng(semilla) {
  return function () {
    semilla |= 0;
    semilla = (semilla + 0x6d2b79f5) | 0;
    let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n) => Math.round(n * 100) / 100;
const C = 100; // centro del viewBox 0..200

function mancha(semilla, { lobulos = 13, gotas = 9, nucleo = 30 } = {}) {
  const rnd = prng(semilla);
  const formas = [];
  const caja = { x0: C, y0: C, x1: C, y1: C };
  const tocar = (x, y, r) => {
    caja.x0 = Math.min(caja.x0, x - r);
    caja.y0 = Math.min(caja.y0, y - r);
    caja.x1 = Math.max(caja.x1, x + r);
    caja.y1 = Math.max(caja.y1, y + r);
  };

  // Nucleo: no un circulo, una masa algo deformada.
  const nPuntos = 9;
  let d = '';
  const radios = [];
  for (let i = 0; i < nPuntos; i++) radios.push(nucleo * (0.82 + rnd() * 0.36));
  for (let i = 0; i <= nPuntos; i++) {
    const a = (i / nPuntos) * Math.PI * 2;
    const rad = radios[i % nPuntos];
    const x = C + Math.cos(a) * rad;
    const y = C + Math.sin(a) * rad;
    if (i === 0) d = `M${r2(x)} ${r2(y)}`;
    else {
      const ap = ((i - 0.5) / nPuntos) * Math.PI * 2;
      const rp = (radios[(i - 1) % nPuntos] + rad) / 2 * 1.13;
      d += `Q${r2(C + Math.cos(ap) * rp)} ${r2(C + Math.sin(ap) * rp)} ${r2(x)} ${r2(y)}`;
    }
    tocar(x, y, 0);
  }
  formas.push(`<path d="${d}Z"/>`);

  // Brazos. La clave: distancia y radio independientes y muy dispares.
  const angulos = [];
  for (let i = 0; i < lobulos; i++) {
    // Desorden angular alto: la pintura se agolpa a un lado y deja hueco al otro.
    angulos.push(((i + rnd() * 1.6 - 0.8) / lobulos) * Math.PI * 2);
  }
  for (const a of angulos) {
    const largo = rnd() < 0.28 ? 1.35 + rnd() * 0.75 : 0.62 + rnd() * 0.5; // ~1 de cada 4 sale disparado
    const dist = nucleo * (1 + largo);
    const r = nucleo * (0.09 + rnd() * 0.34) * (largo > 1.2 ? 0.62 : 1);
    const bx = C + Math.cos(a) * dist;
    const by = C + Math.sin(a) * dist;

    const u = { x: Math.cos(a), y: Math.sin(a) };
    const v = { x: -u.y, y: u.x };
    const base = { x: C + u.x * nucleo * 0.84, y: C + u.y * nucleo * 0.84 };
    const wb = r * (1.25 + rnd() * 0.5);
    const wt = r * (0.36 + rnd() * 0.24);

    const b1 = { x: base.x + v.x * wb, y: base.y + v.y * wb };
    const b2 = { x: base.x - v.x * wb, y: base.y - v.y * wb };
    const t1 = { x: bx + v.x * wt, y: by + v.y * wt };
    const t2 = { x: bx - v.x * wt, y: by - v.y * wt };
    const cintura = (p, q, signo) => {
      const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
      const ins = (wb - wt) * 0.6 * signo;
      return { x: m.x - v.x * ins, y: m.y - v.y * ins };
    };
    const c1 = cintura(b1, t1, 1);
    const c2 = cintura(t2, b2, -1);
    formas.push(
      `<path d="M${r2(b1.x)} ${r2(b1.y)}Q${r2(c1.x)} ${r2(c1.y)} ${r2(t1.x)} ${r2(t1.y)}` +
        `L${r2(t2.x)} ${r2(t2.y)}Q${r2(c2.x)} ${r2(c2.y)} ${r2(b2.x)} ${r2(b2.y)}Z"/>`
    );
    formas.push(`<circle cx="${r2(bx)}" cy="${r2(by)}" r="${r2(r)}"/>`);
    tocar(bx, by, r);
  }

  // Gotas sueltas: lejos y pequenas, que es lo que vende que ha salpicado.
  for (let i = 0; i < gotas; i++) {
    const a = rnd() * Math.PI * 2;
    const dist = nucleo * (1.8 + rnd() * 1.5);
    const r = nucleo * (0.025 + rnd() * 0.075);
    const x = C + Math.cos(a) * dist;
    const y = C + Math.sin(a) * dist;
    formas.push(`<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(r)}"/>`);
    tocar(x, y, r);
  }

  const m = 2;
  const vb = [
    r2(caja.x0 - m), r2(caja.y0 - m),
    r2(caja.x1 - caja.x0 + m * 2), r2(caja.y1 - caja.y0 + m * 2),
  ].join(' ');
  return { vb, formas };
}

mkdirSync('src/components/ink/splats', { recursive: true });
const semillas = [7, 23, 91];
semillas.forEach((s, i) => {
  const { vb, formas } = mancha(s);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="currentColor" ` +
    `aria-hidden="true" focusable="false">\n  ${formas.join('\n  ')}\n</svg>\n`;
  const destino = `src/components/ink/splats/splatter-${i + 1}.svg`;
  writeFileSync(destino, svg);
  console.log(`splatter-${i + 1}.svg  viewBox="${vb}"  ${formas.length} formas  ${svg.length} B`);
});
