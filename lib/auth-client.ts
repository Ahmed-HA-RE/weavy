import { createAuthClient } from 'better-auth/react';
import {
  lastLoginMethodClient,
  customSessionClient,
  twoFactorClient,
} from 'better-auth/client/plugins';
import { auth } from './auth';

export const authClient = createAuthClient({
  plugins: [
    lastLoginMethodClient(),
    customSessionClient<typeof auth>(),
    twoFactorClient(),
  ],
});
