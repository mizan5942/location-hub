import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import countryData from '../data/countryData';

export default function CountriesPage() {
  const [search, setSearch] = useState('');

  const entries = Object.entries(countryData)
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filtered = entries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const faqs = [
  {
    q: 'How many countries does Locafacts cover?',
    a: `Locafacts currently has detailed profiles for ${entries.length} countries, including population, demographics, currency, and calling codes, with more being added over time.`,
  },
  {
    q: 'Where does the population and demographic data come from?',
    a: 'Population, life expectancy, birth and death rates, and land use figures come from the World Bank Open Data database, refreshed periodically to reflect the latest available reporting year for each country.',
  },
  {
    q: 'Can I compare two countries directly?',
    a: 'Each country page links to the cities Locafacts covers in that country, and the Compare tool lets you set two cities side by side for live weather, currency, and air quality.',
  },
  {
    q: 'How current is the data on each country page?',
    a: 'World Bank indicators typically lag by a year or two since that is how long official reporting takes, but the page always shows the most recent year available for each figure alongside the number itself.',
  },
  {
    q: 'Does every country page include a city?',
    a: 'Most country profiles link to at least one city Locafacts tracks, though a few countries are covered through demographic and travel data alone without a dedicated city page yet.',
  },
  {
    q: 'What is included in the calling code and travel information?',
    a: 'Each country page lists the international calling code, ISO country code, driving side, plug type, and voltage, the kind of details travelers usually need to look up separately before a trip.',
  },
  {
    q: 'Is this data free to use?',
    a: 'Yes. All country and city data on Locafacts is free to browse, with no account or payment required.',
  },
];

  return (
    <>
      <Head>
        <title>Browse All Countries | Locafacts</title>
        <meta name="description" content="Explore population, demographics, currency, and key facts for every country covered on Locafacts." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            }),
          }}
        />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '12px', color: 'var(--text)' }}>
          Countries
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Population, demographics, and key facts for every country on Locafacts.
        </p>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            Every country page on this site pulls together the kind of facts that usually take several separate searches to track down. Population figures, life expectancy, birth and death rates, and land use all come from the World Bank, refreshed on a regular schedule so the numbers stay current rather than frozen at whatever year a textbook happened to be printed.
          </p>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            Alongside the demographic data, each profile lists the capital, official currency, calling code, and which side of the road drivers use, the kind of small practical details that matter when you are actually planning a trip rather than just reading trivia. Every country page also links out to the cities Locafacts tracks within it, so you can move from a broad national overview straight down to live weather and currency data for a specific city.
          </p>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8' }}>
            Use the search box below to jump straight to a country, or scroll through the full list to browse. Each entry links to a dedicated page with the complete set of population, land use, and travel facts for that country.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text)',
            fontSize: '15px',
            marginBottom: '24px',
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {filtered.map((c) => (
            <Link
              key={c.code}
              href={`/country/${c.code}`}
              className="city-card"
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
              <span style={{ fontSize: '20px' }}>{c.flag}</span>
              <span style={{ fontSize: '14px' }}>{c.name}</span>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
            No countries match your search.
          </p>
        )}

        <section style={{ marginTop: '50px' }}>
  <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--text)' }}>
    Why Country-Level Data Matters
  </h2>
  <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8' }}>
    City data tells you what a place feels like right now, but country-level numbers explain the wider context behind it. A city's cost of living, infrastructure, and pace of life are all shaped by national factors like currency stability, population density, and economic policy. Looking at both levels together gives a fuller picture than either one gives alone, especially when comparing places you have never visited against ones you already know well.
  </p>
</section>

<section style={{ marginTop: '36px', paddingBottom: '30px', borderBottom: '1px solid var(--border)' }}>
  <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--text)' }}>
    How Often This Data Changes
  </h2>
  <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8' }}>
    Country statistics do not move as fast as weather or currency exchange rates, but they are not static either. Population figures shift every year, and land use or life expectancy numbers can change meaningfully over a decade as agriculture, healthcare, or urban development patterns shift. This page pulls the latest reporting year available for each figure directly from the source data, so what you see reflects the most recent numbers published rather than a fixed snapshot from whenever the page was first built.
  </p>
</section>

<section style={{ marginTop: '30px' }}>
  <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text)' }}>
    Frequently Asked Questions
  </h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '14px', marginBottom: '4px' }}>{faq.q}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{faq.a}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}