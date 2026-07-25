import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Locafacts</title>
        <meta name="description" content="Get in touch with the Locafacts team." />
      </Head>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', marginBottom: '24px' }}>Contact Us</h1>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
          Have a question, spotted an error in the data, or want to suggest a city we should add? We'd love
          to hear from you.
        </p>
        <p style={{ color: '#c5cbd6', fontSize: '16px', lineHeight: '1.8' }}>
          Email us at: <a href="mailto:hello@locafacts.com" style={{ color: '#1F7A6C' }}>hello@locafacts.com</a>
        </p>
      </main>
    </>
  );
}