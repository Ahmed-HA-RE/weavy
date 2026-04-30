'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-12 px-8 py-8 sm:py-16 lg:justify-between lg:py-24'>
      <Image
        src='/error-illustration.svg'
        alt='Error Illustration'
        width={0}
        height={0}
        priority
        sizes='100vw'
        className='h-[clamp(300px,50vh,600px)] w-full'
      />

      <div className='text-center'>
        <h4 className='mb-1.5 text-2xl font-semibold'>Page Not Found ⚠️</h4>
        <p className='mb-5'>
          We couldn&apos;t find the page you are looking for{' '}
        </p>
        <Button size='lg' className='rounded-lg text-base' asChild>
          <Link href='/'>Back to home page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
