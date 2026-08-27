/** Preguntas de soporte. El original en espanol viene de OwnLane/docs/index.html;
 *  el ingles esta traducido para la web (no existe en el repo de la app). */
export interface Pregunta {
  id: string;
  es: { p: string; r: string[] };
  en: { p: string; r: string[] };
}

export const faq: Pregunta[] = [
  {
    id: 'gratis-o-pago',
    es: {
      p: '¿Qué es gratis y qué es de pago?',
      r: [
        'Gratis: el plan entero hasta tu meta, elegir qué días corres, grabar tus salidas con GPS, mapa, parciales y cadencia, los recordatorios, el historial, el progreso, tus hitos, los kilómetros de tus zapatillas, compartir una salida y toda la sección Aprende.',
        'Own Lane Plus añade la fuerza guiada, el calentamiento y la vuelta a la calma, tus marcas, el informe del mes, tus rutas comparadas, el día de la carrera, la lectura interpretada de cada salida y la gráfica de pulsaciones.',
        'Y el plan se sigue ajustando a cómo te sientas pagues o no: cobrar por lo que evita que te lesiones no lo vamos a hacer.',
      ],
    },
    en: {
      p: "What's free and what's paid?",
      r: [
        'Free: the whole plan up to your goal, choosing which days you run, recording your runs with GPS, map, splits and cadence, the reminders, the history, the progress, your milestones, the kilometres on your shoes, sharing a run and all of Learn.',
        'Own Lane Plus adds guided strength, the warm-up and cool-down, your bests, the monthly report, your routes compared, race day, the interpreted read on every run and the heart rate chart.',
        "And the plan keeps adjusting to how you feel whether you pay or not: charging for what stops you getting injured is something we won't do.",
      ],
    },
  },
  {
    id: 'cancelar',
    es: {
      p: '¿Cómo cancelo la suscripción?',
      r: [
        'Desde el iPhone: Ajustes → tu nombre → Suscripciones → Own Lane. También puedes hacerlo desde la propia app, en Ajustes → Gestionar. La cancelación la gestiona Apple, no nosotros.',
      ],
    },
    en: {
      p: 'How do I cancel my subscription?',
      r: [
        'On your iPhone: Settings → your name → Subscriptions → Own Lane. You can also do it from inside the app, under Settings → Manage. Cancellation is handled by Apple, not by us.',
      ],
    },
  },
  {
    id: 'plan-duro',
    es: {
      p: 'El plan me parece demasiado duro (o demasiado fácil)',
      r: [
        'Responde a «¿cómo te has sentido?» al terminar cada salida. Si varias seguidas te resultan duras, el plan baja un escalón solo. Si te sobran, sube antes de lo previsto. Es la función más importante de la app y no cuesta dinero.',
      ],
    },
    en: {
      p: 'The plan feels too hard (or too easy)',
      r: [
        'Answer "how did it feel?" at the end of every run. If several in a row feel hard, the plan drops a step on its own. If they feel easy, it steps up sooner than planned. It is the most important feature in the app and it costs nothing.',
      ],
    },
  },
  {
    id: 'distancia',
    es: {
      p: 'No me mide bien la distancia',
      r: [
        'Own Lane descarta las lecturas de GPS imprecisas para no inflar los kilómetros. Bajo árboles densos, entre edificios altos o en una cinta, la distancia puede quedarse corta. Dale unos segundos al aire libre antes de empezar.',
      ],
    },
    en: {
      p: 'The distance looks wrong',
      r: [
        'Own Lane discards imprecise GPS readings so it does not inflate your kilometres. Under dense trees, between tall buildings or on a treadmill, the distance can fall short. Give it a few seconds outdoors before you start.',
      ],
    },
  },
  {
    id: 'pulsaciones',
    es: {
      p: 'No veo mis pulsaciones',
      r: [
        'El iPhone no las mide: vienen del Apple Watch. Necesitas llevarlo puesto y haber dado permiso en la app Salud. Sin reloj no hay datos que enseñar, y la app lo dice en vez de inventar una gráfica.',
      ],
    },
    en: {
      p: "I can't see my heart rate",
      r: [
        'The iPhone does not measure it: it comes from the Apple Watch. You need to be wearing it and to have granted permission in the Health app. Without a watch there is no data to show, and the app says so instead of inventing a chart.',
      ],
    },
  },
  {
    id: 'watch',
    es: {
      p: '¿Se puede usar en el Apple Watch?',
      r: [
        'Sí. Puedes empezar, pausar y terminar la sesión desde la muñeca, con aviso por vibración en cada cambio de intervalo, y consultar tu plan, tu historial y tu progreso sin sacar el móvil.',
      ],
    },
    en: {
      p: 'Can I use it on the Apple Watch?',
      r: [
        'Yes. You can start, pause and finish a session from your wrist, with a buzz at every interval change, and check your plan, your history and your progress without taking your phone out.',
      ],
    },
  },
  {
    id: 'datos-perdidos',
    es: {
      p: 'He perdido mis datos',
      r: [
        'Todo se guarda en tu iPhone y en ningún otro sitio. Si borras la app, se borra todo; no hay copia en un servidor porque no hay servidor. Las salidas que Own Lane escribe en la app Salud sí se conservan.',
      ],
    },
    en: {
      p: 'I lost my data',
      r: [
        'Everything is stored on your iPhone and nowhere else. If you delete the app, it all goes; there is no copy on a server because there is no server. The runs Own Lane writes into the Health app do survive.',
      ],
    },
  },
];
