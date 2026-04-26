import Link from 'next/link';

const AuthWrapper = ({
  title,
  subtitle,
  link,
  children,
}: {
  title: string;
  subtitle?: string;
  link?: {
    href: string;
    text: string;
  };
  children: React.ReactNode;
}) => {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='font-medium text-[32px]'>{title}</h1>
        {subtitle && (
          <span className='text-base font-light'>
            {subtitle}{' '}
            {link && (
              <Link href={link.href} className='underline font-normal'>
                {link.text}
              </Link>
            )}{' '}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
