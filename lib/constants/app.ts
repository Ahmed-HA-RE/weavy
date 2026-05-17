export const APP_NAME = 'Weavy';
export const APP_URL =
  process.env.NEXT_PROD_SERVER_URL || 'http://localhost:3000';
export const ALLOWED_PROFILE_TABS = ['posts', 'likes', 'bookmarks'] as const;
