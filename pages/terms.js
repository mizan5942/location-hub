import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions — Locafacts</title>
        <meta name="description" content="Terms and conditions for using Locafacts." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '24px' }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          By using Locafacts, you agree to the following terms. If you do not agree, please do not use this site.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Use of Data</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Data shown on Locafacts is sourced from third-party public APIs and is provided "as is," without
          warranty of accuracy, completeness, or timeliness. Do not rely on this data for critical decisions
          (e.g. emergency response, financial transactions) without independently verifying it.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Intellectual Property</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Original content, design, and branding on this site are the property of Locafacts. Data provided by
          third-party sources remains the property of those respective sources.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Changes to These Terms</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.8' }}>
          We may update these terms from time to time. Continued use of the site after changes constitutes
          acceptance of the new terms.
        </p>
      </main>
    </>
  );
}