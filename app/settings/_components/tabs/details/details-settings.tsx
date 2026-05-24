import db from '@/lib/db';
import DetailsSettingsForm from './details-settings-form';

const DetailsSettings = async ({ loggedUserId }: { loggedUserId: string }) => {
  const user = await db.user.findUnique({
    where: { id: loggedUserId },
    select: {
      name: true,
      displayName: true,
      email: true,
      bio: true,
      website: true,
      location: true,
    },
  });

  if (!user) return null;

  return <DetailsSettingsForm user={user} />;
};

export default DetailsSettings;
