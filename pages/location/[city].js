import Head from 'next/head';
import cities from '../../data/cities';
import LiveClock from '../../components/LiveClock';
import HighlightTile from '../../components/HighlightTile';
import countryExtras from '../../data/countryExtras';

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

function dayLength(sunrise, sunset) {
  if (!sunrise || !sunset) return null;
  const diffMs = new Date(sunset) - new Date(sunrise);
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.round((diffMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

export default function CityPage({ cityInfo, weather, currency, airQuality, country, attractions, emergency, cityImage }) {
  const currencyCode = country?.currencies?.[0]?.code;
  const sunrise = weather?.daily?.sunrise?.[0];
  const sunset = weather?.daily?.sunset?.[0];
  const extras = countryExtras[cityInfo.countryCode];

  return (
    <>
      <Head>
        <title>{cityInfo.name} — Live Weather, Currency & Facts | Locafacts</title>
        <meta
          name="description"
          content={`Live weather, currency exchange rates, air quality, and essential facts for ${cityInfo.name}. Updated automatically.`}
        />
      </Head>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px' }}>
        {cityImage?.thumbnail?.source && (
          <img
            src={cityImage.originalimage?.source || cityImage.thumbnail.source}
            alt={cityInfo.name}
            style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '14px', marginBottom: '24px' }}
          />
        )}

        <p className="font-mono-data" style={{ color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '13px', marginBottom: '8px' }}>
          {cityInfo.latitude.toFixed(2)}°N, {cityInfo.longitude.toFixed(2)}°E
        </p>
        <h1 className="font-display" style={{ fontSize: '40px', marginBottom: '32px', color: 'var(--text)' }}>
          {cityInfo.name}
        </h1>

        {/* CLOCK + QUICK FACTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {weather && <LiveClock utcOffsetSeconds={weather.utc_offset_seconds} cityName={cityInfo.name} />}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <DataRow label="Country" value={country?.name?.common || country?.name} />
            <DataRow label="Capital" value={country?.capital} />
            <DataRow label="Currency" value={country && `${country.currencies?.[0]?.name} (${currencyCode})`} />
            <DataRow label="Languages" value={country?.languages?.map((l) => l.name).join(', ')} />
            <DataRow label="Calling Code" value={country && `+${country.callingCodes?.[0]}`} />
          </div>
        </div>

        {/* HIGHLIGHT TILES — 2 column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <HighlightTile icon="🕐" label="Time Zone" value={weather?.timezone} color="#9FD8B8" />
          <HighlightTile icon="🌅" label="Sunrise" value={sunrise?.slice(11)} color="#F6D67A" />
          <HighlightTile icon="🌇" label="Sunset" value={sunset?.slice(11)} color="#F0A868" />
          <HighlightTile icon="☀️" label="Day Length" value={dayLength(sunrise, sunset)} color="#EAD9F7" />
          <HighlightTile icon="🌡️" label="Temperature" value={weather && `${weather.current.temperature_2m}°C`} sub={weather && `Feels ${weather.current.apparent_temperature}°C`} color="#8FCBE0" />
          <HighlightTile icon="🌬️" label="Air Quality" value={airQuality && `PM2.5: ${airQuality.current.pm2_5}`} color="#B7D89A" />
        </div>

        <Card title="Weather Details" icon="🌦️">
          <DataRow label="Humidity" value={weather && `${weather.current.relative_humidity_2m}%`} />
          <DataRow label="Wind Speed" value={weather && `${weather.current.wind_speed_10m} km/h`} />
          <DataRow label="Precipitation" value={weather && `${weather.current.precipitation} mm`} />
          <DataRow label="UV Index" value={weather && weather.current.uv_index} />
        </Card>

        <Card title="Air Quality Details" icon="🌬️">
          <DataRow label="PM2.5" value={airQuality && airQuality.current.pm2_5} />
          <DataRow label="PM10" value={airQuality && airQuality.current.pm10} />
          <DataRow label="Ozone" value={airQuality && airQuality.current.ozone} />
          <DataRow label="Carbon Monoxide" value={airQuality && airQuality.current.carbon_monoxide} />
        </Card>

        <Card title="Currency" icon="💱">
          <DataRow label={`1 USD in ${currencyCode || 'local currency'}`} value={currency && currencyCode && currency.rates[currencyCode]} />
          <DataRow label="1 USD in EUR" value={currency && currency.rates.EUR} />
          <DataRow label="1 USD in GBP" value={currency && currency.rates.GBP} />
        </Card>

        <Card title="Country Info" icon="🌍">
          <DataRow label="Region" value={country && country.region} />
          <DataRow label="Subregion" value={country && country.subregion} />
          <DataRow label="Population" value={country && country.population?.toLocaleString()} />
          <DataRow label="Area" value={country && `${country.area?.toLocaleString()} km²`} />
          <DataRow label="Currency Symbol" value={country && country.currencies?.[0]?.symbol} />
          <DataRow label="Demonym" value={country && country.demonym} />
          <DataRow label="Neighboring Countries" value={country && country.borders?.join(', ')} />
          <DataRow label="Flag" value={country && country.flag} />
        </Card>

        <Card title="Emergency Numbers" icon="🚨">
          <DataRow label="Police" value={emergency && emergency.data.police.all[0]} />
          <DataRow label="Ambulance" value={emergency && emergency.data.ambulance.all[0]} />
          <DataRow label="Fire" value={emergency && emergency.data.fire.all[0]} />
        </Card>
        <Card title="Travel Essentials" icon="🔌">
          <DataRow label="Voltage" value={extras?.voltage} />
          <DataRow label="Plug Types" value={extras?.plugTypes} />
          <DataRow label="Frequency" value={extras?.frequency} />
          <DataRow label="Nearest Major Airport" value={extras?.airport} />
        </Card>

        <Card title="Nearby Points of Interest" icon="📍">
          <iframe
            title="City map"
            width="100%"
            height="260"
            style={{ border: 0, borderRadius: '8px' }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${cityInfo.longitude - 0.08}%2C${cityInfo.latitude - 0.08}%2C${cityInfo.longitude + 0.08}%2C${cityInfo.latitude + 0.08}&marker=${cityInfo.latitude}%2C${cityInfo.longitude}`}
          />
          <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '6px 0 16px' }}>
            <a href={`https://www.openstreetmap.org/fixthemap?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&zoom=15`} style={{ color: 'var(--text-dim)' }}>Report a problem</a>
            {' | © '}
            <a href="https://www.openstreetmap.org/copyright" style={{ color: 'var(--text-dim)' }}>OpenStreetMap contributors</a>
          </p>
          {attractions?.query?.geosearch?.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text)', fontSize: '14px', lineHeight: '1.8' }}>
              {attractions.query.geosearch.map((place) => (
                <li key={place.pageid}>
                  {place.title}{' '}
                  <span className="font-mono-data" style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                    ({(place.dist / 1000).toFixed(1)} km away)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Unavailable</p>
          )}
        </Card>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = cities.map((city) => ({
    params: { city: city.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function getStaticProps({ params }) {
  const cityInfo = cities.find((c) => c.slug === params.city);

  const weather = await safeFetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,uv_index&daily=sunrise,sunset&timezone=auto`
  );

  const currency = await safeFetch('https://open.er-api.com/v6/latest/USD');

  const airQuality = await safeFetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&current=pm2_5,pm10,ozone,carbon_monoxide`
  );

  const country = await safeFetch(`https://countries.dev/alpha/${cityInfo.countryCode}`);

  const attractions = await safeFetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${cityInfo.latitude}|${cityInfo.longitude}&gsradius=10000&gslimit=5&format=json&origin=*`
  );

  const emergency = await safeFetch(`https://emergencynumberapi.com/api/country/${cityInfo.countryCode}`);

  const cityImage = await safeFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityInfo.name)}`
  );

  return {
    props: { cityInfo, weather, currency, airQuality, country, attractions, emergency, cityImage },
    revalidate: 43200,
  };
}