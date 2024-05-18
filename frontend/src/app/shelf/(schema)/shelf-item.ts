import { z } from "zod";

export const ShelfItemSchema = z.object({
  ulid: z.string(),
  name: z.string(),
  category: z.object({
    ulid: z.string(),
    name: z.string(),
  }),
  tags: z.array(
    z.object({
      ulid: z.string(),
      name: z.string(),
    })
  ),
  location: z.object({
    ulid: z.string(),
    name: z.string(),
  }),
  description: z.string().optional(),
  images: z.array(
    z.object({
      baseUri: z.string(),
      token: z.string(),
    })
  ),
});

export type ShelfItem = z.infer<typeof ShelfItemSchema>;
