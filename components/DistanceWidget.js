import { useState } from 'react';
import cities from '../data/cities';
import { haversineDistanceKm, estimateFlightTime } from '../lib/distance';

export default function DistanceWidget({ currentCity }) {
  const [targetSlug, setTargetSlug] = useState('');

  const otherCities = cities.filter((c) => c.slug !== currentCity.slug);
  const target = otherCities.find((c) => c.slug === targetSlug);

  let distanceKm = null;
  let flightTime = null;

  if (target) {
    distanceKm = haversineDistanceKm(
      currentCity.latitude,
      currentCity.longitude,
      target.latitude,
      target.longitude
    );
    flightTime = estimateFlightTime(distanceKm);
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
      <h3 className="font-display" style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>✈️</span> Distance & Flight Time
      </h3>

      <select
        value={targetSlug}
        onChange={(e) => setTargetSlug(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
          fontSize: '14px',
          marginBottom: '16px',
        }}
      >
        <option value="">Select a city to compare...</option>
        {otherCities.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      {target && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Distance from {currentCity.name}</span>
            <span className="font-mono-data" style={{ color: 'var(--text)', fontSize: '14px' }}>
              {distanceKm.toFixed(0)} km ({(distanceKm * 0.621371).toFixed(0)} mi)
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Estimated Flight Time</span>
            <span className="font-mono-data" style={{ color: 'var(--text)', fontSize: '14px' }}>
              {flightTime.hours}h {flightTime.minutes}m
            </span>
          </div>
        </div>
      )}
    </div>
  );
}