'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { APP_URL } from '@/lib/constants/app';
import { FaShareSquare } from 'react-icons/fa';
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { useCopyToClipboard } from '@/hooks/use-copy-clipboard';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { MdOutlineContentCopy } from 'react-icons/md';
import { FaCheckDouble } from 'react-icons/fa6';

const shareIconStyle = {
  border: '1px solid var(--border)',
  padding: '12px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const shareItems = [
  {
    label: 'Facebook',
    ShareButton: FacebookShareButton,
    Icon: FacebookIcon,
  },
  {
    label: 'Reddit',
    ShareButton: RedditShareButton,
    Icon: RedditIcon,
  },
  {
    label: 'WhatsApp',
    ShareButton: WhatsappShareButton,
    Icon: WhatsappIcon,
  },
  {
    label: 'Email',
    ShareButton: EmailShareButton,
    Icon: EmailIcon,
  },
];

const ShareProfileDialog = ({ userName }: { userName: string }) => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const profileUrl = `${APP_URL}/profile/${userName}`;
  const title = `Check out ${userName}'s profile!`;
  const ariaLabel = `Share ${userName}'s profile on`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='px-2 h-8 hover:bg-accent hover:text-accent-foreground w-full justify-start'
        >
          <FaShareSquare />
          Share Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md px-6 gap-0'>
        <DialogHeader className='mb-8'>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription className='sr-only'>
            This dialog allows you to share the user&apos;s profile with others.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <h3 className='text-sm'>Share this profile via:</h3>
          <div className='flex items-center gap-8'>
            {shareItems.map(({ label, ShareButton, Icon }) => {
              return (
                <div className='flex flex-col items-center gap-2.5' key={label}>
                  <ShareButton
                    title={title}
                    url={profileUrl}
                    style={shareIconStyle}
                    aria-label={`${ariaLabel} ${label}`}
                    {...(label === 'Email'
                      ? {
                          subject: title,
                          body: 'I found this profile and thought you might like it:',
                        }
                      : {})}
                  >
                    <Icon size={32} round />
                  </ShareButton>
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col gap-4'>
          <h3 className='text-sm'>Page link</h3>
          <InputGroup className='border-0 bg-muted has-[[data-slot=input-group-control]:focus-visible]:border-0 has-[[data-slot=input-group-control]:focus-visible]:ring-0'>
            <InputGroupInput readOnly placeholder={profileUrl} />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                title='Copy'
                size='icon'
                onClick={() => copyToClipboard(profileUrl)}
              >
                <span
                  className={`${isCopied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} transition-all`}
                >
                  <FaCheckDouble className='text-emerald-600' />
                </span>
                <span
                  className={`${isCopied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all absolute`}
                >
                  <MdOutlineContentCopy />
                </span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProfileDialog;
