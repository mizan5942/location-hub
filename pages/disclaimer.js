import Head from 'next/head';

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer — Locafacts</title>
        <meta name="description" content="Locafacts data disclaimer." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '24px' }}>Disclaimer</h1>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          The information provided on Locafacts, including weather, currency exchange rates, air quality
          data, emergency numbers, and country facts, is sourced from third-party public APIs and is provided
          for general informational purposes only.
        </p>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          We make no representations or warranties of any kind, express or implied, about the accuracy,
          reliability, or completeness of this information. In particular, emergency contact numbers should
          always be independently verified before relying on them in an actual emergency.
        </p>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8' }}>
          Any reliance you place on information from this site is strictly at your own risk.
        </p>
      </main>
    </>
  );
}