import { defineCollection, z, type CollectionEntry } from 'astro:content'

export type WorkEntry = CollectionEntry<'work'>

export const collections = {
  work: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      lang: z.enum(['fr', 'en']),
    }),
  }),
}
