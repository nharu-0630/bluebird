import { z } from "zod";
import { TwMediaSchema } from "./media";
import { TwUserSchema } from "./user";

export const TwTweetSchema = z.object({
  id: z.string().nullable(),
  user: TwUserSchema.nullable(),
  fullText: z.string().nullable(),
  media: z.array(TwMediaSchema).nullable(),
  createdAt: z.string().nullable(),
  replyCount: z.number().nullable(),
  retweetCount: z.number().nullable(),
  quoteCount: z.number().nullable(),
  retweeted: z.boolean().nullable(),
  favoriteCount: z.number().nullable(),
  favorited: z.boolean().nullable(),
  bookmarkCount: z.number().nullable(),
  bookmarked: z.boolean().nullable(),
  lang: z.string().nullable(),
});