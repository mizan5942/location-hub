export default function HighlightTile({ icon, label, value, sub, color }) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '12px',
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        color: '#101B2D',
      }}
    >
      <div style={{ fontSize: '28px' }}>{icon}</div>
      <div>
        <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{label}</p>
        <p className="font-mono-data" style={{ fontSize: '13px' }}>{value}</p>
        {sub && <p style={{ fontSize: '11px', opacity: 0.8 }}>{sub}</p>}
      </div>
    </div>
  );
}