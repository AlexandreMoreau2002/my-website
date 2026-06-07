import { glob } from 'astro/loaders'
import { defineCollection, z, type CollectionEntry } from 'astro:content'

export type WorkEntry = CollectionEntry<'work'>

export const collections = {
  work: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      project_url: z.string().url().optional(),
      lang: z.enum(['fr', 'en']),
    }),
  }),
}
