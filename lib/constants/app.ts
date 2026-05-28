export const APP_NAME = 'Weavy';
export const APP_URL = process.env.NEXT_PROD_SERVER_URL || 'http://localhost:3000';
export const ALLOWED_PROFILE_TABS = ['posts', 'likes', 'bookmarks'] as const;

export const DANGER_ZONE_CONFIRMATION_TEXTS = {
  confirmation1: 'I understand that all my data will be permanently deleted and cannot be recovered.',
  confirmation2: 'I understand that this action is irreversible.',
  confirmation3: 'I understand that my profile, posts, and followers will be permanently lost.',
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
