'use client';

import { Endpoints } from '@/types/endpoints';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';

type DropzoneProps = {
  onChange: ({ url, key }: { url: string; key: string }) => void;
  endpoint: Endpoints;
};

const Dropzone = ({ onChange, endpoint }: DropzoneProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange({ url: res[0].ufsUrl, key: res[0].key });
        toast.success('Image uploaded successfully');
      }}
      onUploadError={(error: Error) => {
        console.log(`ERROR! ${error.message}`);
      }}
      className='border-0 !px-0 !py-4 ut-button:bg-primary ut-button:h-10 ut-button:rounded-md ut-button:text-sm ut-button:font-medium ut-button:w-30 ut-label:font-medium ut-label:w-full ut-label:text-foreground ut-allowed-content:text-muted-foreground ut-allowed-content:hidden ut-button:ut-uploading:opacity-50 ut-button:ut-uploading:pointer-events-none ut-uploading:pointer-events-none'
      content={{
        label: () => {
          return 'Click or drag and drop to upload an image';
        },
        button: ({ isUploading }) => {
          if (isUploading) {
            return <Spinner />;
          }

          return 'Upload Image';
        },
      }}
    />
  );
};

export default Dropzone;
