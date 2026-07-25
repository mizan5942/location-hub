import { useState, useMemo } from 'react';
import Head from 'next/head';
import cities from '../data/cities';
import WorldClockRow from '../components/WorldClockRow';

const continentOrder = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default function WorldClock({ citiesWithOffsets }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => citiesWithOffsets.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search, citiesWithOffsets]
  );

  const grouped = {};
  continentOrder.forEach((c) => (grouped[c] = []));
 filtered.forEach((city) => {
    if (!grouped[city.continent]) grouped[city.continent] = [];
    grouped[city.continent].push(city);
  });

  return (
    <>
      <Head>
        <title>World Clock — Locafacts</title>
        <meta name="description" content="Current local time in cities around the world, updated live." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '12px', color: 'var(--text)' }}>
          World Clock
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
          Current local time in cities around the world, ticking live.
        </p>

        <input
          type="text"
          placeholder="Search a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '340px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text)',
            fontSize: '15px',
            outline: 'none',
            marginBottom: '40px',
          }}
        />

        {continentOrder.map((continent) => {
          const list = grouped[continent];
          if (!list || list.length === 0) return null;
          return (
            <section key={continent} style={{ marginBottom: '36px' }}>
              <h2 className="font-display" style={{ fontSize: '20px', marginBottom: '14px', color: 'var(--text)' }}>
                {continent}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {list.map((city) => (
                  <WorldClockRow key={city.slug} city={city} utcOffsetSeconds={city.utcOffsetSeconds} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const citiesWithOffsets = await Promise.all(
    cities.map(async (city) => {
      const data = await safeFetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m&timezone=auto`
      );
      return { ...city, utcOffsetSeconds: data?.utc_offset_seconds ?? null };
    })
  );

  return {
    props: { citiesWithOffsets },
    revalidate: 43200,
  };
}