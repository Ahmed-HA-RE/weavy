import { Navigation } from '@/types/navigation';
import { USER_ROLE } from '../generated/prisma/enums';

export const navigationData: Navigation[] = [
  { title: 'Home', href: '/', device: 'both', icon: 'home' },
  {
    title: 'Notifications',
    href: '/notifications',
    roles: [USER_ROLE.USER, USER_ROLE.ADMIN],
    device: 'both',
    icon: 'notifications',
  },
  {
    title: 'Profile',
    href: '/profile',
    roles: [USER_ROLE.USER],
    device: 'mobile',
    icon: 'profile',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    roles: [USER_ROLE.ADMIN],
    device: 'mobile',
    icon: 'dashboard',
  },
];

export const profileMenuNavigationData = [
  {
    title: 'My Profile',
    href: '/profile',
    icon: 'profile',
    roles: [USER_ROLE.USER],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
    roles: [USER_ROLE.USER],
  },
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: 'dashboard',
    roles: [USER_ROLE.ADMIN],
  },
];
