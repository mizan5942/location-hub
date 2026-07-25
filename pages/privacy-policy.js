import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Locafacts</title>
        <meta name="description" content="Locafacts Privacy Policy — how we handle cookies and data, including Google AdSense." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ color: '#c5cbd6', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Locafacts ("we", "us") respects your privacy. This policy explains what information is collected
          when you visit locafacts.com and how it is used.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Cookies and Advertising</h2>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Locafacts uses or may use Google AdSense to display advertising. Google and its partners use
          cookies to serve ads based on your prior visits to this and other websites. You can opt out of
          personalized advertising by visiting Google's Ads Settings at{' '}
          <a href="https://adssettings.google.com" style={{ color: '#1F7A6C' }}>adssettings.google.com</a>.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Data We Collect</h2>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          We do not collect personal information directly through this site beyond standard, non-identifying
          analytics (such as page views) and cookies placed by third-party advertising partners like Google.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Third-Party Data Sources</h2>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Weather, currency, air quality, and country data displayed on this site are sourced from public
          third-party APIs and are provided for informational purposes only.
        </p>
        <h2 className="font-display" style={{ fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>Contact</h2>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8' }}>
          Questions about this policy can be sent to hello@locafacts.com.
        </p>
      </main>
    </>
  );
}