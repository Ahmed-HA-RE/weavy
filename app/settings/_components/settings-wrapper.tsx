const SettingsWrapper = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <h4 className='text-xl font-medium'>{title}</h4>
        {description && (
          <p className='text-muted-foreground text-sm'>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default SettingsWrapper;
