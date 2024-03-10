
const isProd = process.env.NODE_ENV === 'production';

export function isProduction() {
  return isProd;
}

export function getFaviconByEnv() {
  return isProduction() ? '🤖' : '🚧';
}