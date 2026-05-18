'use client';

import { footerNavigationData } from '@/lib/constants/navigation';
import Link from 'next/link';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { useTheme } from '@teispace/next-themes';

const Footer = () => {
  const logoStyles = { width: '150px', height: '50px' };

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <footer className='bg-muted py-8 md:py-12 lg:py-16 mt-6'>
      <nav className='container !max-w-3xl flex flex-col'>
        <ul className='flex flex-col lg:flex-row items-center justify-between gap-6'>
          {footerNavigationData.map((item, index) => (
            <li className='flex items-center gap-6 h-4' key={item.title}>
              <Link
                href={item.href}
                className='text-muted-foreground underline underline-offset-1 hover:no-underline hover:text-foreground text-center'
              >
                {item.title}
              </Link>
              {footerNavigationData.length - 1 !== index && (
                <Separator
                  orientation='vertical'
                  className='hidden lg:block bg-muted-foreground h-4'
                />
              )}
            </li>
          ))}
        </ul>
        <span className='inline-flex items-center justify-center gap-1 my-10'>
          <span className='leading-none mt-[1px]'>·</span>
          <Separator className='bg-muted-foreground' />
          <span className='leading-none mt-[1px]'>·</span>
        </span>
        {/* Logo */}
        <div className='flex flex-col items-center justify-center gap-6'>
          <Image
            src={`/company/logo-${isDarkMode ? 'full-white' : 'full'}.svg`}
            alt='Company Logo'
            width={150}
            height={50}
            style={logoStyles}
          />
          <span className='text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} Weavy. All rights reserved.
          </span>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
