'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';
import { useState } from 'react';
import { BsFilePost, BsPostcardHeart } from 'react-icons/bs';
import { FaRegBookmark } from 'react-icons/fa';
import ProfilePostsTab from './profile-posts-tab';
import { cn } from '@/lib/utils';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { ALLOWED_PROFILE_TABS } from '@/lib/constants/app';
import ProfileLikesTab from './profile-likes-tab';

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
    parseAsStringLiteral(ALLOWED_PROFILE_TABS)
      .withDefault('posts')
      .withOptions({ clearOnDefault: false }),
  );

  const [activeTab, setActiveTab] = useState(tab);
  const handleTabChange = (value: (typeof ALLOWED_PROFILE_TABS)[number]) => {
    setActiveTab(value);
    setTab(value);
  };

  const isOwnProfile = loggedUser?.name === userName;
  const isLoggedIn = !!loggedUser;

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange as (value: string) => void}
      className='gap-12.5'
    >
      <TabsList
        variant='line'
        className={cn(
          'w-full group-data-horizontal/tabs:h-10 border-t gap-16',
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
                'gap-[7px] font-semibold group-data-horizontal/tabs:after:top-[-5px] flex-none',
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
          <TabsContent value='likes'>
            <ProfileLikesTab
              userName={userName}
              currentTab={activeTab}
              isOwnProfile={isOwnProfile}
              loggedUser={loggedUser}
            />
          </TabsContent>
          <TabsContent value='bookmarks'></TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default ProfileTabs;
