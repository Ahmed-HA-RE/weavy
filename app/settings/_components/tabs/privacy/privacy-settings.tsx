import db from '@/lib/db';
import { redirect } from 'next/navigation';
import ToggleAccountStatus from '../../toggle-account-status';
import { Separator } from '@/components/ui/separator';
import BlockedUsersList from './blocked-users-list';
import SettingsWrapper from '../../settings-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchBlockedUsersAction } from '@/lib/actions/settings/fetch-blocked-users-action';

const PrivacySettings = async ({ loggedUserId }: { loggedUserId: string }) => {
  const user = await db.user.findUnique({
    where: { id: loggedUserId },
    select: {
      status: true,
    },
  });

  if (!user) return redirect('/sign-in');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['blocked-users', { debouncedSearch: '', offset: 1 }],
    queryFn: () => fetchBlockedUsersAction({}),
  });

  return (
    <div className='flex flex-col gap-6'>
      {/* Account Status */}
      <SettingsWrapper
        title='Account Status'
        description='Control your visibility and how others see you online.'
      >
        <div className='flex items-center justify-between'>
          <span className='font-medium'>Current Status:</span>
          <ToggleAccountStatus currentStatus={user.status} />
        </div>
      </SettingsWrapper>

      <Separator className='my-1' />

      {/* Blocked Users */}
      <SettingsWrapper
        title='Blocked Users'
        description='Manage the users you have blocked. They cannot see your profile or interact with you.'
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BlockedUsersList />
        </HydrationBoundary>
      </SettingsWrapper>
    </div>
  );
};

export default PrivacySettings;
