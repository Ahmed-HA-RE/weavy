import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import NotificationsList from './_components/notifications-list';

export const metadata: Metadata = {
  title: 'Notifications',
  description:
    'Stay updated with your latest social interactions and activities.',
};

const NotificationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  return (
    <section className='spacing-top'>
      <div className='container !max-w-2xl flex flex-col'>
        <h1 className='text-2xl md:text-3xl font-semibold pb-[30px]'>
          Notifications
        </h1>
        <Suspense fallback={<p>Loading notifications...</p>}>
          <NotificationsList loggedUserId={session.user.id} />
        </Suspense>
      </div>
    </section>
  );
};

export default NotificationsPage;
