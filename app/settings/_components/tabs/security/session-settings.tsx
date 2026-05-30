import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { UAParser } from 'ua-parser-js';
import SessionCard from './session-card';

const SessionSettings = async ({ currentSession }: { currentSession: typeof auth.$Infer.Session }) => {
  const allLoggedUserSessions = await db.session.findMany({
    where: {
      id: { not: currentSession.session.id },
      userId: currentSession.user.id,
    },
    select: {
      userAgent: true,
      updatedAt: true,
      id: true,
    },
  });

  const parseSession = (userAgent: string | undefined) => UAParser(userAgent);
  const { browser, os, device } = parseSession(currentSession.session.userAgent || undefined); // for current active session info

  return (
    <div className='flex flex-col gap-8'>
      {/* Current Active Session */}
      <SessionCard
        deviceType={device.type}
        osName={os.name}
        loggedInAt={currentSession.session.updatedAt}
        browserName={browser.name}
        isCurrentSession={true}
      />
      {allLoggedUserSessions.map((session) => {
        const { browser, os, device } = parseSession(session.userAgent || undefined);
        return (
          <SessionCard
            key={session.id}
            deviceType={device.type}
            osName={os.name}
            loggedInAt={session.updatedAt}
            browserName={browser.name}
          />
        );
      })}
    </div>
  );
};

export default SessionSettings;
