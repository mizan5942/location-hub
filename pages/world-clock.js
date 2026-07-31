import { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { List } from 'react-window';
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

function Row({ index, style, flatRows }) {
  const row = flatRows[index];
  if (!row) return null;

  if (row.type === 'header') {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        <h2 className="font-display" style={{ fontSize: '18px', color: 'var(--text)', margin: 0 }}>
          {row.continent}
        </h2>
      </div>
    );
  }

  return (
    <div style={{ ...style, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '4px' }}>
      {row.cities.map((city, i) =>
        city ? (
          <WorldClockRow key={city.slug} city={city} utcOffsetSeconds={city.utcOffsetSeconds} />
        ) : (
          <div key={`empty-${i}`} />
        )
      )}
    </div>
  );
}

export default function WorldClock({ citiesWithOffsets }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => citiesWithOffsets.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search, citiesWithOffsets]
  );

  const flatRows = useMemo(() => {
    const grouped = {};
    continentOrder.forEach((c) => (grouped[c] = []));
    filtered.forEach((city) => {
      if (!grouped[city.continent]) grouped[city.continent] = [];
      grouped[city.continent].push(city);
    });

    const rows = [];
    continentOrder.forEach((continent) => {
      const list = grouped[continent];
      if (!list || list.length === 0) return;
      rows.push({ type: 'header', continent });
      for (let i = 0; i < list.length; i += 2) {
        rows.push({ type: 'city-pair', cities: [list[i], list[i + 1] || null] });
      }
    });
    return rows;
  }, [filtered]);

  return (
    <>
      <Head>
        <title>World Clock — Locafacts</title>
        <meta name="description" content="Current local time in cities around the world, updated live." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is a world clock used for?',
                  acceptedAnswer: { '@type': 'Answer', text: 'A world clock shows the current local time in multiple cities at once, which helps with scheduling calls across time zones, checking if a business is open, and planning travel.' },
                },
                {
                  '@type': 'Question',
                  name: 'How often is the time updated?',
                  acceptedAnswer: { '@type': 'Answer', text: 'The clocks on this page tick live in your browser, updating every second based on each city\'s UTC offset.' },
                },
                {
                  '@type': 'Question',
                  name: 'Does this account for daylight saving time?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Yes. The underlying time zone data is refreshed regularly, so seasonal daylight saving shifts are reflected in each city\'s displayed time.' },
                },
                {
                  '@type': 'Question',
                  name: 'How many cities does Locafacts cover?',
                  acceptedAnswer: { '@type': 'Answer', text: `Locafacts currently tracks live time, weather, and facts for ${cities.length} cities across six continents, with more being added over time.` },
                },
              ],
            }),
          }}
        />
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
            src="/images/world-clock-hero.jpg"
            alt="World clock showing time zones around the globe"
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
              fontSize: '36px',
              color: '#fff',
              margin: 0,
            }}
          >
            World Clock
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
          Current local time in cities around the world, ticking live.
        </p>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            A world clock is one of the simplest tools for dealing with the fact that the planet runs on more than twenty different time zones at once. Instead of doing mental math or searching for each city individually, this page lists the current local time for every city Locafacts covers, grouped by continent and updated in real time as you watch it.
          </p>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            Time zones exist because the earth rotates, and each region sets its clocks to roughly match when the sun is overhead at midday. Most countries also observe a fixed offset from UTC, though some shift that offset twice a year for daylight saving time. That single detail is often the reason a meeting invite ends up an hour off from what someone expected, especially when one side of the call has recently changed their clocks and the other has not.
          </p>
          <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
            This is genuinely useful for scheduling a call across continents, figuring out whether a shop or office is likely open before you try contacting them, or just satisfying curiosity about what time it is right now in a city you are thinking about visiting. Search for a specific city above, or scroll through the continent groupings to see how time differs across a whole region at a glance.
          </p>
        </div>

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

        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: '2px',
            backgroundColor: 'var(--bg-card)',
            marginBottom: '40px',
            overflow: 'hidden',
            padding: '0 20px',
          }}
        >
          <List
  rowComponent={Row}
  rowCount={flatRows.length}
  rowHeight={90}
  rowProps={{ flatRows }}
  style={{ height: 800, width: '100%', paddingTop: '10px', paddingbottom:'10px', }}
/>
        </div>

        <section style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
          <h2 className="font-display" style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text)' }}>
            Frequently Asked Questions
          </h2>
          {[
            {
              q: 'What is a world clock used for?',
              a: 'A world clock shows the current local time in multiple cities at once, which helps with scheduling calls across time zones, checking if a business is open, and planning travel.',
            },
            {
              q: 'How often is the time updated?',
              a: 'The clocks on this page tick live in your browser, updating every second based on each city\'s UTC offset.',
            },
            {
              q: 'Does this account for daylight saving time?',
              a: 'Yes. The underlying time zone data is refreshed regularly, so seasonal daylight saving shifts are reflected in each city\'s displayed time.',
            },
            {
              q: 'How many cities does Locafacts cover?',
              a: `Locafacts currently tracks live time, weather, and facts for ${cities.length} cities across six continents, with more being added over time.`,
            },
          ].map((faq, i) => (
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