/** Chrome de UI: nav, footer, etiquetas. El copy largo NO vive aqui —
 *  parrafos de sesenta palabras en un diccionario plano son inmanejables a la
 *  tercera edicion. Ese va en src/data/*.ts y en las content collections. */
import type { Idioma } from './routes';

export const ui = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.plus': 'Plus',
    'nav.aprende': 'Aprende',
    'nav.soporte': 'Soporte',
    'nav.prensa': 'Prensa',
    'nav.saltar': 'Saltar al contenido',
    'nav.menu': 'Menú',
    'cta.descargar': 'Descárgalo en el App Store',
    'cta.appstore': 'App Store',
    'footer.privacidad': 'Política de privacidad',
    'footer.soporte': 'Soporte',
    'footer.prensa': 'Prensa',
    'footer.aviso':
      'Own Lane no sustituye a un médico ni a un fisioterapeuta. Si algo te duele, para y consúltalo.',
    'footer.sinAnalitica': 'Esta web no usa analítica, ni cookies, ni seguimiento. Como la app.',
    'footer.contacto': 'Contacto',
    'lang.otro': 'English',
    'lang.etiqueta': 'Cambiar idioma',
    'evidencia.solid': 'Evidencia sólida',
    'evidencia.reasonable': 'Razonable',
    'evidencia.myth': 'Creencia sin respaldo',
    'articulo.fuentes': 'Fuentes',
    'articulo.minutos': 'min de lectura',
    'articulo.actualizado': 'Actualizado',
    'articulo.sigue': 'Sigue con',
    'articulo.cta': 'Own Lane te pregunta cómo te has sentido después de cada salida y ajusta el plan. El plan entero hasta tu meta es gratis.',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.plus': 'Plus',
    'nav.aprende': 'Learn',
    'nav.soporte': 'Support',
    'nav.prensa': 'Press',
    'nav.saltar': 'Skip to content',
    'nav.menu': 'Menu',
    'cta.descargar': 'Download on the App Store',
    'cta.appstore': 'App Store',
    'footer.privacidad': 'Privacy policy',
    'footer.soporte': 'Support',
    'footer.prensa': 'Press',
    'footer.aviso':
      'Own Lane is no substitute for a doctor or a physiotherapist. If something hurts, stop and get it checked.',
    'footer.sinAnalitica': 'This site uses no analytics, no cookies, no tracking. Like the app.',
    'footer.contacto': 'Contact',
    'lang.otro': 'Español',
    'lang.etiqueta': 'Change language',
    'evidencia.solid': 'Solid evidence',
    'evidencia.reasonable': 'Reasonable',
    'evidencia.myth': 'Unsupported belief',
    'articulo.fuentes': 'Sources',
    'articulo.minutos': 'min read',
    'articulo.actualizado': 'Updated',
    'articulo.sigue': 'Keep reading',
    'articulo.cta': 'Own Lane asks how each run felt and adjusts the plan. The whole plan to your goal is free.',
  },
} as const;

export type Clave = keyof (typeof ui)['es'];

export function t(lang: Idioma) {
  return (clave: Clave): string => ui[lang][clave];
}
