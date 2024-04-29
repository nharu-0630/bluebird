import { z } from "zod";

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
    description: z.string().optional(),
})

export type ShelfItem = z.infer<typeof shelfItemSchema>