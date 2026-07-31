import Link from 'next/link';

const linkStyle = {
  color: 'var(--text-dim)',
  textDecoration: 'none',
  fontSize: '16px',
};

const headingStyle = {
  fontSize: '16px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '14px',
};

const continents = [
  { name: 'Asia', slug: 'asia' },
  { name: 'Europe', slug: 'europe' },
  { name: 'Africa', slug: 'africa' },
  { name: 'North America', slug: 'north-america' },
  { name: 'South America', slug: 'south-america' },
  { name: 'Oceania', slug: 'oceania' },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 24px 32px', marginTop: '60px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: '32px',
            marginBottom: '36px',
          }}
        >
          {/* BLOCK 1: Logo + text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              {/* Logo placeholder — swap src once logo is ready */}
              {/* <Image src="/images/logo.png" alt="Locafacts" width={32} height={32} /> */}
              <span
                className="font-display"
                style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}
              >
                Locafacts
              </span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px', lineHeight: '1.7', maxWidth: '280px' }}>
              Live weather, currency, air quality, and essential facts for cities and countries around the world.
            </p>
          </div>

          {/* BLOCK 2: All continents */}
          <div>
            <p style={headingStyle}>Continents</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {continents.map((c) => (
                <Link key={c.slug} href={`/continent/${c.slug}`} className="nav-link" style={linkStyle}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* BLOCK 3: Useful pages */}
          <div>
            <p style={headingStyle}>Useful Pages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/countries" className="nav-link" style={linkStyle}>Countries</Link>
              <Link href="/country-codes" className="nav-link" style={linkStyle}>Country Codes</Link>
              <Link href="/compare" className="nav-link" style={linkStyle}>Compare Cities</Link>
              <Link href="/world-clock" className="nav-link" style={linkStyle}>World Clock</Link>
              <Link href="/quiz" className="nav-link" style={linkStyle}>World Facts Quiz</Link>
            </div>
          </div>

          {/* BLOCK 4: Help / policy pages */}
          <div>
            <p style={headingStyle}>Help</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/about" className="nav-link" style={linkStyle}>About Us</Link>
              <Link href="/contact" className="nav-link" style={linkStyle}>Contact Us</Link>
              <Link href="/terms" className="nav-link" style={linkStyle}>Terms &amp; Conditions</Link>
              <Link href="/privacy-policy" className="nav-link" style={linkStyle}>Privacy Policy</Link>
              <Link href="/disclaimer" className="nav-link" style={linkStyle}>Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright only */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-dim)', fontSize: '16px' }}>
            © {new Date().getFullYear()} Locafacts. All data provided as-is for informational purposes.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 780px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}