import cities from '../data/cities';
import countryData from '../data/countryData';

const SITE_URL = 'https://locafacts.com';

const continents = [
  'asia',
  'europe',
  'africa',
  'north-america',
  'south-america',
  'oceania',
];

const staticPages = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/compare', changefreq: 'weekly', priority: '0.7' },
  { path: '/quiz', changefreq: 'weekly', priority: '0.7' },
  { path: '/world-clock', changefreq: 'daily', priority: '0.7' },
  { path: '/countries', changefreq: 'weekly', priority: '0.8' },
  { path: '/country-codes', changefreq: 'monthly', priority: '0.6' },
  { path: '/about', changefreq: 'monthly', priority: '0.4' },
  { path: '/contact', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.2' },
  { path: '/terms', changefreq: 'yearly', priority: '0.2' },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.2' },
];

function urlBlock(loc, today, changefreq, priority) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSiteMap() {
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = staticPages
    .map((p) => urlBlock(`${SITE_URL}${p.path}`, today, p.changefreq, p.priority))
    .join('');

  const cityUrls = cities
    .map((city) => urlBlock(`${SITE_URL}/location/${city.slug}`, today, 'daily', '0.9'))
    .join('');

  const countryUrls = Object.keys(countryData)
    .map((code) => urlBlock(`${SITE_URL}/country/${code}`, today, 'weekly', '0.8'))
    .join('');

  const continentUrls = continents
    .map((slug) => urlBlock(`${SITE_URL}/continent/${slug}`, today, 'weekly', '0.7'))
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${cityUrls}${countryUrls}${continentUrls}
</urlset>`;
}

export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
}