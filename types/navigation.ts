import { USER_ROLE } from '@/lib/generated/prisma/enums';

export type Navigation = {
  title: string;
  href: string;
  roles?: USER_ROLE[];
  device?: 'mobile' | 'desktop' | 'both';
  icon: string;
};
