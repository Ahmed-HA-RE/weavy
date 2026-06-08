import Image from 'next/image';

const EmptyUsers = ({
  type,
  isOwner,
}: {
  type: 'followers' | 'following';
  isOwner: boolean;
}) => {
  return (
    <div className='min-h-[70vh] flex flex-col items-center mt-20 gap-10'>
      <Image
        src={'/svg/empty-users.svg'}
        alt='No users found'
        width={350}
        height={350}
      />
      <div className='text-center space-y-2'>
        <h3 className='text-2xl font-semibold'>No {type} yet</h3>
        <p className='text-muted-foreground '>
          {type === 'followers'
            ? isOwner
              ? 'You have no followers yet. Share your profile to gain followers!'
              : 'This user has no followers yet.'
            : isOwner
              ? 'You are not following anyone yet. Explore and follow users to see their updates!'
              : 'This user is not following anyone yet.'}
        </p>
      </div>
    </div>
  );
};

export default EmptyUsers;
