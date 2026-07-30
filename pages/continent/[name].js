import Head from 'next/head';
import Link from 'next/link';
import cities from '../../data/cities';
import countryData from '../../data/countryData';
import continentIntros from '../../data/continentIntros.json';
import { autoLinkText } from '../../lib/autoLink';

function renderIntro(text) {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((para, i) => {
    const segments = autoLinkText(para, {});
    return (
      <p key={i} style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
        {segments.map((seg, j) =>
          seg.linked ? (
            <Link key={j} href={seg.href} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              {seg.text}
            </Link>
          ) : (
            <span key={j}>{seg.text}</span>
          )
        )}
      </p>
    );
  });
}

function slugToName(slug) {
  const map = {
    asia: 'Asia',
    europe: 'Europe',
    africa: 'Africa',
    'north-america': 'North America',
    'south-america': 'South America',
    oceania: 'Oceania',
  };
  return map[slug];
}

export default function ContinentPage({ continentName, continentCities, continentCountryCodes }) {
  return (
    <>
      <Head>
        <title>{`${continentName} — Cities, Countries & Facts | Locafacts`}</title>
        <meta
          name="description"
          content={`Explore cities and countries across ${continentName}, with live weather, currency, and travel facts.`}
        />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '40px', marginBottom: '24px', color: 'var(--text)' }}>
          {continentName}
        </h1>

        {continentIntros[continentName] && (
          <div style={{ marginBottom: '32px' }}>
            {renderIntro(continentIntros[continentName])}
          </div>
        )}

        {continentCountryCodes.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text)' }}>
              Countries in {continentName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {continentCountryCodes.map((code) => (
                <Link
                  key={code}
                  href={`/country/${code}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    textDecoration: 'none',
                    color: 'var(--text)',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{countryData[code]?.flag}</span>
                  <span style={{ fontSize: '14px' }}>{countryData[code]?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {continentCities.length > 0 && (
          <div>
            <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text)' }}>
              Cities in {continentName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
  {continentCities.map((city) => (
    <Link
      key={city.slug}
      href={`/location/${city.slug}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '14px 16px',
        color: 'var(--accent)',
        textDecoration: 'none',
        fontSize: '14px',
      }}
    >
      {city.name} →
    </Link>
  ))}
</div>
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = ['asia', 'europe', 'africa', 'north-america', 'south-america', 'oceania'];
  const paths = slugs.map((name) => ({ params: { name } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const continentName = slugToName(params.name);
  const continentCities = cities.filter((c) => c.continent === continentName);
  const continentCountryCodes = [...new Set(continentCities.map((c) => c.countryCode))];

  return {
    props: { continentName, continentCities, continentCountryCodes },
    revalidate: 43200,
  };
}