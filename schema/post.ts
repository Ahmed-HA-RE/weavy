import z from 'zod';

export const postSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(500, 'Exceeded 500 characters'),
  image: z.url('Image must be a valid URL').optional().nullable(),
});

export const updatePostSchema = postSchema.partial();

export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
