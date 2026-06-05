import { MdOutlineMessage } from 'react-icons/md';
import { TbBolt, TbShieldCheck, TbUsers } from 'react-icons/tb';
import { IoIosGlobe } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa6';

export const APP_NAME = 'Weavy';
export const APP_URL =
  process.env.NEXT_PROD_SERVER_URL || 'http://localhost:3000';
export const ALLOWED_PROFILE_TABS = ['posts', 'likes', 'bookmarks'] as const;

export const DANGER_ZONE_CONFIRMATION_TEXTS = {
  confirmation1:
    'I understand that all my data will be permanently deleted and cannot be recovered.',
  confirmation2: 'I understand that this action is irreversible.',
  confirmation3:
    'I understand that my profile, posts, and followers will be permanently lost.',
};

export const NOTIFICATIONS_MUTE_OPTIONS = {
  muteFollows: {
    label: 'Mute Follows',
    description: 'Turn off notifications for new followers.',
  },
  muteComments: {
    label: 'Mute Comments',
    description: 'Turn off notifications for new comments on your posts.',
  },
  muteLikes: {
    label: 'Mute Likes',
    description: 'Turn off notifications for new likes on your posts.',
  },
};

export const ABOUT_STATS = [
  { label: 'Registered Users', value: 4.2, suffix: 'M+', decimalPlaces: 1 },
  { label: 'Posts Shared', value: 18.7, suffix: 'M+', decimalPlaces: 1 },
  { label: 'Comments Written', value: 52.3, suffix: 'M+', decimalPlaces: 1 },
  {
    label: 'Active Users This Month',
    value: 890,
    suffix: 'K+',
    decimalPlaces: 0,
  },
];
export const APP_VALUES = [
  {
    icon: MdOutlineMessage,
    title: 'Real Conversations',
    description:
      'We believe every voice matters. Weavy is built so people can share ideas, debate topics, and connect meaningfully — without the noise.',
  },
  {
    icon: TbShieldCheck,
    title: 'Safe by Design',
    description:
      'Your safety is non-negotiable. Robust reporting tools, transparent moderation, and privacy-first defaults keep Weavy a place you want to be.',
  },
  {
    icon: TbUsers,
    title: 'Community First',
    description:
      'Weavy thrives because of its communities. We put the people who build and nurture them at the centre of every product decision.',
  },
  {
    icon: TbBolt,
    title: 'Always Improving',
    description:
      'We ship fast, listen harder, and iterate constantly. Your feedback shapes every release — nothing is set in stone.',
  },
  {
    icon: IoIosGlobe,
    title: 'Open to Everyone',
    description:
      'Weavy is for curious minds across every background, culture, and interest. Diversity of thought is our greatest strength.',
  },
  {
    icon: FaRegHeart,
    title: 'Passion-Driven',
    description:
      'We are a small team obsessed with building something people genuinely love — a place you return to every day because it enriches your life.',
  },
];
