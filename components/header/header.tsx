import { Button } from '@/components/ui/button';
import MenuNavigation from '@/components/header/desktop-navigation';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants/app';
import MobileNavigation from './mobile-navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { navigationData } from '@/lib/constants/navigation';
import ToggleThemeButton from '../toggle-theme-button';
import ProfileDropdown from '../profile-dropdown';

const Header = async () => {
  const logoStyle = { width: 100, height: 30 };

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session?.user;

  const desktopNavigationData = navigationData.filter((navItem) => {
    const isDesktop = navItem.device === 'desktop' || navItem.device === 'both';
    if (!isDesktop) return false;
    if (!navItem.roles) return true;
    if (isLoggedIn && navItem.roles.includes(session.user.role)) return true;
    if (isLoggedIn && navItem.roles.includes(session.user.role)) return true;
    return false;
  });

  const mobileNavigationData = navigationData.filter((navItem) => {
    const isMobile = navItem.device === 'mobile' || navItem.device === 'both';
    if (!isMobile) return false;
    if (!navItem.roles) return true;
    if (isLoggedIn && navItem.roles.includes(session.user.role)) return true;
    if (isLoggedIn && navItem.roles.includes(session.user.role)) return true;
    return false;
  });

  return (
    <header className='border-b'>
      <div className='container flex items-center justify-between h-16'>
        {/* Logo */}
        <Link href='/'>
          <Image
            src='/company/logo-full.svg'
            alt={`${APP_NAME} Logo`}
            width={100}
            height={30}
            style={logoStyle}
            priority
          />
        </Link>
        {/*  DesktopNavigation */}
        <MenuNavigation
          navigationData={desktopNavigationData}
          className='max-md:hidden'
        />

        <div className='flex items-center md:gap-2.5'>
          {/* Add toggle theme button for testing purposes until i implement profile page */}
          <ToggleThemeButton />

          {isLoggedIn ? (
            <ProfileDropdown user={session.user} />
          ) : (
            //  Sign-in Button
            <Button className='max-md:hidden' asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          )}

          {/* Navigation for small screens */}
          <MobileNavigation
            navigationData={mobileNavigationData}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
