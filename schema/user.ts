import z from 'zod';
import { reportPostSchema, reportReason } from './post';

export const reportUserSchema = z.object({
  reason: reportReason,
  reporterId: reportPostSchema.shape.reporterId,
  reportedId: z.string({ error: 'Invalid reported user ID' }),
  message: reportPostSchema.shape.message,
  blockUser: reportPostSchema.shape.blockUser,
});

export type ReportUserFormData = z.input<typeof reportUserSchema>;
