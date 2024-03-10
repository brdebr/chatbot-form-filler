
export const isProd = process.env.NODE_ENV === 'production';
export const APP_VERSION_HASH = process.env.COMMIT_DEPLOYED_HASH || 'dev';

export function getFaviconByEnv() {
  return isProd ? '🤖' : '🚧';
}