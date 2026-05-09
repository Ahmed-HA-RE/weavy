'use client';

import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button';
import { deleteMyNotificationAction } from '@/lib/actions/notification/delete-my-notification-action';
import { markNotificationAsReadAction } from '@/lib/actions/notification/mark-notification-as-read-action';
import { useQueryClient } from '@tanstack/react-query';
import { FaRegTrashAlt } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { toast } from 'sonner';

const NotificationActions = ({
  notificationId,
  isRead,
}: {
  notificationId: string;
  isRead: boolean;
}) => {
  const queryClient = useQueryClient();

  const handleReadNotification = async () => {
    const res = await markNotificationAsReadAction(notificationId);

    if (res.success) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    } else {
      toast.error(res.message);
      return;
    }
  };

  return (
    <div className='flex items-center gap-2 self-end max-sm:mt-4'>
      <Button
        variant='secondary'
        size='icon-xs'
        disabled={isRead}
        onClick={handleReadNotification}
      >
        <RiCheckDoubleFill />
      </Button>
      <DeleteDialog
        title='Delete Notification'
        subtitle='Are you sure you want to delete this notification?'
        trigger={
          <Button variant='destructive' size='icon-xs'>
            <FaRegTrashAlt />
          </Button>
        }
        action={() => deleteMyNotificationAction(notificationId)}
        isClientPurgeCache={true}
        queryKey='notifications'
      />
    </div>
  );
};

export default NotificationActions;
