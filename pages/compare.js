import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { toPng } from 'html-to-image';
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
const [copied, setCopied] = useState(false);
const resultCardRef = useRef(null);

  const cityA = cities.find((c) => c.slug === slugA);
  const cityB = cities.find((c) => c.slug === slugB);

  const handleShare = async () => {
    const url = `https://locafacts.com/compare?a=${slugA}&b=${slugB}`;
    const shareData = {
      title: `${cityA.name} vs ${cityB.name} — Locafacts`,
      text: `See how ${cityA.name} and ${cityB.name} compare on weather, currency, and air quality.`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled, ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    const dataUrl = await toPng(resultCardRef.current, { backgroundColor: '#101B2D' });
    const link = document.createElement('a');
    link.download = `${cityA.name}-vs-${cityB.name}-compare.png`;
    link.href = dataUrl;
    link.click();
  };

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
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '220px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '32px',
            border: '1px solid var(--border)',
          }}
        >
         <Image
            src="/images/compare-hero.jpg"
            alt="Comparing cities around the world"
            fill
            sizes="(max-width: 760px) 100vw, 760px"
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
              fontSize: '36px',
              color: '#fff',
              margin: 0,
            }}
          >
            Compare Cities
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '20px' }}>
  Pick two cities to compare their weather, currency, and air quality side by side.
</p>

<p className="body-text" style={{ marginBottom: '16px' }}>
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
  <div className="compare-selectors" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'end' }}>
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

    <span className="font-display vs-label" style={{ fontSize: '20px', color: 'var(--gold)', paddingBottom: '14px' }}>
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
  <>
  <div ref={resultCardRef} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
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

            <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>
              locafacts.com
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleShare}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {copied ? '✓ Link copied' : '↗ Share'}
            </button>
            <button
              onClick={handleDownload}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ⬇ Download Image
            </button>
          </div>
          </>
        )}
    </main>

      <style jsx>{`
        @media (max-width: 560px) {
          .compare-selectors {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .vs-label {
            padding-bottom: 0 !important;
            padding-top: 4px;
            padding-bottom: 4px !important;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}