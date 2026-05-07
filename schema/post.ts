import z from 'zod';
import { REPORT_REASON } from '@/lib/generated/prisma/enums';

export const postSchema = z
  .object({
    content: z
      .string()
      .max(500, 'Exceeded 500 characters')
      .trim()
      .optional()
      .nullable(),
    image: z.url('Image must be a valid URL').optional().nullable(),
    imageKey: z.string().optional().nullable(),
  })
  .refine(
    ({ content, image }) => {
      if (!content?.trim() && !image) {
        return false;
      }
      return true;
    },
    {
      message: 'Content or image is required',
    },
  );

export type PostFormData = z.infer<typeof postSchema>;

export const reportPostSchema = z.object({
  reason: z.enum(
    REPORT_REASON,
    'Please select a valid reason for reporting this post',
  ),
  reporterId: z.string({ error: 'Invalid reporter ID' }),
  blockUser: z.boolean().default(false),
  postId: z.uuid({ error: 'Invalid post ID' }),
  message: z
    .string()
    .max(500, 'Exceeded 500 characters')
    .trim()
    .optional()
    .nullable(),
});
export type ReportPostFormData = z.input<typeof reportPostSchema>;
