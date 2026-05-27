'use client';

import { useState, useTransition } from 'react';
import { USER_STATUS } from '@/lib/generated/prisma/enums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateUserStatusAction } from '@/lib/actions/settings/update-user-status-action';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const statusOptions = [
  { value: USER_STATUS.ONLINE, label: 'Online', color: 'bg-green-500 dark:bg-green-800' },
  { value: USER_STATUS.AWAY, label: 'Away', color: 'bg-yellow-500 dark:bg-yellow-800' },
  { value: USER_STATUS.OFFLINE, label: 'Offline', color: 'bg-gray-600 dark:bg-gray-800' },
] as const;

type ToggleAccountStatusProps = {
  currentStatus: USER_STATUS;
};

const ToggleAccountStatus = ({ currentStatus }: ToggleAccountStatusProps) => {
  const [status, setStatus] = useState<USER_STATUS>(currentStatus);
  const [isLoading, startTransition] = useTransition();

  const handleChange = (value: string) => {
    startTransition(async () => {
      const newStatus = value as USER_STATUS;
      setStatus(newStatus);
      const res = await updateUserStatusAction(newStatus);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
    });
  };

  return (
    <Select disabled={isLoading} value={status} onValueChange={handleChange}>
      <SelectTrigger className='w-36 text-sm'>
        {isLoading ? <Spinner className='mx-auto' /> : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map(({ value, label, color }) => (
          <SelectItem key={value} value={value}>
            <span className='flex items-center gap-2'>
              <span className={`size-2 rounded-full shrink-0 ${color}`} />
              {label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ToggleAccountStatus;
