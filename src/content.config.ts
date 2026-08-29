import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Los articulos de Aprende, extraidos del repo de la app con
 *  scripts/extract-learn.py. */
const aprende = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/aprende' }),
  schema: z.object({
    title: z.string(),
    teaser: z.string(),
    category: z.enum(['technique', 'breathing', 'gear', 'injuries', 'training']),
    minutes: z.number().int().positive(),
    evidence: z.enum(['solid', 'reasonable', 'myth']),
    lang: z.enum(['es', 'en']),
    /** El orden en que Aprende los presenta dentro de la app. Es pedagogico
     *  —«ve mas despacio» antes que «rodilla de corredor»— y por eso manda
     *  sobre el alfabetico, que no significa nada. */
    order: z.number().int().nonnegative(),
    /** Une la version espanola con la inglesa: lo usan el selector de idioma
     *  y los hreflang por articulo. */
    translationKey: z.string(),
    slug: z.string(),
    updated: z.coerce.date(),
    /** min(1) a proposito: la promesa editorial de la app es que todo lo que
     *  se afirma sale de una fuente citada. Aqui eso deja de ser una promesa y
     *  pasa a ser una condicion del build. */
    sources: z
      .array(
        z.object({
          authors: z.string(),
          title: z.string(),
          publication: z.string(),
          year: z.number().int(),
          url: z.string().url(),
        })
      )
      .min(1),
  }),
});

export const collections = { aprende };
