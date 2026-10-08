/** Politica de privacidad. El espanol viene de OwnLane/docs/privacidad.html;
 *  el ingles esta traducido para la web.
 *
 *  REVISION LEGAL (Elena, 08/10/2026): los marcadores [PENDIENTE ...] deben
 *  rellenarse con los datos reales del titular ANTES de fusionar este PR. */
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
    descripcion: 'Own Lane no recoge tus datos en servidores propios. No hay cuenta, ni analítica, ni seguimiento.',
    h1: 'Política de privacidad',
    fecha: 'Última actualización: [PENDIENTE: fecha de publicación]',
    contactoTitulo: 'Contacto',
    contactoTexto: 'Para cualquier duda sobre esta política o para ejercer tus derechos:',
    secciones: [
      {
        titulo: null,
        bloques: [
          {
            tipo: 'tarjeta',
            parrafos: [
              { texto: 'Own Lane no recoge tus datos.', fuerte: true },
              { texto: 'No hay cuenta, no hay servidor propio, no hay analítica y no hay seguimiento publicitario. Todo lo que la app sabe de ti está en tu iPhone y no sale de ahí.' },
              { texto: 'La única comunicación con servidores es la que hace el propio sistema con Apple para gestionar la suscripción (ver «Suscripción»). Own Lane no envía tus datos de entrenamiento, salud ni ubicación a ningún servidor.', sutil: true },
            ],
          },
        ],
      },
      {
        titulo: 'Responsable',
        bloques: [
          { tipo: 'p', texto: 'Responsable del tratamiento y titular de la app: [PENDIENTE: nombre y apellidos completos del titular], con NIF [PENDIENTE: NIF], domicilio en [PENDIENTE: dirección postal] y correo de contacto rbd.cysec@pm.me.' },
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
          { tipo: 'p', texto: 'Las compras las gestiona Apple a través del sistema (App Store), lo que implica comunicaciones entre tu dispositivo y Apple que Own Lane no controla y que se rigen por la política de privacidad de Apple. Own Lane nunca ve tu método de pago, tu número de tarjeta ni tu identificador de Apple. Del sistema solo recibimos si tienes una suscripción activa o no.' },
        ],
      },
      {
        titulo: 'Terceros',
        bloques: [{ tipo: 'p', texto: 'La app no incluye SDK de analítica, de publicidad ni de seguimiento. El único tercero que interviene es Apple, para las compras y la suscripción.' }],
      },
      {
        titulo: 'Esta web',
        bloques: [
          { tipo: 'p', texto: 'Esta web no usa cookies, ni analítica, ni píxeles de seguimiento. Está alojada en [PENDIENTE: confirmar proveedor de alojamiento, p. ej. Vercel], que, como cualquier servidor web, puede registrar datos técnicos de la visita (dirección IP, fecha y hora, página solicitada) por motivos de seguridad y funcionamiento. Los enlaces a la App Store pueden incluir un identificador de campaña para saber desde qué página llegas; el seguimiento posterior lo realiza Apple, no esta web.' },
        ],
      },
      {
        titulo: 'Menores',
        bloques: [{ tipo: 'p', texto: 'Own Lane no está dirigida a menores de 13 años, y no recoge datos de nadie.' }],
      },
      {
        titulo: 'Tus derechos',
        bloques: [
          { tipo: 'p', texto: 'El Reglamento General de Protección de Datos te reconoce derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad. En el caso de Own Lane esos derechos se ejercen en gran medida solos: los datos están en tu dispositivo, los ves dentro de la app y los borras cuando quieras. Si tienes dudas o quieres ejercerlos respecto a cualquier dato que pudiéramos tratar (por ejemplo, si nos escribes por correo), escríbenos al contacto indicado abajo. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).' },
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
    descripcion: 'Own Lane does not collect your data on its own servers. No account, no analytics, no tracking.',
    h1: 'Privacy policy',
    fecha: 'Last updated: [PENDIENTE: publication date]',
    contactoTitulo: 'Contact',
    contactoTexto: 'For any question about this policy or to exercise your rights:',
    secciones: [
      {
        titulo: null,
        bloques: [
          {
            tipo: 'tarjeta',
            parrafos: [
              { texto: 'Own Lane does not collect your data.', fuerte: true },
              { texto: 'No account, no server of our own, no analytics and no advertising tracking. Everything the app knows about you is on your iPhone and never leaves it.' },
              { texto: 'The only communication with servers is the one your system itself has with Apple to manage the subscription (see “Subscription”). Own Lane does not send your training, health or location data to any server.', sutil: true },
            ],
          },
        ],
      },
      {
        titulo: 'Controller',
        bloques: [
          { tipo: 'p', texto: 'Data controller and app owner: [PENDIENTE: full name of the owner], tax ID [PENDIENTE: NIF], address [PENDIENTE: postal address], contact email rbd.cysec@pm.me.' },
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
          { tipo: 'p', texto: 'Purchases are handled by Apple through the system (App Store), which involves communications between your device and Apple that Own Lane does not control and that are governed by Apple’s privacy policy. Own Lane never sees your payment method, your card number or your Apple Account. From the system we only receive whether you have an active subscription or not.' },
        ],
      },
      {
        titulo: 'Third parties',
        bloques: [{ tipo: 'p', texto: 'The app includes no analytics, advertising or tracking SDK. The only third party involved is Apple, for purchases and the subscription.' }],
      },
      {
        titulo: 'This website',
        bloques: [
          { tipo: 'p', texto: 'This site uses no cookies, no analytics and no tracking pixels. It is hosted by [PENDIENTE: confirm hosting provider, e.g. Vercel], which, like any web server, may log technical visit data (IP address, date and time, requested page) for security and operation. Links to the App Store may include a campaign identifier to tell which page you came from; any later tracking is done by Apple, not by this site.' },
        ],
      },
      {
        titulo: 'Minors',
        bloques: [{ tipo: 'p', texto: 'Own Lane is not directed at children under 13, and collects nobody’s data.' }],
      },
      {
        titulo: 'Your rights',
        bloques: [
          { tipo: 'p', texto: 'The General Data Protection Regulation gives you rights of access, rectification, erasure, objection, restriction and portability. With Own Lane those rights largely exercise themselves: the data is on your device, you see it inside the app and you delete it whenever you want. If you have questions or want to exercise them regarding any data we might process (for example, if you email us), write to the contact below. You may also lodge a complaint with the Spanish Data Protection Agency (aepd.es).' },
        ],
      },
      {
        titulo: 'Changes',
        bloques: [{ tipo: 'p', texto: 'If this policy changes, the date above and the version shipped inside the app will be updated.' }],
      },
    ],
  },
};
