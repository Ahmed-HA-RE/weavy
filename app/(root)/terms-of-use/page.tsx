import { APP_NAME } from '@/lib/constants/app';
import { Metadata } from 'next';
import TermsOfUseMDX from './_components/index.mdx';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Read ${APP_NAME}'s terms of service to understand your rights and responsibilities when using our platform.`,
};

const TermsOfUsePage = () => {
  return (
    <article className='prose dark:prose-invert py-8 md:py-16 lg:py-24 prose-lg container'>
      <TermsOfUseMDX />
    </article>
  );
};

export default TermsOfUsePage;
