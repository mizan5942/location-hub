import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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

export default function ContinentPage({ continentName, continentSlug, continentCities, continentCountryCodes }) {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const filteredCountryCodes = q
    ? continentCountryCodes.filter((code) =>
        countryData[code]?.name?.toLowerCase().includes(q)
      )
    : continentCountryCodes;

  const filteredCities = q
    ? continentCities.filter((c) => c.name.toLowerCase().includes(q))
    : continentCities;

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
        {/* Featured continent image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '32px',
            border: '1px solid var(--border)',
          }}
        >
          <Image
            src={`/images/continents/${continentSlug}.jpg`}
            alt={`${continentName} landscape`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))',
            }}
          />
          <h1
            className="font-display"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              fontSize: '40px',
              color: '#fff',
              margin: 0,
            }}
          >
            {continentName}
          </h1>
        </div>

        {continentIntros[continentName] && (
          <div style={{ marginBottom: '32px' }}>
            {renderIntro(continentIntros[continentName])}
          </div>
        )}

        {/* Search bar */}
        <div style={{ marginBottom: '32px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search countries or cities in ${continentName}...`}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '15px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text)',
              outline: 'none',
            }}
          />
        </div>

        {/* Countries list (scrollable) */}
        {filteredCountryCodes.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text)' }}>
              Countries in {continentName} ({filteredCountryCodes.length})
            </h2>
            <div
              className="scroll-box"
              style={{
                maxHeight: '420px',
                overflowY: 'auto',
                paddingRight: '8px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {filteredCountryCodes.map((code) => (
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
          </div>
        )}

        {/* Cities list (scrollable) */}
        {filteredCities.length > 0 && (
          <div>
            <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text)' }}>
              Cities in {continentName} ({filteredCities.length})
            </h2>
            <div
              className="scroll-box"
              style={{
                maxHeight: '420px',
                overflowY: 'auto',
                paddingRight: '8px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {filteredCities.map((city) => (
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
          </div>
        )}

        {q && filteredCountryCodes.length === 0 && filteredCities.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            No countries or cities match "{query}" in {continentName}.
          </p>
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
    props: {
      continentName,
      continentSlug: params.name,
      continentCities,
      continentCountryCodes,
    },
    revalidate: 43200,
  };
}