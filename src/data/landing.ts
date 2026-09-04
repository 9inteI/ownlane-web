/** Copy de la landing. Literal de OwnLane/docs/ficha-appstore.md, version 1.1
 *  (publicada), en sus dos idiomas. Fuera del diccionario de i18n a proposito:
 *  parrafos de sesenta palabras en un objeto plano son inmanejables. */

export interface Bloque {
  eyebrow: string;
  titulo: string;
  cuerpo: string[];
}
export type Bilingue<T> = { es: T; en: T };

export const hero: Bilingue<{
  h1: string;
  entradilla: string;
  pie: string;
  captionCaptura: string;
}> = {
  es: {
    h1: 'Empezar a correr es fácil.\nSeguir corriendo, no.',
    entradilla:
      'Un plan que se recoloca cuando fallas un día y que sube o baja según cómo te hayas sentido. Sin feed, sin kudos, sin nadie mirándote.',
    pie: 'iPhone y Apple Watch · Sin cuenta · Sin servidor',
    captionCaptura: 'Pantalla Hoy: la sesión del día y el plan de la semana',
  },
  en: {
    h1: 'Starting to run is easy.\nCarrying on is not.',
    entradilla:
      'A plan that reschedules when you miss a day, and steps up or down depending on how it felt. No feed, no kudos, nobody watching.',
    pie: 'iPhone and Apple Watch · No account · No server',
    captionCaptura: "Today screen: the day's session and the week's plan",
  },
};

export const dato: Bilingue<{
  cifras: { valor: string; etiqueta: string }[];
  texto: string;
  remate: string;
}> = {
  es: {
    cifras: [
      { valor: '1 de 4', etiqueta: 'termina un plan de iniciación' },
      { valor: '2ª a 5ª', etiqueta: 'la semana en que casi todas lo dejan' },
    ],
    texto:
      'Y casi siempre por lo mismo: una progresión demasiado agresiva, o una lesión.',
    remate: 'Own Lane está construida alrededor de ese problema.',
  },
  en: {
    cifras: [
      { valor: '1 in 4', etiqueta: 'finishes a beginner plan' },
      { valor: '2nd–5th', etiqueta: 'the week most people stop' },
    ],
    texto:
      'Almost always for the same reason: a progression that was too aggressive, or an injury.',
    remate: 'Own Lane is built around that problem.',
  },
};

/** Los ejes de mensaje, con el mismo titular en mayusculas de la ficha. */
export const ejes: Record<string, Bilingue<Bloque>> = {
  sentido: {
    es: {
      eyebrow: 'Lo que la diferencia',
      titulo: 'Te pregunta cómo te has sentido',
      cuerpo: [
        'Ninguna app de registro lo hace. El reloj mide lo que has hecho; esto mide lo que te ha costado.',
        'Si una sesión te sobra, el plan sube antes. Si te machaca, baja un escalón. Progresar más despacio es progresar igual.',
      ],
    },
    en: {
      eyebrow: 'What sets it apart',
      titulo: 'It asks how it felt',
      cuerpo: [
        'No tracking app does. Your watch measures what you did; this measures what it cost you.',
        'If a session feels easy, the plan steps up sooner. If it flattens you, it drops a step. Progressing more slowly is still progressing.',
      ],
    },
  },
  dias: {
    es: {
      eyebrow: 'El plan',
      titulo: 'Tus días, no los que te toquen',
      cuerpo: [
        'Marcas los días que de verdad puedes correr y el plan se monta encima. De andar y correr hasta 5K, 10K, media maratón o maratón.',
        'Si fallas una sesión se recoloca en tu siguiente día, respetando el descanso que necesitas. La última semana baja el volumen para que llegues fresco a tu meta.',
      ],
    },
    en: {
      eyebrow: 'The plan',
      titulo: "Your days, not the ones you're handed",
      cuerpo: [
        'You mark the days you can actually run and the plan is built on top of them. From walk-and-run all the way to 5K, 10K, a half or a full marathon.',
        'Miss a session and it reschedules onto your next day, respecting the rest you need. The final week drops the volume so you arrive fresh at your goal.',
      ],
    },
  },
  salida: {
    es: {
      eyebrow: 'Cada salida',
      titulo: 'Cada salida, explicada',
      cuerpo: [
        'GPS, mapa del recorrido, ritmo, parciales por kilómetro y cadencia.',
        'Y después, en cristiano: si te frenaste al final y cuánto, si eso es normal, y qué hacer la próxima vez.',
      ],
    },
    en: {
      eyebrow: 'Every run',
      titulo: 'Every run, explained',
      cuerpo: [
        'GPS, route map, pace, kilometre splits and cadence.',
        "And then, in plain words: whether you slowed at the end and by how much, whether that's normal, and what to do next time.",
      ],
    },
  },
};

