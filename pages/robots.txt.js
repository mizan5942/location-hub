const PRODUCTION_HOST = 'locafacts.com';
const SITE_URL = 'https://locafacts.com';

function generateRobotsTxt(host) {
  const isProduction = host === PRODUCTION_HOST || host === `www.${PRODUCTION_HOST}`;

  if (!isProduction) {
    return `User-agent: *
Disallow: /
`;
  }

  return `User-agent: *
Allow: /

User-agent: Mediapartners-Google
Allow: /

# AI answer / retrieval crawlers — allowed for citation in AI search
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# AI training crawlers — allowed (public factual data, not gated content)
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export default function Robots() {
  return null;
}

export async function getServerSideProps({ req, res }) {
  const host = req.headers.host?.split(':')[0] || '';
  const robotsTxt = generateRobotsTxt(host);

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(robotsTxt);
  res.end();

  return { props: {} };
}