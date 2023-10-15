const PREFIX = 'stock2u';

export type SessionStorageKey = keyof typeof SESSION_STORAGE_KEY;

export const SESSION_STORAGE_KEY = {
  OAUTH_REDIRECT_PATH: `${PREFIX}-oauth-redirect-path`,
} as const;