/** Tres tarjetas juntas. */
export const tarjetas: Bilingue<Bloque[]> = {
  es: [
    {
      eyebrow: '',
      titulo: 'Tú contra tú',
      cuerpo: [
        'Los hitos, que es lo que de verdad se recuerda: la primera vez que aguantas diez minutos, el primer 5K, el primer mes entero sin fallar. Nunca hay nadie más en esa pantalla.',
      ],
    },
    {
      eyebrow: '',
      titulo: 'Una imagen que sí quieres enseñar',
      cuerpo: [
        'Saca una tarjeta de tu salida con el mapa y los números. Lleva un interruptor, encendido de fábrica, que esconde dónde empiezas y dónde acabas: compartir una ruta es publicar dónde vives.',
      ],
    },
    {
      eyebrow: '',
      titulo: 'Tus zapatillas, contadas',
      cuerpo: [
        'Apunta el par y la app lleva los kilómetros. Te avisa al pasar de 600, donde casi cualquier media amortigua ya menos. Sin inventarse una caducidad que nadie ha demostrado.',
      ],
    },
  ],
  en: [
    {
      eyebrow: '',
      titulo: 'You against you',
      cuerpo: [
        'The milestones, which are what you actually remember: the first time you last ten minutes, your first 5K, your first full month without missing. There is never anyone else on that screen.',
      ],
    },
    {
      eyebrow: '',
      titulo: 'An image you actually want to show',
      cuerpo: [
        'Make a card of your run with the map and the numbers. It comes with a switch, on by default, that hides where you start and finish: sharing a route is publishing where you live.',
      ],
    },
    {
      eyebrow: '',
      titulo: 'Your shoes, counted',
      cuerpo: [
        'Add the pair you run in and the app counts the kilometres. It warns you when they pass 600, where almost any midsole already cushions less. Without inventing an expiry date nobody has proven.',
      ],
    },
  ],
};

export const privacidad: Bilingue<{
  eyebrow: string;
  titulo: string;
  cuerpo: string[];
  puntos: string[];
  enlace: string;
}> = {
  es: {
    eyebrow: 'Sin red social',
    titulo: 'Nadie está mirando',
    cuerpo: [
      'No hay feed, no hay kudos, no hay seguidores. Nadie ve lo que haces salvo que tú decidas compartir una imagen. Está pensada para quien entrena solo.',
      'La app no tiene servidor. No hay cuenta, no hay analítica y no hay seguimiento: no contiene ni una sola llamada de red. Tus salidas no salen de tu teléfono.',
    ],
    puntos: ['Sin cuenta', 'Sin servidor', 'Sin analítica', 'Ni una llamada de red'],
    enlace: 'Leer la política de privacidad',
  },
  en: {
    eyebrow: 'No social network',
    titulo: 'Nobody is watching',
    cuerpo: [
      'No feed, no kudos, no followers. Nobody sees what you do unless you decide to share an image. It is built for people who train alone.',
      "The app has no server. No account, no analytics and no tracking: it doesn't contain a single network call. Your runs never leave your phone.",
    ],
    puntos: ['No account', 'No server', 'No analytics', 'Not one network call'],
    enlace: 'Read the privacy policy',
  },
};

