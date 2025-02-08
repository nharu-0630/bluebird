import { z } from "zod";

export const PoUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageURL: z.string(),
  externalURL: z.string(),
  description: z.string(),
  isFollowing: z.boolean(),
  emojis: z.array(z.string()).optional(),
  itemCount: z.number(),
});