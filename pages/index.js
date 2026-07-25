import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import cities from '../data/cities';

const continentOrder = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export default function Home() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % cities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeCity = cities[tickerIndex];

  const filteredCities = useMemo(
    () => cities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const grouped = useMemo(() => {
    const map = {};
    continentOrder.forEach((c) => (map[c] = []));
    filteredCities.forEach((city) => {
      if (!map[city.continent]) map[city.continent] = [];
      map[city.continent].push(city);
    });
    return map;
  }, [filteredCities]);

  return (
    <>
      <Head>
        <title>Locafacts — Live Facts for Every City</title>
        <meta
          name="description"
          content="Real-time weather, currency, air quality, and essential facts for cities around the world. Free, live, and always up to date."
        />
        <link rel="canonical" href="https://locafacts.com/" />
      </Head>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <section style={{ padding: '80px 0 60px', textAlign: 'center' }}>
          <p
            className="font-mono-data"
            style={{ color: 'var(--gold)', letterSpacing: '0.15em', fontSize: '13px', marginBottom: '16px' }}
          >
            {activeCity.latitude.toFixed(2)}°N, {activeCity.longitude.toFixed(2)}°E — {activeCity.name.toUpperCase()}
          </p>
          <h1 className="font-display" style={{ fontSize: '48px', fontWeight: 600, marginBottom: '20px', color: 'var(--text)' }}>
            Live facts for every city on Earth
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '560px', margin: '0 auto 32px' }}>
            Weather, currency, air quality, and essential local facts — pulled live, updated every 12 hours.
          </p>
          <input
            type="text"
            placeholder="Search a city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '14px 18px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text)',
              fontSize: '16px',
              outline: 'none',
            }}
          />
        </section>

        {continentOrder.map((continent) => {
          const citiesInContinent = grouped[continent];
          if (!citiesInContinent || citiesInContinent.length === 0) return null;

          return (
            <section key={continent} id={slugify(continent)} style={{ paddingBottom: '60px', scrollMarginTop: '90px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--text)' }}>
                  {continent}
                </h2>
                <span className="font-mono-data" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  {citiesInContinent.length} {citiesInContinent.length === 1 ? 'city' : 'cities'}
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {citiesInContinent.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="city-card"
                    style={{
                      display: 'block',
                      padding: '20px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      color: 'var(--text)',
                    }}
                  >
                    <p className="font-display" style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                      {city.name}
                    </p>
                    <p className="font-mono-data" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                      {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {filteredCities.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '40px 0' }}>
            No cities match "{search}".
          </p>
        )}

        <section style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px' }}>
          {/* <ins className="adsbygoogle" ...></ins> */}
        </section>

        <section style={{ padding: '20px 0 80px', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>
          <p>
            Locafacts brings together live weather, currency exchange rates, air quality readings, and
            essential local information for cities across the world — all in one place, updated automatically
            every 12 hours. Whether you're planning a trip, checking conditions before a call with a colleague
            abroad, or just curious about a place, Locafacts gives you the facts as they stand right now.
          </p>
        </section>
      </main>
    </>
  );
}