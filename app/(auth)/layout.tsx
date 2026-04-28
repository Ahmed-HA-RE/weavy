import { APP_NAME } from '@/lib/constants/app';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Image from 'next/image';

export const metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `%s - ${APP_NAME}`,
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 xl:grid-cols-2'>
      {/* Left Column */}
      <div className='hidden xl:block relative bg-[url("/authentication.jpg")] bg-cover bg-center'>
        <div className='absolute inset-0 bg-black/55 z-10' />
        <Image
          src='/company/icon-logo.svg'
          alt={`${APP_NAME} Logo`}
          width={40}
          height={40}
          loading='eager'
          className='absolute top-10 left-10 z-20'
        />
        <div className='absolute inset-0 flex items-end p-20 z-20'>
          <h2 className='text-6xl max-w-xs italic text-white font-extralight leading-tight'>
            Join the global feed without the clutter.
          </h2>
        </div>
      </div>
      {/* Right Column */}
      <div className='relative flex flex-col items-center justify-center w-full p-6'>
        <Button variant='ghost' asChild className='group absolute top-4 left-4'>
          <Link href='/'>
            <MdKeyboardArrowLeft className='group-hover:-translate-x-1 transition-transform duration-300' />
            Home
          </Link>
        </Button>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
