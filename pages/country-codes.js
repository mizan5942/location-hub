import Link from 'next/link';
import cities from '../data/cities';
import { useState } from 'react';
import Head from 'next/head';
import countryData from '../data/countryData';
import { canonicalUrl } from '../lib/seo';

function findCityForCountry(countryCode, capitalName) {
  const countryCities = cities.filter((c) => c.countryCode === countryCode);
  const capitalMatch = countryCities.find((c) => c.name === capitalName);
  return capitalMatch || countryCities[0] || null;
}

export default function CountryCodesPage() {
  const [search, setSearch] = useState('');

  const entries = Object.entries(countryData)
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filtered = entries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.callingCode.includes(search)
  );

  return (
    <>
      <Head>
        <title>Country Codes — ISO & Calling Codes for Every Country | Locafacts</title>
        <meta
          name="description"
          content="Complete list of country calling codes and ISO codes, with capital cities and flags for every country."
        />
        <link rel="canonical" href={canonicalUrl('/country-codes')} />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '12px', color: 'var(--text)' }}>
          Country Codes
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          ISO codes, calling codes, and capitals for every country covered on Locafacts.
        </p>

        <input
          type="text"
          placeholder="Search by country, ISO code, or calling code..."
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

        <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
              padding: '12px 16px',
              backgroundColor: 'var(--bg-card)',
              borderBottom: '1px solid var(--border)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              fontWeight: 600,
            }}
          >
            <span>Country</span>
            <span>ISO Code</span>
            <span>Calling Code</span>
            <span>Capital</span>
          </div>

         {filtered.map((c) => {
  const linkedCity = findCityForCountry(c.code, c.capital);
  const rowContent = (
    <>
      <span>{c.flag} {c.name}</span>
      <span className="font-mono-data">{c.code}</span>
      <span className="font-mono-data">{c.callingCode}</span>
      <span>{c.capital}</span>
    </>
  );

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border)',
    fontSize: '14px',
    color: 'var(--text)',
    alignItems: 'center',
  };

  return linkedCity ? (
    <Link
      key={c.code}
      href={`/location/${linkedCity.slug}`}
      className="dropdown-item"
      style={{ ...rowStyle, textDecoration: 'none' }}
    >
      {rowContent}
    </Link>
  ) : (
    <div key={c.code} style={rowStyle}>
      {rowContent}
    </div>
  );
})}

          {filtered.length === 0 && (
            <p style={{ padding: '20px', color: 'var(--text-muted)', textAlign: 'center' }}>
              No countries match your search.
            </p>
          )}
        </div>
      </main>
    </>
  );
}