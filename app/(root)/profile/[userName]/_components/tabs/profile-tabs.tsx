'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';
import { useState } from 'react';
import { BsFilePost, BsPostcardHeart } from 'react-icons/bs';
import { FaRegBookmark } from 'react-icons/fa';
import ProfilePostsTab from './profile-posts-tab';
import { cn } from '@/lib/utils';
import { parseAsString, useQueryState } from 'nuqs';

const tabsTriggerItems = (isOwnProfile: boolean) => {
  const baseTabs = [{ value: 'posts', label: 'POSTS', icon: BsFilePost }];

  if (isOwnProfile) {
    return [
      ...baseTabs,
      { value: 'likes', label: 'LIKES', icon: BsPostcardHeart },
      { value: 'bookmarks', label: 'BOOKMARKS', icon: FaRegBookmark },
    ];
  }
  return baseTabs;
};

const ProfileTabs = ({
  userName,
  loggedUser,
}: {
  userName: string;
  loggedUser: typeof auth.$Infer.Session.user | null;
}) => {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('posts').withOptions({ clearOnDefault: false }),
  );
  const [activeTab, setActiveTab] = useState(tab);
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTab(value);
  };

  const isOwnProfile = loggedUser?.name === userName;
  const isLoggedIn = !!loggedUser;

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className='gap-12.5'
    >
      <TabsList
        variant='line'
        className={cn(
          'w-full group-data-horizontal/tabs:h-10 border-t',
          (!isLoggedIn || !isOwnProfile) && 'mx-auto',
        )}
      >
        {tabsTriggerItems(isOwnProfile).map((tabTrigger) => {
          const Icon = tabTrigger.icon;
          return (
            <TabsTrigger
              key={tabTrigger.value}
              value={tabTrigger.value}
              className={cn(
                'gap-[7px] font-semibold group-data-horizontal/tabs:after:top-[-5px] flex-none mx-[60px]',
              )}
            >
              <Icon />
              {tabTrigger.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value='posts'>
        <ProfilePostsTab
          userName={userName}
          currentTab={activeTab}
          isOwnProfile={isOwnProfile}
          loggedUser={loggedUser}
        />
      </TabsContent>
      {isOwnProfile && (
        <>
          <TabsContent value='likes'></TabsContent>
          <TabsContent value='bookmarks'></TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default ProfileTabs;
