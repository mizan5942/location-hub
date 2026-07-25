import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WorldClockRow({ city, utcOffsetSeconds }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    if (utcOffsetSeconds == null) return;
    const update = () => {
      const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
      setNow(new Date(utcMs + utcOffsetSeconds * 1000));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [utcOffsetSeconds]);

  const timeStr = now ? now.toLocaleTimeString('en-US', { hour12: false }) : '--:--:--';
  const dateStr = now ? now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '';

  return (
    <Link
      href={`/location/${city.slug}`}
      className="clock-row"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        textDecoration: 'none',
        color: 'var(--text)',
      }}
    >
      <div>
        <p className="font-display" style={{ fontSize: '16px', fontWeight: 600 }}>{city.name}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{dateStr}</p>
      </div>
      <p className="font-mono-data" style={{ fontSize: '22px', color: 'var(--accent)' }}>{timeStr}</p>
    </Link>
  );
}