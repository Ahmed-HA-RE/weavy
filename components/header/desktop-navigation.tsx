'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Navigation } from '@/types/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type DesktopNavigationProps = {
  navigationData: Navigation[];
  className?: string;
};

const DesktopNavigation = ({
  navigationData,
  className,
}: DesktopNavigationProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className={cn(className)}>
      <NavigationMenuList className='flex-wrap justify-start gap-0'>
        {navigationData.map((navItem) => (
          <NavigationMenuItem
            key={navItem.title}
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              navItem.href === pathname && 'font-bold hover:bg-transparent',
            )}
          >
            <Link href={navItem.href}>{navItem.title}</Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
