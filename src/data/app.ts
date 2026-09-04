/** Datos de la app. App Store ID sacado de
 *  OwnLane/Features/Share/ShareIdentity.swift (enum AppLink).
 *
 *  La URL va SIN codigo de pais a proposito. `apps.apple.com/us/...` manda a
 *  todo el mundo a la tienda estadounidense, y un visitante espanol se
 *  encontraria una ficha que no puede comprar; sin pais, Apple redirige a la
 *  tienda de cada uno. El slug se queda porque es lo unico legible de la URL.
 *
 *  Los precios son los que hay configurados en App Store Connect, comprobados
 *  el 04/09/2026 (bajada a 29,99 y 4,99). Si los cambias alli, cambialos aqui: esta pagina los publica.
 */
export const APP = {
  nombre: 'Own Lane',
  appStoreId: '6805894451',
  appStoreUrl: 'https://apps.apple.com/app/own-lane/id6805894451',
  bundleId: 'com.rubendiaz.ownlane',
  email: 'rbd.cysec@pm.me',
  sitio: 'https://ownlane.app',
  precios: {
    anual: '29,99 €',
    mensual: '4,99 €',
    anualEN: '€29.99',
    mensualEN: '€4.99',
    /** Los mismos, como numero en texto, para los JSON-LD de Inicio y Plus. */
    anualEUR: '29.99',
    mensualEUR: '4.99',
    /** Solo en el anual. El mensual no la tiene, y el boton de la app no la
     *  ofrece cuando hay mensual marcado. */
    pruebaDias: 7,
  },
} as const;

/** Token de proveedor de App Store Connect (Analitica → Campanas). No es un
 *  secreto: va en la URL de cada enlace. Se pone en Vercel como
 *  PUBLIC_APPSTORE_PT; si no esta, los enlaces salen como siempre, sin
 *  atribucion, y la web sigue sin rastrear nada por su cuenta. */
const providerToken: string | undefined = import.meta.env.PUBLIC_APPSTORE_PT;

/** Enlace a la ficha con atribucion de campana. `ct` es el canal —web, blog,
 *  plus, sansilvestre— y es lo que App Store Connect ensena en Campanas. */
export const enlaceTienda = (ct: string): string =>
  providerToken
    ? `https://apps.apple.com/app/apple-store/id${APP.appStoreId}?pt=${providerToken}&ct=${ct}&mt=8`
    : APP.appStoreUrl;
