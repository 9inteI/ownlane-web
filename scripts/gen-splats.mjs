/* Port de OwnLane/Design/InkSplash.swift a SVG estatico.
 *
 * La geometria de la app es determinista: tres tablas fijas de ocho lobulos mas
 * tres gotas. No hay aleatoriedad ni parametros de runtime, asi que no hay
 * ninguna razon para arrastrar un Canvas al navegador.
 *
 * Se conserva la superposicion de formas del mismo color (cuerpo, cuello, bulbo)
 * en vez de resolver un contorno unico, por la razon que da el fichero Swift:
 * un contorno unico obliga a calcular donde se cruzan las curvas, y cualquier
 * error ahi saca picos.
 *
 * One-off: se ejecuta a mano y el resultado se versiona.
 *   node scripts/gen-splats.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

// SplatBody.decorative — tablas literales de InkSplash.swift
const TABLAS = [
  [[0.98, 0.10, 0.30], [0.52, -0.86, 0.22], [-0.18, -0.98, 0.26], [-0.82, -0.52, 0.20],
   [-0.96, 0.28, 0.28], [-0.44, 0.92, 0.24], [0.26, 0.98, 0.19], [0.80, 0.66, 0.25]],
  [[0.92, -0.34, 0.26], [0.34, -0.96, 0.29], [-0.46, -0.88, 0.20], [-0.98, -0.12, 0.31],
   [-0.60, 0.78, 0.23], [0.08, 1.00, 0.27], [0.72, 0.72, 0.21], [0.14, -0.62, 0.17]],
  [[1.00, 0.24, 0.24], [0.44, -0.92, 0.31], [-0.30, -0.94, 0.20], [-0.90, -0.44, 0.27],
   [-0.86, 0.50, 0.22], [-0.12, 0.98, 0.29], [0.62, 0.84, 0.23], [0.86, -0.56, 0.18]],
];

// InkSplash.specks
const GOTAS = [
  [[1.04, 0.66, 0.07], [0.90, 0.04, 0.04], [-0.02, 0.86, 0.05]],
  [[-0.04, 0.40, 0.06], [0.96, 0.12, 0.045], [0.70, 1.02, 0.035]],
  [[1.02, 0.40, 0.06], [0.10, 0.02, 0.04], [0.40, 1.04, 0.05]],
];

// Constantes de SplatBody.decorative
const CORE_INSET = 0.26;
const NECK_BASE = 1.1;
const NECK_TIP = 0.5;

// El marco del InkSplash padre. La SplatBody ocupa el 88% centrada al 6%.
const MARCO = 100;
const CUERPO = MARCO * 0.88;
const DESPL = MARCO * 0.06;

const r2 = (n) => Math.round(n * 1000) / 1000;

function cuerpo(variante) {
  const s = CUERPO;
  const coreMin = s * CORE_INSET;
  const coreLado = s - coreMin * 2;
  const cr = coreLado / 2;
  const unidad = s / 2;
  const centro = { x: s / 2, y: s / 2 };

  const formas = [];

  // El cuerpo. En decorative, core es cuadrado y cr = lado/2: un circulo.
  formas.push(
    `<rect x="${r2(coreMin + DESPL)}" y="${r2(coreMin + DESPL)}" ` +
    `width="${r2(coreLado)}" height="${r2(coreLado)}" rx="${r2(cr)}"/>`
  );

  for (const [px, py, size] of TABLAS[variante]) {
    const r = unidad * size;
    const bulbo = {
      x: centro.x + (s / 2 - r) * px,
      y: centro.y + (s / 2 - r) * py,
    };

    // El cuello arranca del punto del cuerpo mas cercano al bulbo, asi que sale
    // siempre perpendicular a la piel del cuerpo.
    const spineX = Math.min(Math.max(bulbo.x, coreMin + cr), coreMin + coreLado - cr);
    const spine = { x: spineX, y: centro.y };
    const dx = bulbo.x - spine.x;
    const dy = bulbo.y - spine.y;
    const largo = Math.max(Math.hypot(dx, dy), 0.001);
    const u = { x: dx / largo, y: dy / largo };
    const v = { x: -u.y, y: u.x };
    const base = { x: spine.x + u.x * cr * 0.86, y: spine.y + u.y * cr * 0.86 };

    const wb = r * NECK_BASE;
    const wt = r * NECK_TIP;

    const b1 = { x: base.x + v.x * wb, y: base.y + v.y * wb };
    const b2 = { x: base.x - v.x * wb, y: base.y - v.y * wb };
    const t1 = { x: bulbo.x + v.x * wt, y: bulbo.y + v.y * wt };
    const t2 = { x: bulbo.x - v.x * wt, y: bulbo.y - v.y * wt };

    // Lados curvos hacia dentro, desplazamiento pequeno y monotono: no se cruzan.
    const cintura = (a, b, signo) => {
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const inset = (wb - wt) * 0.55 * signo;
      return { x: mid.x - v.x * inset, y: mid.y - v.y * inset };
    };

    const c1 = cintura(b1, t1, 1);
    const c2 = cintura(t2, b2, -1);
    const d = DESPL;
    formas.push(
      `<path d="M${r2(b1.x + d)} ${r2(b1.y + d)}` +
      `Q${r2(c1.x + d)} ${r2(c1.y + d)} ${r2(t1.x + d)} ${r2(t1.y + d)}` +
      `L${r2(t2.x + d)} ${r2(t2.y + d)}` +
      `Q${r2(c2.x + d)} ${r2(c2.y + d)} ${r2(b2.x + d)} ${r2(b2.y + d)}Z"/>`
    );
    formas.push(
      `<circle cx="${r2(bulbo.x + d)}" cy="${r2(bulbo.y + d)}" r="${r2(r)}"/>`
    );
  }

  // Las gotas se posicionan sobre el marco padre, no sobre la SplatBody, y
  // pueden salirse de el (px hasta 1.04).
  const caja = { x0: 0, y0: 0, x1: MARCO, y1: MARCO };
  for (const [x, y, size] of GOTAS[variante]) {
    const rr = (MARCO * size) / 2;
    const cx = MARCO * x;
    const cy = MARCO * y;
    formas.push(`<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(rr)}"/>`);
    caja.x0 = Math.min(caja.x0, cx - rr);
    caja.y0 = Math.min(caja.y0, cy - rr);
    caja.x1 = Math.max(caja.x1, cx + rr);
    caja.y1 = Math.max(caja.y1, cy + rr);
  }

  // viewBox ampliado a las gotas que se salen: en SwiftUI el ZStack no recorta.
  const vb = [
    r2(caja.x0), r2(caja.y0),
    r2(caja.x1 - caja.x0), r2(caja.y1 - caja.y0),
  ].join(' ');

  return { vb, formas };
}

for (let i = 0; i < 3; i++) {
  const { vb, formas } = cuerpo(i);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="currentColor" ` +
    `aria-hidden="true" focusable="false">\n  ` +
    formas.join('\n  ') +
    `\n</svg>\n`;
  const destino = join(RAIZ, 'src/components/ink/splats', `splat-${i + 1}.svg`);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, svg);
  console.log(`splat-${i + 1}.svg  viewBox="${vb}"  ${formas.length} formas  ${svg.length} B`);
}
