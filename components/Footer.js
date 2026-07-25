import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px', marginTop: '60px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>
          © {new Date().getFullYear()} Locafacts. All data provided as-is for informational purposes.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/contact" className="nav-link" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '13px' }}>
            Contact Us
          </Link>
          <Link href="/disclaimer" className="nav-link" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '13px' }}>
            Disclaimer
          </Link>
          <Link href="/terms" className="nav-link" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '13px' }}>
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy-policy" className="nav-link" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '13px' }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}