/** Mapa explicito de rutas. Los slugs se traducen: no son rutas espejo.
 *  Existe para que el selector de idioma lleve a LA MISMA pagina en el otro
 *  idioma —no a la home, que es el error clasico— y para emitir los hreflang. */

export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

export const rutas = {
  home: { es: '/', en: '/en' },
  soporte: { es: '/soporte', en: '/en/support' },
  privacidad: { es: '/privacidad', en: '/en/privacy' },
  plus: { es: '/plus', en: '/en/plus' },
  aprende: { es: '/aprende', en: '/en/learn' },
  prensa: { es: '/prensa', en: '/en/press' },
} as const;

export type Pagina = keyof typeof rutas;

export const ruta = (pagina: Pagina, lang: Idioma): string => rutas[pagina][lang];

export const rutaArticulo = (slug: string, lang: Idioma): string =>
  lang === 'es' ? `/aprende/${slug}` : `/en/learn/${slug}`;

/** El idioma sale del prefijo de la URL: /en/... es ingles, el resto espanol. */
export function idiomaDe(url: URL): Idioma {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'es';
}
