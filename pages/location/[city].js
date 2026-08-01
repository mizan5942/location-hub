import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import cities from '../../data/cities';
import LiveClock from '../../components/LiveClock';
import HighlightTile from '../../components/HighlightTile';
import countryExtras from '../../data/countryExtras';
import DistanceWidget from '../../components/DistanceWidget';
import Image from 'next/image';
import DiscoverMore from '../../components/DiscoverMore';
import cityIntros from '../../data/cityIntros.json';
import { autoLinkText } from '../../lib/autoLink';
import { canonicalUrl } from '../../lib/seo';


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

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diffMs = target - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function renderIntro(text, excludeCityCode, excludeCountryCode) {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((para, i) => {
    const segments = autoLinkText(para, { excludeCityCode, excludeCountryCode });
    return (
      <p key={i} style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '16px' }}>
        {segments.map((seg, j) =>
          seg.linked ? (
            <Link key={j} href={seg.href} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              {seg.text}
            </Link>
          ) : (
            <span key={j}>{seg.text}</span>
          )
        )}
      </p>
    );
  });
}

function generateFAQs({ cityInfo, weather, currency, country, extras, emergency }) {
  const currencyCode = country?.currencies?.[0]?.code;
  const faqs = [];

  if (weather) {
    faqs.push({
      q: `What is the current temperature in ${cityInfo.name}?`,
      a: `As of the latest update, the temperature in ${cityInfo.name} is ${weather.current.temperature_2m}°C, and it feels like ${weather.current.apparent_temperature}°C.`,
    });
    faqs.push({
      q: `What time zone is ${cityInfo.name} in?`,
      a: `${cityInfo.name} is in the ${weather.timezone} time zone.`,
    });
  }

  if (currency && currencyCode) {
    faqs.push({
      q: `What currency is used in ${cityInfo.name}?`,
      a: `${cityInfo.name} uses the ${country.currencies[0].name} (${currencyCode}). Currently, 1 USD equals approximately ${currency.rates[currencyCode]} ${currencyCode}.`,
    });
  }

  if (extras) {
    faqs.push({
      q: `What voltage and plug type does ${cityInfo.name} use?`,
      a: `${cityInfo.name} uses ${extras.voltage} at ${extras.frequency}, with plug type(s) ${extras.plugTypes}. Travelers from countries with different standards may need an adapter or converter.`,
    });
    faqs.push({
      q: `What is the nearest major airport to ${cityInfo.name}?`,
      a: `The nearest major airport is ${extras.airport}.`,
    });
  }

  if (emergency) {
    faqs.push({
      q: `What is the emergency number in ${cityInfo.name}?`,
      a: `Police: ${emergency.data.police.all[0]}, Ambulance: ${emergency.data.ambulance.all[0]}, Fire: ${emergency.data.fire.all[0]}.`,
    });
  }

  if (country) {
    faqs.push({
      q: `What languages are spoken in ${cityInfo.name}?`,
      a: `The main language(s) spoken are ${country.languages?.map((l) => l.name).join(', ')}.`,
    });
  }

  return faqs;
}

