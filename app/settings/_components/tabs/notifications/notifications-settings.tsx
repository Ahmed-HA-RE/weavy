import db from '@/lib/db';
import NotificationsSettingsForm from './notifications-settings-form';

const NotificationsSettings = async ({ loggedUserId }: { loggedUserId: string }) => {
  const user = await db.user.findUnique({
    where: {
      id: loggedUserId,
    },
    select: {
      muteComments: true,
      muteFollows: true,
      muteLikes: true,
    },
  });

  if (!user) return null;

  return <NotificationsSettingsForm user={user} />;
};

export default NotificationsSettings;
