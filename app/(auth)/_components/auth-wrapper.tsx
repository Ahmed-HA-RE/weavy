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
    <>
      <div className='text-center space-y-2 mb-4'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {subtitle && (
          <p className='text-sm text-muted-foreground'>{subtitle}</p>
        )}
      </div>
      {children}
    </>
  );
};

export default AuthWrapper;
