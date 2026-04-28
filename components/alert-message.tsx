import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { LuCircleAlert, LuTriangleAlert, LuCircleCheck } from 'react-icons/lu';

type AlertMessageProps = {
  className?: string;
  title: string;
  description?: string;
  type?: 'error' | 'success' | 'info' | 'warning' | 'default';
};

const iconsClassName = 'size-4';

const AlertMessage = ({
  className,
  title,
  description,
  type = 'default',
}: AlertMessageProps) => {
  return (
    <Alert variant={type} className={cn('rounded-none p-3.5', className)}>
      {type === 'error' || type === 'info' ? (
        <LuCircleAlert className={iconsClassName} />
      ) : type === 'success' ? (
        <LuCircleCheck className={iconsClassName} />
      ) : type === 'warning' ? (
        <LuTriangleAlert className={iconsClassName} />
      ) : null}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default AlertMessage;
