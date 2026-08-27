/** Las nueve funciones de Own Lane Plus.
 *  Copia literal de OwnLane/Features/Paywall/Plus.swift (title y detail);
 *  el ingles sale de OwnLane/Localizable.xcstrings, no esta traducido aqui.
 *
 *  La regla que rige la raya, escrita en ese mismo fichero:
 *  "el numero es tuyo, lo que significa es Plus". */
export interface Funcion {
  id: string;
  icono: string;
  es: { titulo: string; detalle: string };
  en: { titulo: string; detalle: string };
}

export const funciones: Funcion[] = [
  {
    id: 'strength',
    icono: 'fuerza',
    es: {
      titulo: 'Fuerza guiada, dos veces por semana',
      detalle: 'Menos de veinte minutos, sin material, con temporizador y descansos contados. Es lo que más baja el riesgo de lesión: casi a la mitad.',
    },
    en: {
      titulo: 'Guided strength, twice a week',
      detalle: "Under twenty minutes, no equipment, with a timer and counted rests. It's what lowers injury risk most: by almost half.",
    },
  },
  {
    id: 'mobility',
    icono: 'movilidad',
    es: {
      titulo: 'Calentar y volver a la calma',
      detalle: 'Cinco minutos guiados antes y cinco después, cronometrados. Movimiento antes de correr y estiramiento después, que es el orden que funciona y no el que hace todo el mundo.',
    },
    en: {
      titulo: 'Warm up and cool down',
      detalle: 'Five guided minutes before and five after, timed. Movement before running and stretching after, which is the order that works and not the one everyone uses.',
    },
  },
  {
    id: 'raceDay',
    icono: 'carrera',
    es: {
      titulo: 'El día de la carrera',
      detalle: 'Tu ritmo kilómetro a kilómetro sacado de lo que ya has corrido, qué comer, cuánto beber y qué hacer si va mal.',
    },
    en: {
      titulo: 'Race day',
      detalle: "Your pace kilometre by kilometre drawn from what you've already run, what to eat, how much to drink and what to do if it goes wrong.",
    },
  },
  {
    id: 'reading',
    icono: 'lectura',
    es: {
      titulo: 'La lectura de cada salida',
      detalle: 'Qué significa que te frenaras al final y qué hacer la próxima vez. No los números: lo que dicen.',
    },
    en: {
      titulo: 'The read on every run',
      detalle: 'What it means that you slowed at the end and what to do next time. Not the numbers: what they say.',
    },
  },
  {
    id: 'report',
    icono: 'informe',
    es: {
      titulo: 'El informe del mes',
      detalle: 'Cada mes, si estás mejorando de verdad: cuánto avanzas por cada latido. El ritmo sube con un buen día; esto no.',
    },
    en: {
      titulo: 'The monthly report',
      detalle: "Every month, whether you're really improving: how far you go per heartbeat. Pace rises with a good day; this doesn't.",
    },
  },
  {
    id: 'routes',
    icono: 'rutas',
    es: {
      titulo: 'Tus rutas, comparadas',
      detalle: 'Cuando repites un recorrido, la app lo reconoce sola y te dice qué tal ha ido comparado con las otras veces que lo hiciste.',
    },
    en: {
      titulo: 'Your routes, compared',
      detalle: 'When you repeat a route, the app recognises it on its own and tells you how it went compared with the other times you did it.',
    },
  },
  {
    id: 'records',
    icono: 'marcas',
    es: {
      titulo: 'Tus marcas',
      detalle: 'Tu mejor kilómetro, tu mejor 5K y tu mejor 10K, tu salida más larga y tus semanas seguidas sin fallar. Contra nadie más que contra ti.',
    },
    en: {
      titulo: 'Your bests',
      detalle: 'Your best kilometre, your best 5K and your best 10K, your longest run and your streak of weeks without missing. Against nobody but yourself.',
    },
  },
  {
    id: 'heartRate',
    icono: 'pulso',
    es: {
      titulo: 'Pulsaciones y esfuerzo',
      detalle: 'La gráfica del pulso de la salida y si el esfuerzo que sentiste cuadra con él.',
    },
    en: {
      titulo: 'Heart rate and effort',
      detalle: 'The heart rate graph for the run and whether the effort you felt matches it.',
    },
  },
  {
    id: 'nextGoal',
    icono: 'meta',
    es: {
      titulo: 'La siguiente meta',
      detalle: 'Tu primer plan entero es gratis. Cuando lo termines y quieras otra meta, ahí entra Plus.',
    },
    en: {
      titulo: 'Your next goal',
      detalle: "Your first full plan is free. When you finish it and want another goal, that's where Plus comes in.",
    },
  },
];

export const paginaPlus = {
  es: {
    eyebrow: 'Own Lane Plus',
    titulo: 'Lo que cuesta dinero',
    entradilla:
      'El plan entero, grabar tus salidas y que el plan se ajuste a cómo te sientas son gratis y lo seguirán siendo. Plus es lo que va por encima.',
    regla: 'El número es tuyo. Lo que significa, es Plus.',
    reglaDetalle:
      'Por eso la cadencia se ve siempre y su lectura no, y por eso las marcas —que son comparación, no medición— sí se cobran. Y por eso el reajuste del plan según cómo te sientas no se cobra nunca: cobrar por lo que evita que te lesiones no lo vamos a hacer.',
    precioTitulo: 'Precio',
    anual: 'al año',
    mensual: 'al mes',
    prueba: 'Una semana de prueba. Cancela cuando quieras, desde Ajustes del iPhone.',
    ahorro: 'Sale a 4,08 € al mes',
    gestion: '¿Cómo se cancela?',
  },
  en: {
    eyebrow: 'Own Lane Plus',
    titulo: 'What costs money',
    entradilla:
      'The whole plan, recording your runs and having the plan adjust to how you feel are free and will stay free. Plus is what sits on top.',
    regla: 'The number is yours. What it means is Plus.',
    reglaDetalle:
      "That's why your cadence is always visible and the read on it is not, and why your bests — which are comparison, not measurement — are paid. And why the plan adjusting to how you feel is never paid: charging for what stops you getting injured is something we won't do.",
    precioTitulo: 'Price',
    anual: 'a year',
    mensual: 'a month',
    prueba: 'One-week trial. Cancel any time from your iPhone Settings.',
    ahorro: 'Works out at €4.08 a month',
    gestion: 'How do I cancel?',
  },
} as const;
