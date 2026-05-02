import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import CreatePost from './_components/create-post';
import { Card } from '@/components/ui/card';

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-11 gap-6'>
      {!session ? null : (
        <>
          <section className='lg:col-span-7 '>
            <CreatePost user={session.user} />
          </section>

          <aside className='lg:col-span-4 lg:sticky lg:top-4 lg:self-start'>
            <Card></Card>
          </aside>
        </>
      )}
    </div>
  );
};

export default HomePage;
