'use client';

import DeleteDialog from '@/components/delete-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteMyPostAction } from '@/lib/actions/post/delete-my-post-action';
import { FaEllipsis } from 'react-icons/fa6';
import FollowButton from '../../../../../components/follow-button';
import { cn } from '@/lib/utils';

const PostActions = ({
  setIsEdit,
  post,
  isOwner,
  isFollowing,
}: {
  setIsEdit: (value: boolean) => void;
  post: {
    id: string;
    userId: string;
  };
  isOwner: boolean;
  isFollowing: boolean;
}) => {
  const dropdownClass = 'w-full justify-start h-8 bg-transparent px-2';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' aria-label='Post options'>
          <FaEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {isOwner && (
            <DropdownMenuItem onClick={() => setIsEdit(true)}>
              Edit
            </DropdownMenuItem>
          )}
          {isOwner && (
            <DropdownMenuItem asChild>
              <DeleteDialog
                title='Delete my post'
                subtitle='Are you sure you want to delete this post? It cannot be undone.'
                trigger={
                  <Button
                    className={cn(
                      dropdownClass,
                      'hover:bg-destructive/20 text-destructive',
                    )}
                  >
                    Delete
                  </Button>
                }
                action={() => deleteMyPostAction(post.id)}
              />
            </DropdownMenuItem>
          )}
          {!isOwner && (
            <DropdownMenuItem asChild>
              <FollowButton
                className={dropdownClass}
                userId={post.userId}
                isToggle
                isFollowing={isFollowing}
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActions;
