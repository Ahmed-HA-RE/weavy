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
    href: '/profile/:username',
    roles: [USER_ROLE.USER, USER_ROLE.ADMIN],
    device: 'mobile',
    icon: 'profile',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
    roles: [USER_ROLE.USER],
    device: 'mobile',
  },
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    roles: [USER_ROLE.ADMIN],
    device: 'mobile',
    icon: 'dashboard',
  },
];

export const profileMenuNavigationData = [
  {
    title: 'Profile',
    href: '/profile/:username',
    icon: 'profile',
    roles: [USER_ROLE.USER, USER_ROLE.ADMIN],
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
