export const SITE_URL = 'https://locafacts.com';

export function canonicalUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}