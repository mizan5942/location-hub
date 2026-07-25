import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About — Locafacts</title>
        <meta name="description" content="Learn about Locafacts, a free live data resource covering weather, currency, air quality, and essential facts for cities worldwide." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '24px' }}>About Locafacts</h1>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Locafacts is a free resource that brings together live weather, currency exchange rates, air quality
          readings, and essential local facts for cities around the world. Each city page pulls data from
          public, real-time sources and refreshes automatically, so the information stays current without
          any manual upkeep.
        </p>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          The project started as a simple idea: instead of visiting five different websites to check a city's
          weather, currency, and basic facts before a trip or a call, why not have it all in one place? We built
          Locafacts to be fast, straightforward, and genuinely useful — no clutter, just the facts.
        </p>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8' }}>
          Locafacts is an independent project and is not affiliated with any government, tourism board, or
          data provider. Data is sourced from public APIs and is provided for general informational purposes.
        </p>
      </main>
    </>
  );
}