import { z } from "zod"

export const shelfItemSchema = z.object({
    ulid: z.string(),
    name: z.string(),
    category: z.object({
        ulid: z.string(),
        name: z.string(),
    }),
    tags: z.array(z.object({
        ulid: z.string(),
        name: z.string(),
    })),
    location: z.object({
        ulid: z.string(),
        name: z.string(),
    }),
})

export type ShelfItem = z.infer<typeof shelfItemSchema>