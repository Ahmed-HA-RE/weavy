const AuthWrapper = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className='w-full max-w-sm space-y-6 max-lg:pt-14'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {subtitle && (
          <p className='text-sm text-muted-foreground'>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
