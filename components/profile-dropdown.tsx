'use client';

import { auth } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarBadge, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { Suspense } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RiShieldUserLine } from 'react-icons/ri';
import { profileMenuNavigationData } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils';

const UserAvatar = ({ user }: { user: typeof auth.$Infer.Session.user }) => {
  return (
    <Avatar className='relative'>
      <Suspense
        fallback={
          <AvatarFallback className='uppercase'>
            {user.name.slice(0, 2)}
          </AvatarFallback>
        }
      ></Suspense>
      <Image
        alt={`${user.name}'s profile picture`}
        src={user.image!}
        width={32}
        height={32}
        className='rounded-full object-cover'
      />
      <AvatarBadge
        className={cn(
          user.status === 'ONLINE'
            ? 'bg-green-600 dark:bg-green-800'
            : user.status === 'OFFLINE'
              ? 'bg-gray-600 dark:bg-gray-800'
              : 'bg-yellow-600 dark:bg-yellow-800',
        )}
      />
    </Avatar>
  );
};

const ProfileDropdown = ({
  user,
}: {
  user: typeof auth.$Infer.Session.user;
}) => {
  const Icons = {
    profile: FiUser,
    settings: IoSettingsOutline,
    dashboard: RiShieldUserLine,
  };

  const router = useRouter();

  const handleLogout = async () => {
    try {
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
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full max-md:hidden'>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-60 pb-1.5 space-y-1.5'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex items-center gap-3'>
            <UserAvatar user={user} />
            <div className='flex flex-col space-y-1'>
              <p className='font-medium text-sm leading-none text-foreground'>
                {user.name}
              </p>
              <p className='text-muted-foreground text-xs leading-none truncate max-w-[180px]'>
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuNavigationData
          .filter((item) => item.roles.some((role) => user.role === role))
          .map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            return (
              <DropdownMenuItem
                key={index}
                onClick={() => router.push(item.href)}
              >
                <Icon />
                {item.title}
              </DropdownMenuItem>
            );
          })}

        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive' onClick={handleLogout}>
          <LuLogOut className='size-4.5' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
