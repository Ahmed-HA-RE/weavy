const AuthWrapper = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col gap-6 w-full max-w-sm'>
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
