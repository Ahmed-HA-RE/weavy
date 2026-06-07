import { MdOutlineMessage } from 'react-icons/md';
import { TbBolt, TbShieldCheck, TbUsers } from 'react-icons/tb';
import { IoIosGlobe } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa6';

export const APP_NAME = 'Weavy';
export const APP_URL =
  process.env.NEXT_PROD_SERVER_URL || 'http://localhost:3000';
export const ALLOWED_PROFILE_TABS = ['posts', 'likes', 'bookmarks'] as const;

export const updatedPrivacyPolicyDate = '2026-04-4';
export const updatedTermsOfUseDate = '2026-05-14';

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

export const APP_FAQS = [
  {
    question: 'How do I create an account?',
    answer:
      'Click "Get started" on the homepage, enter your email and a password, and verify your email address. Your account will be ready in under a minute.',
  },
  {
    question: 'How do I reset my password?',
    answer:
      'Go to the sign-in page and click "Forgot password". Enter your email and we\'ll send you a reset link within a few minutes. Check your spam folder if you don\'t see it.',
  },
  {
    question: 'How do I enable two-factor authentication?',
    answer:
      'Go to Settings → Security → Two-factor authentication and follow the setup steps. You can use an authenticator app, a backup code, or your email to verify.',
  },
  {
    question: 'How do I follow or unfollow someone?',
    answer:
      "Visit any user's profile and click the Follow button. To unfollow, click the same button again. You can also manage who you follow from your profile page.",
  },
  {
    question: 'How do I block a user?',
    answer:
      'Go to the user\'s profile, click the three-dot menu, and select "Block". Blocked users cannot see your posts or interact with you. You can manage blocked users in Settings → Privacy.',
  },
  {
    question: 'How do I report a post or user?',
    answer:
      'Tap the three-dot menu on any post or profile and select "Report". Choose a reason and submit — our team reviews all reports within 24 hours.',
  },
  {
    question: 'Can I delete my account permanently?',
    answer:
      'Yes. Go to Settings → Account → Delete account. This is permanent and cannot be undone. All your data will be removed within 30 days.',
  },
  {
    question: 'Why am I not receiving notifications?',
    answer:
      'Check your notification settings under Settings → Notifications and make sure they are enabled. Also check that your browser or device allows notifications from Weavy.',
  },
];
