'use client';

import { UploadButton } from '@/lib/uploadthing';
import { cn, formatUploadThingError } from '@/lib/utils';
import { Endpoints } from '@/types/endpoints';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';
import { updateUserAvatarAction } from '@/lib/actions/settings/update-user-avatar-action';
import { useRouter } from 'next/navigation';

type UploadAvatarButtonProps = {
  endpoint: Endpoints;
  className?: string;
};

const UploadAvatarButton = ({ endpoint, className }: UploadAvatarButtonProps) => {
  const router = useRouter();
  return (
    <UploadButton
      className={cn(
        className,
        'ut-button:ut-uploading:opacity-50 ut-button:ut-uploading:pointer-events-none ut-uploading:pointer-events-none',
      )}
      endpoint={endpoint}
      onClientUploadComplete={async (res) => {
        await updateUserAvatarAction({ url: res[0].ufsUrl, key: res[0].key });
        router.refresh();
        toast.success('Avatar updated successfully');
      }}
      onUploadError={(error: Error) => {
        console.error('Upload error:', error);
        toast.error(formatUploadThingError(error.message));
      }}
      content={{
        button: ({ ready, isUploading }) => {
          if (ready) return 'Upload new avatar';
          if (isUploading) return <Spinner />;
          return 'Preparing...';
        },
      }}
    />
  );
};

export default UploadAvatarButton;
