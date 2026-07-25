import { useState } from 'react';
import Head from 'next/head';
import cities from '../data/cities';

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

async function fetchCityData(city) {
  const weather = await safeFetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`
  );
  const currency = await safeFetch('https://open.er-api.com/v6/latest/USD');
  const airQuality = await safeFetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.latitude}&longitude=${city.longitude}&current=pm2_5`
  );
  const country = await safeFetch(`https://countries.dev/alpha/${city.countryCode}`);

  return { weather, currency, airQuality, country };
}

function CompareRow({ label, valueA, valueB }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{label}</span>
      <span className="font-mono-data" style={{ color: 'var(--text)', fontSize: '14px' }}>{valueA ?? '—'}</span>
      <span className="font-mono-data" style={{ color: 'var(--text)', fontSize: '14px' }}>{valueB ?? '—'}</span>
    </div>
  );
}

export default function Compare() {
  const [slugA, setSlugA] = useState('');
  const [slugB, setSlugB] = useState('');
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  const [loading, setLoading] = useState(false);

  const cityA = cities.find((c) => c.slug === slugA);
  const cityB = cities.find((c) => c.slug === slugB);

  const handleCompare = async () => {
    if (!cityA || !cityB) return;
    setLoading(true);
    const [resultA, resultB] = await Promise.all([fetchCityData(cityA), fetchCityData(cityB)]);
    setDataA(resultA);
    setDataB(resultB);
    setLoading(false);
  };

  const currencyCodeA = dataA?.country?.currencies?.[0]?.code;
  const currencyCodeB = dataB?.country?.currencies?.[0]?.code;

  return (
    <>
      <Head>
        <title>Compare Cities — Locafacts</title>
        <meta name="description" content="Compare weather, currency, and air quality between two cities side by side." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '12px', color: 'var(--text)' }}>
          Compare Cities
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px' }}>
          Pick two cities to compare their weather, currency, and air quality side by side.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '32px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>City A</label>
            <select
              value={slugA}
              onChange={(e) => setSlugA(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text)' }}
            >
              <option value="">Select a city</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>City B</label>
            <select
              value={slugB}
              onChange={(e) => setSlugB(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text)' }}
            >
              <option value="">Select a city</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCompare}
            disabled={!cityA || !cityB || loading}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--accent)',
              color: '#fff',
              cursor: cityA && cityB ? 'pointer' : 'not-allowed',
              opacity: cityA && cityB ? 1 : 0.5,
              fontSize: '14px',
            }}
          >
            {loading ? 'Loading...' : 'Compare'}
          </button>
        </div>

        {dataA && dataB && (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', paddingBottom: '12px', marginBottom: '8px', borderBottom: '2px solid var(--border)' }}>
              <span></span>
              <span className="font-display" style={{ fontWeight: 600, color: 'var(--text)' }}>{cityA.name}</span>
              <span className="font-display" style={{ fontWeight: 600, color: 'var(--text)' }}>{cityB.name}</span>
            </div>

            <CompareRow label="Temperature" valueA={dataA.weather && `${dataA.weather.current.temperature_2m}°C`} valueB={dataB.weather && `${dataB.weather.current.temperature_2m}°C`} />
            <CompareRow label="Feels Like" valueA={dataA.weather && `${dataA.weather.current.apparent_temperature}°C`} valueB={dataB.weather && `${dataB.weather.current.apparent_temperature}°C`} />
            <CompareRow label="Humidity" valueA={dataA.weather && `${dataA.weather.current.relative_humidity_2m}%`} valueB={dataB.weather && `${dataB.weather.current.relative_humidity_2m}%`} />
            <CompareRow label="Wind Speed" valueA={dataA.weather && `${dataA.weather.current.wind_speed_10m} km/h`} valueB={dataB.weather && `${dataB.weather.current.wind_speed_10m} km/h`} />
            <CompareRow label="Air Quality (PM2.5)" valueA={dataA.airQuality?.current?.pm2_5} valueB={dataB.airQuality?.current?.pm2_5} />
            <CompareRow label="Capital" valueA={dataA.country?.capital} valueB={dataB.country?.capital} />
            <CompareRow label="Population" valueA={dataA.country?.population?.toLocaleString()} valueB={dataB.country?.population?.toLocaleString()} />
            <CompareRow label="Currency" valueA={currencyCodeA && dataA.currency && `1 USD = ${dataA.currency.rates[currencyCodeA]} ${currencyCodeA}`} valueB={currencyCodeB && dataB.currency && `1 USD = ${dataB.currency.rates[currencyCodeB]} ${currencyCodeB}`} />
          </div>
        )}
      </main>
    </>
  );
}