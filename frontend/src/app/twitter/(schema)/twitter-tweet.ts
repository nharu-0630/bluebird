import { z } from "zod";
import { TwitterMediaSchema } from "./twitter-media";
import { TwitterUserSchema } from "./twitter-user";

export const TwitterTweetSchema = z.object({
  id: z.string().nullable(),
  user: TwitterUserSchema.nullable(),
  fullText: z.string().nullable(),
  media: z.array(TwitterMediaSchema).nullable(),
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