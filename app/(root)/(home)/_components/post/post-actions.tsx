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

const PostActions = ({
  setIsEdit,
  postId,
  isOwner,
}: {
  setIsEdit: (value: boolean) => void;
  postId: string;
  isOwner: boolean;
}) => {
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
                  <Button className='w-full justify-start h-8 hover:bg-destructive/20 text-destructive bg-transparent px-2'>
                    Delete
                  </Button>
                }
                action={() => deleteMyPostAction(postId)}
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActions;
