import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeContext';

export default function Header() {
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const regions = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

  const navLinkStyle = { color: 'var(--text-muted)', textDecoration: 'none', fontSize: '16px' };

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src="/images/logo-dark.png"
            alt="Locafacts"
            width={48}
            height={48}
            style={{ height: '36px', width: '36px' }}
            priority
          />
          <span className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text)' }}>
            Locafacts
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" className="nav-link" style={navLinkStyle}>Home</Link>

          <div
            style={{ position: 'relative', paddingBottom: '16px', marginBottom: '-16px' }}
            onMouseEnter={() => setCitiesOpen(true)}
            onMouseLeave={() => setCitiesOpen(false)}
          >
            <span className="nav-link" style={{ ...navLinkStyle, cursor: 'pointer' }}>Cities ▾</span>
            {citiesOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '8px 0',
                  minWidth: '160px',
                  zIndex: 10,
                }}
              >
                {regions.map((region) => (
                  <Link
                    key={region}
                    href={`/continent/${region.toLowerCase().replace(' ', '-')}`}
                    className="dropdown-item"
                    style={{ display: 'block', padding: '8px 16px', color: 'var(--text)', textDecoration: 'none', fontSize: '14px' }}
                  >
                    {region}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/compare" className="nav-link" style={navLinkStyle}>Compare</Link>
          <Link href="/world-clock" className="nav-link" style={navLinkStyle}>World Clock</Link>
          <Link href="/quiz" className="nav-link" style={navLinkStyle}>Quiz</Link>
          <Link href="/countries" className="nav-link" style={navLinkStyle}>Countries</Link>
          <Link href="/about" className="nav-link" style={navLinkStyle}>About Us</Link>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '6px 10px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>

        {/* MOBILE: theme toggle + hamburger */}
        <div className="mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '6px 10px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '8px 10px',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            maxWidth: '1100px',
            margin: '16px auto 0',
            padding: '16px 0 8px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Link href="/" className="nav-link" style={{ ...navLinkStyle, padding: '10px 8px' }} onClick={() => setMobileOpen(false)}>Home</Link>

          <p style={{ padding: '10px 8px 4px', fontSize: '12px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Cities</p>
          {regions.map((region) => (
            <Link
              key={region}
              href={`/continent/${region.toLowerCase().replace(' ', '-')}`}
              className="nav-link"
              style={{ ...navLinkStyle, padding: '8px 20px', fontSize: '15px' }}
              onClick={() => setMobileOpen(false)}
            >
              {region}
            </Link>
          ))}

          <Link href="/compare" className="nav-link" style={{ ...navLinkStyle, padding: '10px 8px' }} onClick={() => setMobileOpen(false)}>Compare</Link>
          <Link href="/world-clock" className="nav-link" style={{ ...navLinkStyle, padding: '10px 8px' }} onClick={() => setMobileOpen(false)}>World Clock</Link>
          <Link href="/quiz" className="nav-link" style={{ ...navLinkStyle, padding: '10px 8px' }} onClick={() => setMobileOpen(false)}>Quiz</Link>
          <Link href="/countries" className="nav-link" style={{ ...navLinkStyle, padding: '10px 8px' }} onClick={() => setMobileOpen(false)}>Countries</Link>
          <Link href="/about" className="nav-link" style={{ ...navLinkStyle, padding: '10px 8px' }} onClick={() => setMobileOpen(false)}>About Us</Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-controls {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}