import { z } from "zod";

export const ShelfLocationSchema = z.object({
    ulid: z.string(),
    name: z.string(),
})

export type ShelfLocation = z.infer<typeof ShelfLocationSchema>