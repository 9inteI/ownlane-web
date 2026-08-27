/** Capturas sacadas del simulador con scripts/sim.sh, en las cuatro
 *  combinaciones de tema e idioma, a resolucion nativa (1206x2622).
 *
 *  Progreso y el detalle de una salida NO estan aqui: necesitan salidas
 *  grabadas y un simulador recien instalado las ensena vacias. Para esas dos
 *  se siguen usando los recortes de las capturas de App Store, que solo
 *  existen en claro y en espanol. */
import type { ImageMetadata } from 'astro';
import type { Idioma } from '../i18n/routes';

import hoyClaroEs from '../assets/capturas/app/hoy-light-es.png';
import hoyOscuroEs from '../assets/capturas/app/hoy-dark-es.png';
import hoyClaroEn from '../assets/capturas/app/hoy-light-en.png';
import hoyOscuroEn from '../assets/capturas/app/hoy-dark-en.png';
import planClaroEs from '../assets/capturas/app/plan-light-es.png';
import planOscuroEs from '../assets/capturas/app/plan-dark-es.png';
import planClaroEn from '../assets/capturas/app/plan-light-en.png';
import planOscuroEn from '../assets/capturas/app/plan-dark-en.png';
import aprendeClaroEs from '../assets/capturas/app/aprende-light-es.png';
import aprendeOscuroEs from '../assets/capturas/app/aprende-dark-es.png';
import aprendeClaroEn from '../assets/capturas/app/aprende-light-en.png';
import aprendeOscuroEn from '../assets/capturas/app/aprende-dark-en.png';

export interface Captura {
  claro: ImageMetadata;
  oscuro: ImageMetadata;
  alt: string;
}

type Pantalla = 'hoy' | 'plan' | 'aprende';

const tabla: Record<Pantalla, Record<Idioma, Captura>> = {
  hoy: {
    es: { claro: hoyClaroEs, oscuro: hoyOscuroEs, alt: 'Pantalla Hoy: la sesión del día, la semana y la meta' },
    en: { claro: hoyClaroEn, oscuro: hoyOscuroEn, alt: "Today screen: the day's session, the week and the goal" },
  },
  plan: {
    es: { claro: planClaroEs, oscuro: planOscuroEs, alt: 'Pantalla Plan: la meta, las semanas y las sesiones' },
    en: { claro: planClaroEn, oscuro: planOscuroEn, alt: 'Plan screen: the goal, the weeks and the sessions' },
  },
  aprende: {
    es: { claro: aprendeClaroEs, oscuro: aprendeOscuroEs, alt: 'Pantalla Aprende: artículos con su nivel de evidencia' },
    en: { claro: aprendeClaroEn, oscuro: aprendeOscuroEn, alt: 'Learn screen: articles with their evidence level' },
  },
};

export const captura = (pantalla: Pantalla, lang: Idioma): Captura => tabla[pantalla][lang];
