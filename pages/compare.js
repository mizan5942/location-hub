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
const [insight, setInsight] = useState(null);
const [insightLoading, setInsightLoading] = useState(false);

  const cityA = cities.find((c) => c.slug === slugA);
  const cityB = cities.find((c) => c.slug === slugB);

  const handleCompare = async () => {
  if (!cityA || !cityB) return;
  setLoading(true);
  setInsight(null);
  const [resultA, resultB] = await Promise.all([fetchCityData(cityA), fetchCityData(cityB)]);
  setDataA(resultA);
  setDataB(resultB);
  setLoading(false);

  setInsightLoading(true);
  try {
    const res = await fetch('/api/compare-insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityA: cityA.name, cityB: cityB.name }),
    });
    const data = await res.json();
    if (data.insight) setInsight(data.insight);
  } catch (err) {
    // fail silently, insight is a bonus, not critical
  }
  setInsightLoading(false);
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
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '20px' }}>
  Pick two cities to compare their weather, currency, and air quality side by side.
</p>

<p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
  Comparing two cities side by side is one of the fastest ways to plan a trip or understand how different daily life looks around the world. Temperature and air quality numbers alone can tell you whether to pack a jacket or plan indoor activities, while currency and exchange rate differences affect everything from hotel budgets to how far your money stretches on food and transport. This tool pulls live data for both cities at once, so the numbers you see reflect current conditions rather than seasonal averages or outdated estimates. Whether you are choosing between two travel destinations, relocating for work, or simply curious how Tokyo compares to Paris on a random Tuesday, this page gives you a quick, side by side answer.
</p>

        <div
  style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '32px',
  }}
>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'end' }}>
    <div>
      <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>City A</label>
      <select
        value={slugA}
        onChange={(e) => setSlugA(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '10px',
          border: '2px solid var(--border)',
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
          fontSize: '15px',
          cursor: 'pointer',
          transition: 'border-color 0.15s ease',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      >
        <option value="">Select a city</option>
        {cities.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
    </div>

    <span className="font-display" style={{ fontSize: '20px', color: 'var(--gold)', paddingBottom: '14px' }}>
      vs
    </span>

    <div>
      <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>City B</label>
      <select
        value={slugB}
        onChange={(e) => setSlugB(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '10px',
          border: '2px solid var(--border)',
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
          fontSize: '15px',
          cursor: 'pointer',
          transition: 'border-color 0.15s ease',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      >
        <option value="">Select a city</option>
        {cities.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
    </div>
  </div>

  <button
    onClick={handleCompare}
    disabled={!cityA || !cityB || loading}
    style={{
      width: '100%',
      marginTop: '20px',
      padding: '14px 20px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: 'var(--accent)',
      color: '#fff',
      cursor: cityA && cityB ? 'pointer' : 'not-allowed',
      opacity: cityA && cityB ? 1 : 0.5,
      fontSize: '15px',
      fontWeight: 600,
      transition: 'transform 0.1s ease',
    }}
    onMouseDown={(e) => cityA && cityB && (e.target.style.transform = 'scale(0.98)')}
    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
  >
    {loading ? 'Comparing...' : 'Compare Cities →'}
  </button>
</div>

        {(insightLoading || insight) && (
  <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
    <p style={{ fontSize: '12px', color: 'var(--gold)', marginBottom: '8px' }}>✨ AI Comparison</p>
    {insightLoading && <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading...</p>}
    {insight && <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.7' }}>{insight}</p>}
  </div>
)}

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