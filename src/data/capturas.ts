/** Capturas sacadas del simulador con scripts/sim.sh, en las cuatro
 *  combinaciones de tema e idioma, a resolucion nativa (1206x2622).
 *
 *  Progreso y el detalle de una salida necesitan historial: un simulador
 *  recien instalado los ensena vacios. Los datos que se ven en esas dos los
 *  siembra scripts/sembrar-simulador.py y son FICTICIOS —quince salidas
 *  inventadas con ruta por Malaga, parciales y pulsaciones—, no salidas
 *  reales de nadie. */
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
import progresoRecorteClaroEs from '../assets/capturas/app/progreso-light-es-sinbarra.png';
import progresoRecorteOscuroEs from '../assets/capturas/app/progreso-dark-es-sinbarra.png';
import progresoRecorteClaroEn from '../assets/capturas/app/progreso-light-en-sinbarra.png';
import progresoRecorteOscuroEn from '../assets/capturas/app/progreso-dark-en-sinbarra.png';
import progresoClaroEs from '../assets/capturas/app/progreso-light-es.png';
import progresoOscuroEs from '../assets/capturas/app/progreso-dark-es.png';
import progresoClaroEn from '../assets/capturas/app/progreso-light-en.png';
import progresoOscuroEn from '../assets/capturas/app/progreso-dark-en.png';
import detalleClaroEs from '../assets/capturas/app/detalle-light-es.png';
import detalleOscuroEs from '../assets/capturas/app/detalle-dark-es.png';
import detalleClaroEn from '../assets/capturas/app/detalle-light-en.png';
import detalleOscuroEn from '../assets/capturas/app/detalle-dark-en.png';

export interface Captura {
  claro: ImageMetadata;
  oscuro: ImageMetadata;
  alt: string;
}

/* 'progresoRecorte' es la misma pantalla sin la barra de estado. Dentro de un
   marco de movil la barra hay que verla; recortada dentro de una tarjeta, la
   isla dinamica queda flotando y se lee como una mancha negra. */
type Pantalla = 'hoy' | 'plan' | 'aprende' | 'progreso' | 'progresoRecorte' | 'detalle';

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
  progreso: {
    es: { claro: progresoClaroEs, oscuro: progresoOscuroEs, alt: 'Pantalla Progreso: minutos corriendo por semana y salidas recientes' },
    en: { claro: progresoClaroEn, oscuro: progresoOscuroEn, alt: 'Progress screen: minutes running per week and recent runs' },
  },
  progresoRecorte: {
    es: { claro: progresoRecorteClaroEs, oscuro: progresoRecorteOscuroEs, alt: 'Pantalla Progreso: minutos corriendo por semana' },
    en: { claro: progresoRecorteClaroEn, oscuro: progresoRecorteOscuroEn, alt: 'Progress screen: minutes running per week' },
  },
  detalle: {
    es: { claro: detalleClaroEs, oscuro: detalleOscuroEs, alt: 'Detalle de una salida: mapa del recorrido, tiempo, distancia y pulsaciones' },
    en: { claro: detalleClaroEn, oscuro: detalleOscuroEn, alt: 'Run detail: route map, time, distance and heart rate' },
  },
};

export const captura = (pantalla: Pantalla, lang: Idioma): Captura => tabla[pantalla][lang];
