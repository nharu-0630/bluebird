import { z } from "zod";

export const ShelfCategorySchema = z.object({
    ulid: z.string(),
    name: z.string(),
})

export type ShelfCategory = z.infer<typeof ShelfCategorySchema>