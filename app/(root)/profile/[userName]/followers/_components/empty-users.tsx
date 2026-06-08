import Image from 'next/image';

const EmptyUsers = ({ type }: { type: 'followers' | 'following' }) => {
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
          This user has not gained any {type} yet. When they do, they will
          appear here.
        </p>
      </div>
    </div>
  );
};

export default EmptyUsers;
