import { z } from "zod";
import { PoUserSchema } from "./user";

export const PoIllustSchema = z.object({
  id: z.string(),
  category: z.string(),
  description: z.string(),
  imageURLs: z.array(z.string()).optional(),
  user: PoUserSchema.optional(),
});