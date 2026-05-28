'use client';

import { Field, FieldGroup } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { NOTIFICATIONS_MUTE_OPTIONS } from '@/lib/constants/app';
import { User } from '@/lib/generated/prisma/client';
import { useState } from 'react';
import { RiHeart2Line, RiMessage2Line, RiUserAddLine } from 'react-icons/ri';

const SwitchComponent = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <div>
      <div className='relative inline-grid h-8 grid-cols-[1fr_1fr] items-center text-sm font-medium'>
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          className='peer data-unchecked:bg-input/50 data-checked:bg-green-500 data-checked:dark:bg-green-600 absolute inset-0 rounded-md data-[size=default]:h-[inherit] data-[size=default]:w-auto [&_span]:z-10 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:group-data-[size=default]/switch:h-full [&_span]:group-data-[size=default]/switch:w-1/2 [&_span]:data-checked:translate-x-8.75 [&_span]:data-checked:rtl:-translate-x-8.75 cursor-pointer'
          aria-label='Square switch with permanent text indicators'
        />
        <span className='pointer-events-none relative ml-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-checked:invisible peer-data-unchecked:translate-x-full peer-data-unchecked:rtl:-translate-x-full'>
          <span className='text-[10px] font-medium uppercase '>No</span>
        </span>
        <span className='peer-data-checked:text-background pointer-events-none relative mr-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-checked:-translate-x-full peer-data-unchecked:invisible peer-data-checked:rtl:translate-x-full'>
          <span className='text-[10px] font-medium uppercase text-white'>Yes</span>
        </span>
      </div>
    </div>
  );
};

type NotificationOption = {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const NotificationField = ({ label, description, icon, checked, onCheckedChange }: NotificationOption) => (
  <Field orientation='horizontal' className='flex items-center justify-between border p-6 rounded-md gap-6'>
    <div className='flex items-center gap-4'>
      <span className='text-muted-foreground'>{icon}</span>
      <div className='flex flex-col'>
        <span className='font-semibold'>{label}</span>
        <span className='text-sm text-muted-foreground'>{description}</span>
      </div>
    </div>
    <SwitchComponent checked={checked} onCheckedChange={onCheckedChange} />
  </Field>
);

const NotificationsSettingsForm = ({ user }: { user: Pick<User, 'muteComments' | 'muteFollows' | 'muteLikes'> }) => {
  const [toggleMuteFollows, setToggleMuteFollows] = useState(user.muteFollows);
  const [toggleMuteComments, setToggleMuteComments] = useState(user.muteComments);
  const [toggleMuteLikes, setToggleMuteLikes] = useState(user.muteLikes);

  const notificationOptions: NotificationOption[] = [
    {
      ...NOTIFICATIONS_MUTE_OPTIONS.muteFollows,
      icon: <RiUserAddLine className='size-5' />,
      checked: toggleMuteFollows,
      onCheckedChange: setToggleMuteFollows,
    },
    {
      ...NOTIFICATIONS_MUTE_OPTIONS.muteComments,
      icon: <RiMessage2Line className='size-5' />,
      checked: toggleMuteComments,
      onCheckedChange: setToggleMuteComments,
    },
    {
      ...NOTIFICATIONS_MUTE_OPTIONS.muteLikes,
      icon: <RiHeart2Line className='size-5' />,
      checked: toggleMuteLikes,
      onCheckedChange: setToggleMuteLikes,
    },
  ];

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className='gap-8'>
        {notificationOptions.map((option) => (
          <NotificationField key={option.label} {...option} />
        ))}
      </FieldGroup>
    </form>
  );
};

export default NotificationsSettingsForm;
