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

  return (
    <>
      <Head>
        <title>Browse All Countries | Locafacts</title>
        <meta name="description" content="Explore population, demographics, currency, and key facts for every country covered on Locafacts." />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '12px', color: 'var(--text)' }}>
          Countries
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Population, demographics, and key facts for every country on Locafacts.
        </p>

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
      </main>
    </>
  );
}