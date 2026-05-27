'use client';

import { useState } from 'react';
import { USER_STATUS } from '@/lib/generated/prisma/enums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusOptions = [
  { value: USER_STATUS.ONLINE, label: 'Online', color: 'bg-green-500' },
  { value: USER_STATUS.AWAY, label: 'Away', color: 'bg-yellow-500' },
  { value: USER_STATUS.OFFLINE, label: 'Offline', color: 'bg-red-500' },
] as const;

type ToggleAccountStatusProps = {
  currentStatus: USER_STATUS;
};

const ToggleAccountStatus = ({ currentStatus }: ToggleAccountStatusProps) => {
  const [status, setStatus] = useState<USER_STATUS>(currentStatus);

  const handleChange = async (value: string) => {
    const newStatus = value as USER_STATUS;
    setStatus(newStatus);
    // await updateAccountStatusAction(newStatus);
  };

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger className='w-36 text-sm'>
        <SelectValue />
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
