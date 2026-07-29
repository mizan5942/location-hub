import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import cities from '../../data/cities';
import countryData from '../../data/countryData';
import countryExtras from '../../data/countryExtras';
import { fetchWorldBankData } from '../../lib/worldBank';

function DataRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{label}</span>
      <span className="font-mono-data" style={{ color: 'var(--text)', fontSize: '14px' }}>{value ?? 'Unavailable'}</span>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
      <h3 className="font-display" style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

function Bar({ label, percent, color, sublabel }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{label}</span>
        <span className="font-mono-data" style={{ color: 'var(--text)', fontSize: '13px' }}>{sublabel}</span>
      </div>
      <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(percent, 100)}%`, backgroundColor: color, borderRadius: '4px' }} />
      </div>
    </div>
  );
}

export default function CountryPage({ code, info, extras, worldBank, countryCities }) {
  return (
    <>
      <Head>
        <title>{`${info.name} — Population, Stats & Facts | Locafacts`}</title>
        <meta
          name="description"
          content={`Population, life expectancy, currency, calling code, and key facts about ${info.name}.`}
        />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        <p className="font-mono-data" style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '13px', marginBottom: '8px' }}>
          {code}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <Image
            src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`}
            alt={`Flag of ${info.name}`}
            width={60}
            height={40}
            style={{ borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border)' }}
            priority
          />
          <h1 className="font-display" style={{ fontSize: '40px', color: 'var(--text)', margin: 0 }}>
            {info.name}
          </h1>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <DataRow label="Capital" value={info.capital} />
          <DataRow label="Currency" value={info.currency} />
          <DataRow label="Calling Code" value={info.callingCode} />
          <DataRow label="Languages" value={info.languages?.join(', ')} />
          <DataRow label="Driving Side" value={extras?.drivingSide} />
          <DataRow label="Voltage" value={extras?.voltage} />
        </div>

        <Card title="Population & Demographics" icon="👥">
          {worldBank.population && (
            <Bar
              label="Population (relative to world's most populous countries)"
              percent={(worldBank.population.value / 1450000000) * 100}
              color="var(--accent)"
              sublabel={worldBank.population.value.toLocaleString()}
            />
          )}
          <DataRow label="Population" value={worldBank.population && `${worldBank.population.value.toLocaleString()} (${worldBank.population.year})`} />
          <DataRow label="Population Density" value={worldBank.populationDensity && `${worldBank.populationDensity.value.toFixed(1)} people/km² (${worldBank.populationDensity.year})`} />
          <DataRow label="Life Expectancy" value={worldBank.lifeExpectancy && `${worldBank.lifeExpectancy.value.toFixed(1)} years (${worldBank.lifeExpectancy.year})`} />
          <DataRow label="Birth Rate" value={worldBank.birthRate && `${worldBank.birthRate.value.toFixed(1)} per 1,000 people (${worldBank.birthRate.year})`} />
          <DataRow label="Death Rate" value={worldBank.deathRate && `${worldBank.deathRate.value.toFixed(1)} per 1,000 people (${worldBank.deathRate.year})`} />

          {worldBank.birthRate && worldBank.deathRate && (
            <div style={{ marginTop: '16px' }}>
              <Bar label="Birth Rate" percent={(worldBank.birthRate.value / 50) * 100} color="#9FD8B8" sublabel={`${worldBank.birthRate.value.toFixed(1)}`} />
              <Bar label="Death Rate" percent={(worldBank.deathRate.value / 50) * 100} color="#B5544A" sublabel={`${worldBank.deathRate.value.toFixed(1)}`} />
            </div>
          )}
        </Card>

        <Card title="Land Use" icon="🌍">
          {worldBank.agriculturalLand && worldBank.forestLand && (
            <div style={{ display: 'flex', height: '24px', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ width: `${worldBank.agriculturalLand.value}%`, backgroundColor: '#F6D67A' }} title="Agricultural" />
              <div style={{ width: `${worldBank.forestLand.value}%`, backgroundColor: '#9FD8B8' }} title="Forest" />
              <div style={{ flex: 1, backgroundColor: 'var(--border)' }} title="Other" />
            </div>
          )}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#F6D67A', borderRadius: '2px', marginRight: '4px' }} />Agricultural</span>
            <span><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#9FD8B8', borderRadius: '2px', marginRight: '4px' }} />Forest</span>
            <span><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'var(--border)', borderRadius: '2px', marginRight: '4px' }} />Other</span>
          </div>
          <DataRow label="Agricultural Land" value={worldBank.agriculturalLand && `${worldBank.agriculturalLand.value.toFixed(1)}% (${worldBank.agriculturalLand.year})`} />
          <DataRow label="Forest Land" value={worldBank.forestLand && `${worldBank.forestLand.value.toFixed(1)}% (${worldBank.forestLand.year})`} />
        </Card>

        {countryCities.length > 0 && (
          <Card title={`Cities in ${info.name}`} icon="📍">
            {countryCities.map((city) => (
              <Link
                key={city.slug}
                href={`/location/${city.slug}`}
                style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid var(--border)', color: 'var(--accent)', textDecoration: 'none', fontSize: '14px' }}
              >
                {city.name} →
              </Link>
            ))}
          </Card>
        )}

        <Link href="/country-codes" style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}>
          ← Back to all country codes
        </Link>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(countryData).map((code) => ({ params: { code } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { code } = params;
  const info = countryData[code];
  const extras = countryExtras[code];
  const worldBank = await fetchWorldBankData(code);
  const countryCities = cities.filter((c) => c.countryCode === code);

  return {
    props: { code, info, extras, worldBank, countryCities },
    revalidate: 43200,
  };
}