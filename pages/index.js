import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import cities from '../data/cities';
import countryData from '../data/countryData';

const continentInfo = [
  { name: 'Asia', slug: 'asia', icon: '🏯' },
  { name: 'Europe', slug: 'europe', icon: '🏰' },
  { name: 'Africa', slug: 'africa', icon: '🦁' },
  { name: 'North America', slug: 'north-america', icon: '🗽' },
  { name: 'South America', slug: 'south-america', icon: '🌎' },
  { name: 'Oceania', slug: 'oceania', icon: '🏝️' },
];

function WorldMapSVG() {
  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '30px', marginBottom: '60px', textAlign: 'center' }}>
      <img
        src="/world-map.svg"
        alt="World map showing regions covered by Locafacts"
        style={{
          width: '100%',
          maxWidth: '800px',
          height: 'auto',
          opacity: 0.85,
          filter: 'invert(0.85) sepia(0.3) saturate(1.5) hue-rotate(140deg) brightness(0.9)',
        }}
      />
    </div>
  );
}

function SectionHeader({ title, seeMoreHref, seeMoreLabel }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--text)' }}>{title}</h2>
      <Link
        href={seeMoreHref}
        style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        {seeMoreLabel} →
      </Link>
    </div>
  );
}
function LiveClockBadge() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 18px',
        borderRadius: '999px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        marginBottom: '24px',
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#5FBF7A',
          boxShadow: '0 0 0 0 rgba(95, 191, 122, 0.6)',
          animation: 'pulse 1.5s infinite',
        }}
      />
      <span style={{ fontSize: '16px', color: 'var(--text-muted)', letterSpacing: '0.2em', fontWeight: 700 }}>
        LIVE
      </span>
      <span className="font-mono-data" style={{ fontSize: '18px', color: 'var(--gold)' }}>
        {hh}:{mm}:{ss}
      </span>
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(95, 191, 122, 0.6); }
          70% { box-shadow: 0 0 0 8px rgba(95, 191, 122, 0); }
          100% { box-shadow: 0 0 0 0 rgba(95, 191, 122, 0); }
        }
      `}</style>
    </div>
  );
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
  const countryCount = useMemo(() => Object.keys(countryData).length, []);

  const countryEntries = useMemo(() => Object.entries(countryData), []);
  const previewCountries = countryEntries.slice(0, 24);
  const previewCities = cities.slice(0, 24);

  const filteredCities = useMemo(
    () => (search ? cities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : []),
    [search]
  );

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
        {/* HERO */}
        <section style={{ padding: '90px 0 50px', textAlign: 'center' }}>
         
          <h1 className="font-display" style={{ fontSize: '52px', fontWeight: 600, marginBottom: '20px', color: 'var(--text)', lineHeight: '1.15' }}>
            Live facts for every city on Earth
          </h1>
          <LiveClockBadge />
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '580px', margin: '0 auto 36px' }}>
            Weather, currency, air quality, and essential local facts, pulled live and updated every 12 hours.
          </p>
          
          <input
            type="text"
            placeholder="Search a city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '460px',
              padding: '16px 20px',
              borderRadius: '10px',
              border: '2px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text)',
              fontSize: '16px',
              outline: 'none',
              marginBottom: '20px',
            }}
          />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link
              href="/quiz"
              style={{ padding: '10px 20px', borderRadius: '999px', backgroundColor: 'var(--accent)', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}
            >
              Take the World Quiz →
            </Link>
            <Link
              href="/compare"
              style={{ padding: '10px 20px', borderRadius: '999px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}
            >
              Compare Two Cities
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '16px', padding: '28px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p className="font-display" style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '4px' }}>{cities.length}+</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cities Covered</p>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p className="font-display" style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '4px' }}>{countryCount}+</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Countries</p>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p className="font-display" style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '4px' }}>12h</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Data Refresh</p>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p className="font-display" style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '4px' }}>Free</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Always</p>
            </div>
          </div>
        </section>

        {/* SEARCH RESULTS (only when searching) */}
        {search && (
          <section style={{ paddingBottom: '60px' }}>
            <h2 className="font-display" style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '16px' }}>
              Results for "{search}"
            </h2>
            {filteredCities.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {filteredCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="city-card"
                    style={{ display: 'block', padding: '20px', borderRadius: '10px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}
                  >
                    <p className="font-display" style={{ fontSize: '18px', fontWeight: 600 }}>{city.name}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-dim)' }}>No cities match "{search}".</p>
            )}
          </section>
        )}

        {!search && (
          <>
            {/* CONTINENT CARDS — 3 columns x 2 rows */}
            <section style={{ marginTop: '60px', marginBottom: '60px' }}>
              <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '20px' }}>
                Browse by Continent
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {continentInfo.map((c) => {
                  const count = cities.filter((city) => city.continent === c.name).length;
                  return (
                    <Link
                      key={c.slug}
                      href={`/continent/${c.slug}`}
                      className="city-card"
                      style={{ display: 'block', padding: '20px', borderRadius: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)', textAlign: 'center' }}
                    >
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{c.icon}</div>
                      <p className="font-display" style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{c.name}</p>
                      <p className="font-mono-data" style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{count} cities</p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* COUNTRIES PREVIEW — 4 columns */}
            <section style={{ marginBottom: '60px' }}>
              <SectionHeader title="Countries" seeMoreHref="/countries" seeMoreLabel="See more countries" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {previewCountries.map(([code, info]) => (
                  <Link
                    key={code}
                    href={`/country/${code}`}
                    className="city-card"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', borderRadius: '10px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}
                  >
                    <span style={{ fontSize: '18px' }}>{info.flag}</span>
                    <span style={{ fontSize: '13px' }}>{info.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            

            {/* CITIES PREVIEW — 4 columns */}
            <section style={{ marginBottom: '60px' }}>
              <SectionHeader title="Cities" seeMoreHref="/world-clock" seeMoreLabel="See more cities" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {previewCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="city-card"
                    style={{ display: 'block', padding: '14px', borderRadius: '10px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}
                  >
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{city.name}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* MAP */}
            <WorldMapSVG />

            {/* FEATURES */}
            <section style={{ marginBottom: '70px' }}>
              <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '20px', textAlign: 'center' }}>
                Explore the world, live
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <Link href="/world-clock" className="city-card" style={{ display: 'block', padding: '24px', borderRadius: '14px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🕐</div>
                  <p className="font-display" style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>World Clock</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Live local time for every city, grouped by continent.</p>
                </Link>
                <Link href="/compare" className="city-card" style={{ display: 'block', padding: '24px', borderRadius: '14px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚖️</div>
                  <p className="font-display" style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>Compare Cities</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Weather, currency, and air quality, side by side.</p>
                </Link>
                <Link href="/quiz" className="city-card" style={{ display: 'block', padding: '24px', borderRadius: '14px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🌍</div>
                  <p className="font-display" style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>World Facts Quiz</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Test your knowledge of capitals and currencies.</p>
                </Link>
                <Link href="/countries" className="city-card" style={{ display: 'block', padding: '24px', borderRadius: '14px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🏛️</div>
                  <p className="font-display" style={{ fontSize: '17px', fontWeight: 600, marginBottom: '6px' }}>Country Profiles</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Population and demographics for every country.</p>
                </Link>
              </div>
            </section>
          </>
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