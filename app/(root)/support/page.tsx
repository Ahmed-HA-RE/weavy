import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import SupportHeader from './_components/support-header';
import { Suspense } from 'react';
import SupportFAQ from './_components/support-faq';

export const metadata: Metadata = {
  title: 'Support',
  description: `Need help? Find answers to common questions, troubleshoot issues, and get in touch with the ${APP_NAME} support team.`,
};

const SupportPage = () => {
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
          <SupportFAQ />
        </div>
      </section>
    </>
  );
};

export default SupportPage;
