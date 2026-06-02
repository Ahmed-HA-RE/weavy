import { QRCode, QRCodeSkeleton } from '@/components/ui/qr-code';
import { Skeleton } from '@/components/ui/skeleton';

const QrCodeStepSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-6'>
      {/* QR code placeholder */}
      <QRCode value='' size={180}>
        <QRCodeSkeleton />
      </QRCode>
      {/* 6 box skeletons */}
      <div className='flex items-center gap-2'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className='size-14 rounded-md' />
        ))}
      </div>
    </div>
  );
};

export default QrCodeStepSkeleton;
