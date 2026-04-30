'use client';
import { Navigation } from '@/types/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Divide as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants/app';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FiHome, FiUser } from 'react-icons/fi';
import { RiShieldUserLine } from 'react-icons/ri';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuLogOut, LuLogIn } from 'react-icons/lu';
import { Separator } from '../ui/separator';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const MobileNavigation = ({
  navigationData,
  isLoggedIn,
}: {
  navigationData: Navigation[];
  isLoggedIn: boolean;
}) => {
  const logoStyle = { width: 100, height: 20 };

  const listItemClasses =
    'flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer';
  const router = useRouter();

  const [openSheet, setOpenSheet] = useState(false);
  const pathname = usePathname();

  const Icons = {
    home: FiHome,
    profile: FiUser,
    notifications: IoNotificationsOutline,
    dashboard: RiShieldUserLine,
  };

  const handleLogout = async () => {
    try {
      setOpenSheet(false);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
            toast.success('Logged out successfully');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || 'Failed to log out');
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger className='md:hidden'>
        <Hamburger
          size={24}
          duration={0.5}
          toggled={openSheet}
          toggle={setOpenSheet}
        />
      </SheetTrigger>
      <SheetContent side='left' className='w-75 p-0'>
        <SheetHeader className='px-4 pt-7 pb-10'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link
            href='/'
            className='self-start'
            onClick={() => setOpenSheet(false)}
          >
            <Image
              src='/company/logo-full.svg'
              alt={`${APP_NAME} Logo`}
              width={100}
              height={20}
              style={logoStyle}
            />
          </Link>
        </SheetHeader>
        <ul className='flex flex-col px-2'>
          {navigationData.map((navItem) => {
            const Icon = Icons[navItem.icon as keyof typeof Icons];
            const isActive = pathname === navItem.href;
            return (
              <li
                key={navItem.title}
                className={cn(
                  listItemClasses,
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
                onClick={() => {
                  setOpenSheet(false);
                  router.push(navItem.href);
                }}
              >
                <Icon className='size-4.5' />
                {navItem.title}
              </li>
            );
          })}
          <Separator className='my-2' />
          {/* Logout Button */}
          {isLoggedIn ? (
            <li
              className={cn(
                listItemClasses,
                'text-destructive hover:bg-destructive/10',
              )}
              onClick={handleLogout}
            >
              <LuLogOut className='size-4.5' />
              Logout
            </li>
          ) : (
            <li
              className={cn(
                listItemClasses,
                'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
              onClick={() => {
                setOpenSheet(false);
                router.push('/sign-in');
              }}
            >
              <LuLogIn className='size-4.5' />
              Sign In
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
