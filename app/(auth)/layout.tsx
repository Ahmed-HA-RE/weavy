import Image from 'next/image';
import { APP_NAME } from '@/lib/constants/app';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export const metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `%s - ${APP_NAME}`,
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid lg:grid-cols-2 h-screen'>
      {/* Left Column */}
      <div className='relative hidden lg:block'>
        <Image
          src='/svg/auth.svg'
          alt='Authentication Background'
          fill
          priority
          className='object-cover brightness-95'
        />
      </div>
      {/* Right Column */}
      <div className='flex flex-col gap-8 pt-30 pb-40 px-6 md:px-16 xl:px-[124px] relative'>
        <Button variant='ghost' asChild className='group absolute top-4 left-4'>
          <Link href='/'>
            <MdKeyboardArrowLeft className='group-hover:-translate-x-1 transition-transform duration-300' />
            Back Home
          </Link>
        </Button>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
