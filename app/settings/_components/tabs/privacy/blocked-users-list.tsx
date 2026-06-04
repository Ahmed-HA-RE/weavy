'use client';

import { useState } from 'react';

import { LuSearch } from 'react-icons/lu';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchBlockedUsersAction } from '@/lib/actions/settings/fetch-blocked-users-action';
import UsersListSkeleton from '../../../../../components/users-list-skeleton';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { IoIosAlert } from 'react-icons/io';
import UserListItem from '@/components/user-list-item';
import { useDebounce } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';

const BlockedUsersList = () => {
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(1);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, status, error, isFetching } = useQuery({
    queryKey: ['blocked-users', { debouncedSearch, offset }],
    queryFn: () =>
      fetchBlockedUsersAction({ searchFilter: debouncedSearch, offset }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 min
  });

  return (
    <div className='flex flex-col gap-8'>
      {/* Search */}
      <InputGroup>
        <InputGroupInput
          placeholder='Search blocked users...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOffset(1);
          }}
        />
        <InputGroupAddon align='inline-start'>
          <LuSearch className='size-4' />
        </InputGroupAddon>
        {isFetching && search && (
          <InputGroupAddon align='inline-end'>
            <Spinner />
          </InputGroupAddon>
        )}
      </InputGroup>

      {/* Blocked users list */}
      {status === 'pending' ? (
        <UsersListSkeleton />
      ) : status === 'error' ? (
        <Alert variant='error'>
          <IoIosAlert />
          <AlertTitle>
            {error.message || 'An error occurred while getting blocked users'}
          </AlertTitle>
        </Alert>
      ) : data && data.blockedUsers?.length === 0 ? (
        <p className='text-muted-foreground text-sm text-center'>
          No blocked users found.
        </p>
      ) : (
        <div className='flex flex-col gap-4'>
          {data.blockedUsers?.map((user) => (
            <UserListItem
              key={user.blocked.id}
              user={user.blocked}
              isSettingsPage={true}
            />
          ))}
        </div>
      )}
      {/* Pagination Button*/}
      {data && data.totalPages > 1 && (
        <div className='flex justify-end gap-2 mt-12'>
          <Button
            variant='outline'
            onClick={() => setOffset((prev) => prev - 1)}
            disabled={offset === 1}
          >
            <MdKeyboardArrowLeft /> Previous
          </Button>
          <Button
            variant='default'
            onClick={() => setOffset((prev) => prev + 1)}
            disabled={offset >= data.totalPages}
          >
            Next <MdKeyboardArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlockedUsersList;
