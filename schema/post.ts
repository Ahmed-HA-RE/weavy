import z from 'zod';

export const postSchema = z
  .object({
    content: z.string().max(500, 'Exceeded 500 characters').trim().optional(),
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

export type CreatePostFormData = z.infer<typeof postSchema>;

export const updatePostSchema = postSchema;

export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
