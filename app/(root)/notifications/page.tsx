import { Metadata } from 'next';
import { Suspense } from 'react';
import FetchNotificationsWrapper from './_components/fetch-notifications-wrapper';

export const metadata: Metadata = {
  title: 'Notifications',
  description:
    'Stay updated with your latest social interactions and activities.',
};

const NotificationsPage = async () => {
  return (
    <section className='spacing-top'>
      <div className='container !max-w-2xl flex flex-col'>
        <h1 className='text-2xl md:text-3xl font-semibold pb-[30px]'>
          Notifications
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <FetchNotificationsWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default NotificationsPage;
