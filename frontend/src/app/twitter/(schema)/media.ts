import { z } from "zod";

export const TwMediaSchema = z.object({
    id: z.string().nullable(),
    mediaKey: z.string().nullable(),
    expandedURL: z.string().nullable(),
    type: z.string().nullable(),
    thumbURL: z.string().nullable(),
    videoURL: z.string().nullable(),
});