export const reloj: Bilingue<Bloque> = {
  es: {
    eyebrow: 'Apple Watch',
    titulo: 'También en la muñeca',
    cuerpo: [
      'Empieza, pausa y termina desde el reloj, con aviso por vibración en cada cambio de intervalo.',
      'Y consulta tu plan, tu historial y tu progreso sin sacar el móvil.',
    ],
  },
  en: {
    eyebrow: 'Apple Watch',
    titulo: 'On your wrist too',
    cuerpo: [
      'Start, pause and finish from the watch, with a buzz at every interval change.',
      'And check your plan, your history and your progress without taking your phone out.',
    ],
  },
};

export const precios: Bilingue<{
  eyebrow: string;
  titulo: string;
  gratisTitulo: string;
  gratis: string[];
  plusTitulo: string;
  plus: string[];
  remate: string;
  nota: string;
  enlace: string;
}> = {
  es: {
    eyebrow: 'Gratis, siempre',
    titulo: 'Qué cuesta dinero y qué no',
    gratisTitulo: 'Gratis',
    gratis: [
      'El plan entero hasta tu meta',
      'Elegir qué días corres',
      'Grabar tus salidas con mapa, parciales y cadencia',
      'Los avisos y el historial',
      'Tus hitos y los kilómetros de tus zapatillas',
      'Compartir una salida',
      'Toda la sección Aprende',
    ],
    plusTitulo: 'Own Lane Plus',
    plus: [
      'Fuerza guiada dos veces por semana',
      'Calentamiento y vuelta a la calma',
      'Tus marcas y el informe del mes',
      'Tus rutas comparadas',
      'El día de la carrera',
      'La lectura interpretada de cada salida',
      'Pulsaciones y esfuerzo',
    ],
    remate:
      'Y el plan se seguirá ajustando a cómo te sientas, pagues o no: cobrar por lo que evita que te lesiones no lo vamos a hacer.',
    nota: '49,99 € al año, con 7 días de prueba gratis, o 7,99 € al mes. Cancela cuando quieras.',
    enlace: 'Ver todo lo que trae Plus',
  },
  en: {
    eyebrow: 'Free, always',
    titulo: 'What costs money and what does not',
    gratisTitulo: 'Free',
    gratis: [
      'The whole plan up to your goal',
      'Choosing which days you run',
      'Recording your runs with map, splits and cadence',
      'The reminders and the history',
      'Your milestones and the kilometres on your shoes',
      'Sharing a run',
      'All of Learn',
    ],
    plusTitulo: 'Own Lane Plus',
    plus: [
      'Guided strength twice a week',
      'Guided warm-up and cool-down',
      'Your bests and the monthly report',
      'Your routes compared',
      'Race day',
      'The interpreted read on every run',
      'Heart rate and effort',
    ],
    remate:
      "And the plan will keep adjusting to how you feel, whether you pay or not: charging for what stops you getting injured is something we won't do.",
    nota: '€49.99 a year, with a 7-day free trial, or €7.99 a month. Cancel any time.',
    enlace: 'See everything Plus includes',
  },
};

export const cierre: Bilingue<{ titulo: string; texto: string }> = {
  es: {
    titulo: 'Correr desde cero, sin feed',
    texto: 'Gratis, en el App Store. Sin cuenta y sin que nada salga de tu teléfono.',
  },
  en: {
    titulo: 'Run from zero, without a feed',
    texto: 'Free on the App Store. No account, and nothing leaves your phone.',
  },
};

/** Rotulo de cada seccion de la portada: el numero de carril y su nombre.
 *  El orden de las claves ES el orden de la pagina, y de ahi sale el numero,
 *  asi que mover una seccion en Inicio.astro basta con moverla aqui. */
export const secciones = {
  problema: { es: 'El problema', en: 'The problem' },
  metodo: { es: 'Cómo funciona', en: 'How it works' },
  memoria: { es: 'Tu progreso', en: 'Your progress' },
  privacidad: { es: 'Sin red social', en: 'No social network' },
  aprende: { es: 'Aprende', en: 'Learn' },
  reloj: { es: 'Apple Watch', en: 'Apple Watch' },
  precio: { es: 'Gratis, siempre', en: 'Free, always' },
} as const;

export type Seccion = keyof typeof secciones;

/** 01, 02, 03… en el orden de arriba. */
export const numeroDe = (clave: Seccion): string =>
  String(Object.keys(secciones).indexOf(clave) + 1).padStart(2, '0');
