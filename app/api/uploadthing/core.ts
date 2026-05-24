import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
  postImage: f({
    'image/avif': { maxFileCount: 1, maxFileSize: '4MB' },
    'image/jpeg': { maxFileCount: 1, maxFileSize: '4MB' },
    'image/png': { maxFileCount: 1, maxFileSize: '4MB' },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on server before upload
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user;

      if (!user) throw new UploadThingError('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),
  avatar: f({
    'image/avif': { maxFileCount: 1, maxFileSize: '1MB' },
    'image/jpeg': { maxFileCount: 1, maxFileSize: '1MB' },
    'image/png': { maxFileCount: 1, maxFileSize: '1MB' },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on server before upload
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user;

      if (!user) throw new UploadThingError('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
