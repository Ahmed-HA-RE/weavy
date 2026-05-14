'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IoEllipsisHorizontal, IoSettings } from 'react-icons/io5';
import Link from 'next/link';
import ShareProfileDialog from './share-profile-dialog';
import BlockUserDialog from './block-user-dialog';
import ReportUserDialog from './report-user-dialog';

type ProfileHeaderDropdownProps = {
  isOwner: boolean;
  user: {
    id: string;
    name: string;
  };
  isUserLoggedIn: boolean;
  loggedInUserId: string | null;
  isReportedByLoggedUser: boolean;
};

const ProfileHeaderDropdown = ({
  isOwner,
  user,
  isUserLoggedIn,
  loggedInUserId,
  isReportedByLoggedUser,
}: ProfileHeaderDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='More options'>
          <IoEllipsisHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-40 py-1.5'>
        {/* Always show "Share Profile" dialog option */}
        <ShareProfileDialog userName={user.name} />
        <DropdownMenuGroup>
          {!isOwner && isUserLoggedIn && loggedInUserId && (
            <>
              <BlockUserDialog user={user} />
              {!isReportedByLoggedUser && (
                <ReportUserDialog
                  reporterId={loggedInUserId}
                  reportedUser={{ id: user.id, name: user.name }}
                />
              )}
            </>
          )}
          {isOwner && (
            <DropdownMenuItem asChild>
              <Link href={`/settings?tab=account`}>
                <IoSettings />
                Settings
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileHeaderDropdown;
