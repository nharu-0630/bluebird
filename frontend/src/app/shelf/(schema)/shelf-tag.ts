import { z } from "zod";

export const ShelfTagSchema = z.object({
    ulid: z.string(),
    name: z.string(),
})

export type ShelfTag = z.infer<typeof ShelfTagSchema>