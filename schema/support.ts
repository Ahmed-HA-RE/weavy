import z from 'zod';
import { authSchema } from './auth';

export const supportSubmitTicketSchema = z.object({
  name: authSchema.shape.userName,
  email: authSchema.shape.email,
  subject: z
    .string({ error: 'Subject is required' })
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be at most 100 characters'),
  description: z
    .string({ error: 'Description is required' })
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description must be at most 500 characters'),
});

export type SupportSubmitTicketFormData = z.infer<
  typeof supportSubmitTicketSchema
>;
