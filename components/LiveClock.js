import { useState, useEffect } from 'react';

export default function LiveClock({ utcOffsetSeconds, cityName }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => {
      const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
      setNow(new Date(utcMs + utcOffsetSeconds * 1000));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [utcOffsetSeconds]);

  if (!now) return null;

  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
      <p className="font-mono-data" style={{ fontSize: '36px', fontWeight: 500, color: 'var(--accent)', marginBottom: '6px' }}>
        {timeStr}
      </p>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{dateStr}</p>
      <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>{cityName} local time</p>
    </div>
  );
}