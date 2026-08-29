/** Datos de la app. App Store ID sacado de
 *  OwnLane/Features/Share/ShareIdentity.swift (enum AppLink).
 *
 *  La URL va SIN codigo de pais a proposito. `apps.apple.com/us/...` manda a
 *  todo el mundo a la tienda estadounidense, y un visitante espanol se
 *  encontraria una ficha que no puede comprar; sin pais, Apple redirige a la
 *  tienda de cada uno. El slug se queda porque es lo unico legible de la URL.
 *
 *  Los precios son los que hay configurados en App Store Connect, comprobados
 *  el 29/08/2026. Si los cambias alli, cambialos aqui: esta pagina los publica.
 */
export const APP = {
  nombre: 'Own Lane',
  appStoreId: '6805894451',
  appStoreUrl: 'https://apps.apple.com/app/own-lane/id6805894451',
  bundleId: 'com.rubendiaz.ownlane',
  email: 'rbd.cysec@pm.me',
  sitio: 'https://ownlane.app',
  precios: {
    anual: '49,99 €',
    mensual: '7,99 €',
    anualEN: '€49.99',
    mensualEN: '€7.99',
    /** Solo en el anual. El mensual no la tiene, y el boton de la app no la
     *  ofrece cuando hay mensual marcado. */
    pruebaDias: 7,
  },
} as const;
