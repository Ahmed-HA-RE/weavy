import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import SupportHeader from './_components/support-header';
import { Suspense } from 'react';
import SupportFAQ from './_components/support-faq';
import SupportSubmitTicket from './_components/support-submit-ticket';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Support',
  description: `Need help? Find answers to common questions, troubleshoot issues, and get in touch with the ${APP_NAME} support team.`,
};

const SupportPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      {/* Support Header Section */}
      <section className='bg-linear-to-b from-[#5B45C7] to-[#3B7DD8]'>
        <div className='container'>
          <Suspense>
            <SupportHeader />
          </Suspense>
        </div>
      </section>
      {/* Support FAQ Section */}
      <section className='spacing-y'>
        <div className='container'>
          <Suspense>
            <SupportFAQ />
          </Suspense>
        </div>
      </section>
      {/* Submit a Ticket Section */}
      <section className='spacing-y'>
        <div className='container'>
          <SupportSubmitTicket loggedUser={session?.user} />
        </div>
      </section>
    </>
  );
};

export default SupportPage;