export default function CityPage({ cityInfo, weather, currency, airQuality, country, attractions, emergency, holidays, cityImage }) {
  const currencyCode = country?.currencies?.[0]?.code;
  const sunrise = weather?.daily?.sunrise?.[0];
  const sunset = weather?.daily?.sunset?.[0];
  const extras = countryExtras[cityInfo.countryCode];

  const [copied, setCopied] = useState(false);
  const shareCardRef = useRef(null);

  const handleShare = async () => {
    const url = `https://locafacts.com/location/${cityInfo.slug}`;
    const shareData = {
      title: `${cityInfo.name} — Locafacts`,
      text: weather
        ? `${cityInfo.name} right now: ${weather.current.temperature_2m}°C. Check live weather, currency, and facts on Locafacts.`
        : `Live weather, currency, and facts for ${cityInfo.name} on Locafacts.`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled, ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadImage = async () => {
    if (!shareCardRef.current) return;
    const dataUrl = await toPng(shareCardRef.current, { backgroundColor: '#101B2D' });
    const link = document.createElement('a');
    link.download = `${cityInfo.slug}-facts.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleDownloadText = () => {
    const lines = [
      `${cityInfo.name} — Quick Facts (via Locafacts)`,
      '',
      weather ? `Temperature: ${weather.current.temperature_2m}°C (feels like ${weather.current.apparent_temperature}°C)` : null,
      weather ? `Humidity: ${weather.current.relative_humidity_2m}%` : null,
      weather ? `Wind Speed: ${weather.current.wind_speed_10m} km/h` : null,
      weather ? `Time Zone: ${weather.timezone}` : null,
      airQuality ? `Air Quality (PM2.5): ${airQuality.current.pm2_5}` : null,
      country ? `Country: ${country.name?.common || country.name}` : null,
      country ? `Capital: ${country.capital}` : null,
      country && currencyCode ? `Currency: ${country.currencies?.[0]?.name} (${currencyCode})` : null,
      country?.languages ? `Languages: ${country.languages.map((l) => l.name).join(', ')}` : null,
      country ? `Calling Code: +${country.callingCodes?.[0]}` : null,
      extras ? `Voltage: ${extras.voltage} (${extras.frequency}), Plug Types: ${extras.plugTypes}` : null,
      extras ? `Driving Side: ${extras.drivingSide}` : null,
      extras ? `Nearest Major Airport: ${extras.airport}` : null,
      emergency ? `Emergency — Police: ${emergency.data.police.all[0]}, Ambulance: ${emergency.data.ambulance.all[0]}, Fire: ${emergency.data.fire.all[0]}` : null,
      '',
      `Source: locafacts.com/location/${cityInfo.slug}`,
    ].filter(Boolean).join('\n');

    const blob = new Blob([lines], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cityInfo.slug}-facts.txt`;
    link.click();
  };

  const shareButtonStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text)',
    fontSize: '13px',
    cursor: 'pointer',
  };

  return (
    <>
      <Head>
        <title>{`${cityInfo.name} — Live Weather, Currency & Facts | Locafacts`}</title>
        <link rel="canonical" href={canonicalUrl(`/location/${cityInfo.slug}`)} />
        {(() => {
          const faqs = generateFAQs({ cityInfo, weather, currency, country, extras, emergency });
          if (faqs.length === 0) return null;
          const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          };
          return (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          );
        })()}
      </Head>

      <main className="city-page-container" style={{ margin: '0 auto', padding: '60px 24px' }}>
        {cityImage?.thumbnail?.source && (
          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '14px', overflow: 'hidden', marginBottom: '24px' }}>
            <Image
              src={cityImage.originalimage?.source || cityImage.thumbnail.source}
              alt={cityInfo.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </div>
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
          <div ref={shareCardRef} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <p className="font-display" style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '12px' }}>
              {cityInfo.name}
            </p>
            <DataRow label="Temperature" value={weather && `${weather.current.temperature_2m}°C (feels ${weather.current.apparent_temperature}°C)`} />
            <DataRow label="Country" value={country?.name?.common || country?.name} />
            <DataRow label="Capital" value={country?.capital} />
            <DataRow label="Currency" value={country && `${country.currencies?.[0]?.name} (${currencyCode})`} />
            <DataRow label="Languages" value={country?.languages?.map((l) => l.name).join(', ')} />
            <DataRow label="Calling Code" value={country && `+${country.callingCodes?.[0]}`} />
            <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>
              locafacts.com/location/{cityInfo.slug}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleShare} style={shareButtonStyle}>
              {copied ? '✓ Copied' : '↗ Share'}
            </button>
            <button onClick={handleDownloadImage} style={shareButtonStyle}>
              ⬇ Image
            </button>
            <button onClick={handleDownloadText} style={shareButtonStyle}>
              ⬇ Save (.txt)
            </button>
          </div>

          <DiscoverMore cityName={cityInfo.name} citySlug={cityInfo.slug} />
        </div>

        {cityIntros[cityInfo.slug] && (
          <div style={{ marginBottom: '32px' }}>
            {renderIntro(cityIntros[cityInfo.slug], cityInfo.slug, cityInfo.countryCode)}
          </div>
        )}

        {/* HIGHLIGHT TILES — 2 column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <HighlightTile icon="🕐" label="Time Zone" value={weather?.timezone} color="#9FD8B8" />
          <HighlightTile icon="🌅" label="Sunrise" value={sunrise?.slice(11)} color="#F6D67A" />
          <HighlightTile icon="🌇" label="Sunset" value={sunset?.slice(11)} color="#F0A868" />
          <HighlightTile icon="☀️" label="Day Length" value={dayLength(sunrise, sunset)} color="#EAD9F7" />
          <HighlightTile icon="🌡️" label="Temperature" value={weather && `${weather.current.temperature_2m}°C`} sub={weather && `Feels ${weather.current.apparent_temperature}°C`} color="#8FCBE0" />
          <HighlightTile icon="🌬️" label="Air Quality" value={airQuality && `PM2.5: ${airQuality.current.pm2_5}`} color="#B7D89A" />
        </div>

        <div className="card-grid">
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
            <Link
              href="/country-codes"
              className="nav-link"
              style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}
            >
              View calling code & ISO code →
            </Link>
          </Card>

          <Card title="Emergency Numbers" icon="🚨">
            <DataRow label="Police" value={emergency && emergency.data.police.all[0]} />
            <DataRow label="Ambulance" value={emergency && emergency.data.ambulance.all[0]} />
            <DataRow label="Fire" value={emergency && emergency.data.fire.all[0]} />
          </Card>

          <Card title="Travel Essentials" icon="🔌">
            <DataRow label="Voltage" value={extras?.voltage} />
            <DataRow label="Driving Side" value={extras?.drivingSide} />
            <DataRow label="Plug Types" value={extras?.plugTypes} />
            <DataRow label="Frequency" value={extras?.frequency} />
            <DataRow label="Nearest Major Airport" value={extras?.airport} />
          </Card>
        </div>

        <DistanceWidget currentCity={cityInfo} />

        {holidays && holidays.length > 0 && (
          <Card title="Upcoming Public Holidays" icon="🎉">
            {holidays.slice(0, 3).map((holiday) => (
              <DataRow
                key={holiday.date}
                label={holiday.localName}
                value={`${holiday.date} (${daysUntil(holiday.date)} days)`}
              />
            ))}
          </Card>
        )}

        <Card title="Nearby Points of Interest" icon="📍">
          <iframe
            title="City map"
            width="100%"
            height="260"
            loading="lazy"
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

        {(() => {
          const faqs = generateFAQs({ cityInfo, weather, currency, country, extras, emergency });
          if (faqs.length === 0) return null;
          return (
            <Card title={`Frequently Asked Questions about ${cityInfo.name}`} icon="❓">
              {faqs.map((faq, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '14px', marginBottom: '4px' }}>
                    {faq.q}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </Card>
          );
        })()}
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

  const holidays = await safeFetch(`https://date.nager.at/api/v3/NextPublicHolidays/${cityInfo.countryCode}`);

  const cityImage = await safeFetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityInfo.name)}`
  );

  return {
    props: { cityInfo, weather, currency, airQuality, country, attractions, emergency, holidays, cityImage },
    revalidate: 43200,
  };
}