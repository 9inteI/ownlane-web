/** Politica de privacidad. El espanol viene de OwnLane/docs/privacidad.html;
 *  el ingles esta traducido para la web. */
export type Bloque =
  | { tipo: 'p'; texto: string }
  | { tipo: 'p-sutil'; texto: string }
  | { tipo: 'lista'; puntos: string[] }
  | { tipo: 'tarjeta'; parrafos: { texto: string; fuerte?: boolean; sutil?: boolean }[] };

export interface Seccion {
  titulo: string | null;
  bloques: Bloque[];
}

export const politica: Record<'es' | 'en', {
  titulo: string;
  descripcion: string;
  h1: string;
  fecha: string;
  contactoTitulo: string;
  contactoTexto: string;
  secciones: Seccion[];
}> = {
  es: {
    titulo: 'Own Lane · Política de privacidad',
    descripcion: 'Own Lane no recoge datos. No hay cuenta, ni servidor, ni analítica, ni seguimiento.',
    h1: 'Política de privacidad',
    fecha: 'Última actualización: 27 de agosto de 2026',
    contactoTitulo: 'Contacto',
    contactoTexto: 'Para cualquier duda sobre esta política:',
    secciones: [
      {
        titulo: null,
        bloques: [
          {
            tipo: 'tarjeta',
            parrafos: [
              { texto: 'Own Lane no recoge nada.', fuerte: true },
              { texto: 'No hay cuenta, no hay servidor, no hay analítica y no hay seguimiento publicitario. Todo lo que la app sabe de ti está en tu iPhone y no sale de ahí.' },
              { texto: 'Esto no es una promesa vaga: la app no contiene ni una sola llamada de red.', sutil: true },
            ],
          },
        ],
      },
      {
        titulo: 'Qué guarda la app, y dónde',
        bloques: [
          { tipo: 'p', texto: 'Todo en el almacenamiento local de tu dispositivo:' },
          {
            tipo: 'lista',
            puntos: [
              'Tu plan de entrenamiento: meta, fecha, días por semana y las sesiones.',
              'Tus salidas: duración, distancia, ritmo, recorrido y cómo te sentiste.',
              'Tus sesiones de fuerza.',
              'Tus preferencias: hora del recordatorio y avisos sonoros.',
            ],
          },
          { tipo: 'p', texto: 'Si borras la app, se borra todo. También puedes borrarlo desde Ajustes → Empezar de cero.' },
        ],
      },
      {
        titulo: 'Ubicación',
        bloques: [
          { tipo: 'p', texto: 'Se usa solo mientras grabas una salida, para medir la distancia y dibujar el recorrido. El recorrido se guarda en tu dispositivo junto a esa salida. No se envía a ningún sitio y no se usa para nada más.' },
        ],
      },
      {
        titulo: 'Salud',
        bloques: [
          { tipo: 'p', texto: 'Con tu permiso explícito, Own Lane:' },
          {
            tipo: 'lista',
            puntos: [
              'lee tus pulsaciones y tu distancia durante la sesión, y los entrenamientos que hayas grabado con otras apps o con el Apple Watch;',
              'escribe cada salida como entrenamiento, para que cuente en tus anillos.',
            ],
          },
          { tipo: 'p', texto: 'Estos datos se quedan entre tu app Salud y tu dispositivo. Own Lane no los transmite a ningún servidor, no los usa para publicidad y no los comparte con terceros. Puedes revocar el permiso en cualquier momento desde la app Salud.' },
        ],
      },
      {
        titulo: 'Apple Watch',
        bloques: [
          { tipo: 'p', texto: 'Si usas la app del reloj, el plan y las salidas viajan directamente entre tu iPhone y tu reloj, por el canal cifrado del sistema. No pasan por ningún servidor nuestro, porque no tenemos ninguno.' },
        ],
      },
      {
        titulo: 'Suscripción',
        bloques: [
          { tipo: 'p', texto: 'Las compras las gestiona Apple. Own Lane nunca ve tu método de pago, tu número de tarjeta ni tu identificador de Apple. Del sistema solo recibimos si tienes una suscripción activa o no.' },
        ],
      },
      {
        titulo: 'Terceros',
        bloques: [{ tipo: 'p', texto: 'Ninguno. La app no incluye SDK de analítica, de publicidad ni de seguimiento.' }],
      },
      {
        titulo: 'Esta web',
        bloques: [
          { tipo: 'p', texto: 'La web tampoco. No hay cookies, no hay analítica y no hay píxeles de seguimiento: no se carga ni un solo recurso de otro dominio. Por eso no verás un aviso de consentimiento — no habría nada que consentir.' },
        ],
      },
      {
        titulo: 'Menores',
        bloques: [{ tipo: 'p', texto: 'Own Lane no está dirigida a menores de 13 años, y no recoge datos de nadie.' }],
      },
      {
        titulo: 'Tus derechos',
        bloques: [
          { tipo: 'p', texto: 'El Reglamento General de Protección de Datos te reconoce derechos de acceso, rectificación y supresión sobre tus datos personales. En el caso de Own Lane esos derechos se ejercen solos: los datos están en tu dispositivo, los ves dentro de la app y los borras cuando quieras sin pedírnoslo. No conservamos ninguna copia.' },
        ],
      },
      {
        titulo: 'Cambios',
        bloques: [{ tipo: 'p', texto: 'Si esta política cambia, se actualizará la fecha de arriba y la versión que viaja dentro de la app.' }],
      },
    ],
  },
  en: {
    titulo: 'Own Lane · Privacy policy',
    descripcion: 'Own Lane collects no data. No account, no server, no analytics, no tracking.',
    h1: 'Privacy policy',
    fecha: 'Last updated: 27 August 2026',
    contactoTitulo: 'Contact',
    contactoTexto: 'For any question about this policy:',
    secciones: [
      {
        titulo: null,
        bloques: [
          {
            tipo: 'tarjeta',
            parrafos: [
              { texto: 'Own Lane collects nothing.', fuerte: true },
              { texto: 'No account, no server, no analytics and no advertising tracking. Everything the app knows about you is on your iPhone and never leaves it.' },
              { texto: "This is not a vague promise: the app doesn't contain a single network call.", sutil: true },
            ],
          },
        ],
      },
      {
        titulo: 'What the app stores, and where',
        bloques: [
          { tipo: 'p', texto: "Everything in your device's local storage:" },
          {
            tipo: 'lista',
            puntos: [
              'Your training plan: goal, date, days per week and the sessions.',
              'Your runs: duration, distance, pace, route and how it felt.',
              'Your strength sessions.',
              'Your preferences: reminder time and audio cues.',
            ],
          },
          { tipo: 'p', texto: 'If you delete the app, it all goes. You can also erase it from Settings → Start over.' },
        ],
      },
      {
        titulo: 'Location',
        bloques: [
          { tipo: 'p', texto: 'Used only while you are recording a run, to measure the distance and draw the route. The route is stored on your device alongside that run. It is not sent anywhere and is not used for anything else.' },
        ],
      },
      {
        titulo: 'Health',
        bloques: [
          { tipo: 'p', texto: 'With your explicit permission, Own Lane:' },
          {
            tipo: 'lista',
            puntos: [
              'reads your heart rate and your distance during the session, and the workouts you recorded with other apps or with the Apple Watch;',
              'writes each run as a workout, so it counts towards your rings.',
            ],
          },
          { tipo: 'p', texto: 'This data stays between your Health app and your device. Own Lane does not transmit it to any server, does not use it for advertising and does not share it with third parties. You can revoke the permission at any time from the Health app.' },
        ],
      },
      {
        titulo: 'Apple Watch',
        bloques: [
          { tipo: 'p', texto: 'If you use the watch app, the plan and the runs travel directly between your iPhone and your watch, over the encrypted system channel. They do not pass through any server of ours, because we do not have one.' },
        ],
      },
      {
        titulo: 'Subscription',
        bloques: [
          { tipo: 'p', texto: 'Purchases are handled by Apple. Own Lane never sees your payment method, your card number or your Apple Account. From the system we only receive whether you have an active subscription or not.' },
        ],
      },
      {
        titulo: 'Third parties',
        bloques: [{ tipo: 'p', texto: 'None. The app includes no analytics, advertising or tracking SDK.' }],
      },
      {
        titulo: 'This website',
        bloques: [
          { tipo: 'p', texto: 'Nor does the site. No cookies, no analytics and no tracking pixels: not a single resource is loaded from another domain. That is why you will not see a consent banner — there would be nothing to consent to.' },
        ],
      },
      {
        titulo: 'Minors',
        bloques: [{ tipo: 'p', texto: 'Own Lane is not directed at children under 13, and collects nobody’s data.' }],
      },
      {
        titulo: 'Your rights',
        bloques: [
          { tipo: 'p', texto: 'The General Data Protection Regulation gives you rights of access, rectification and erasure over your personal data. With Own Lane those rights exercise themselves: the data is on your device, you see it inside the app and you delete it whenever you want without asking us. We keep no copy.' },
        ],
      },
      {
        titulo: 'Changes',
        bloques: [{ tipo: 'p', texto: 'If this policy changes, the date above and the version shipped inside the app will be updated.' }],
      },
    ],
  },
};
