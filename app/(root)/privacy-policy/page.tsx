import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import PrivacyPolicyMDX from './_components/index.mdx';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Learn how ${APP_NAME} collects, uses, and protects your personal data. Read our full privacy policy.`,
};

const PrivacyPolicyPage = () => {
  return (
    <article className='prose dark:prose-invert py-8 md:py-16 lg:py-24 prose-lg container'>
      <PrivacyPolicyMDX />
    </article>
  );
};

export default PrivacyPolicyPage;
