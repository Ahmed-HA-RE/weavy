import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { APP_NAME } from '@/lib/constants/app';

export const metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `%s - ${APP_NAME}`,
  },
};

const AuthLayout = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className='grid lg:grid-cols-2 h-dvh overflow-hidden'>
      {/* Left Column */}
      <Image
        src='/svg/auth.svg'
        alt='Authentication Background'
        width={0}
        height={0}
        sizes='100vw'
        priority
        className='w-full h-full object-cover brightness-95'
      />
      {/* Right Column */}
      <div className='flex flex-col gap-8 pt-32 pb-40 px-[124px] relative'>
        <Button variant='ghost' asChild className='group absolute top-6 left-6'>
          <Link href='/'>
            <MdKeyboardArrowLeft className='group-hover:-translate-x-1 transition-transform duration-300' />
            Back Home
          </Link>
        </Button>
        <div>
          <h1 className='font-medium text-[32px]'>{title}</h1>
          {subtitle && (
            <p className='text-base font-light'>
              Already have an account?{' '}
              <span className='underline'>{subtitle}</span>
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
