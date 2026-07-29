import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

export default function Header() {
  const [citiesOpen, setCitiesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const regions = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

  return (
    <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 24px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text)' }}>
            Locafacts
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>
            Home
          </Link>

          <div
            style={{ position: 'relative', paddingBottom: '16px', marginBottom: '-16px' }}
            onMouseEnter={() => setCitiesOpen(true)}
            onMouseLeave={() => setCitiesOpen(false)}
          >
            <span className="nav-link" style={{ color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer' }}>
              Cities ▾
            </span>
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
                    href={`/#${region.toLowerCase().replace(' ', '-')}`}
                    className="dropdown-item"
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontSize: '18px',
                    }}
                  >
                    {region}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/compare" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>
            Compare
          </Link>
          <Link href="/world-clock" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>
           World Clock
        </Link>
        <Link href="/quiz" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>
  Quiz
</Link>
<Link href="/countries" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>
  Countries
</Link>
<Link href="/about" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>
  About Us
</Link>
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
              fontSize: '18px',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}