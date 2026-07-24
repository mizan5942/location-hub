import cities from '../../data/cities';

export default function CityPage({ cityInfo, weather, currency, airQuality, country, attractions, emergency }) {
  return (
    <div>
      <h1>{cityInfo.name}</h1>

      <h3>Weather</h3>
      <p>Temperature: {weather ? `${weather.current.temperature_2m}°C` : 'Unavailable'}</p>
      <p>Feels Like: {weather ? `${weather.current.apparent_temperature}°C` : 'Unavailable'}</p>
      <p>Humidity: {weather ? `${weather.current.relative_humidity_2m}%` : 'Unavailable'}</p>
      <p>Wind Speed: {weather ? `${weather.current.wind_speed_10m} km/h` : 'Unavailable'}</p>
      <p>Precipitation: {weather ? `${weather.current.precipitation} mm` : 'Unavailable'}</p>
      <p>UV Index: {weather ? weather.current.uv_index : 'Unavailable'}</p>
      <p>Local Time: {weather ? weather.current.time : 'Unavailable'} ({weather ? weather.timezone : ''})</p>
      <p>Sunrise: {weather ? weather.daily.sunrise[0] : 'Unavailable'}</p>
      <p>Sunset: {weather ? weather.daily.sunset[0] : 'Unavailable'}</p>

      <h3>Air Quality</h3>
      <p>PM2.5: {airQuality ? airQuality.current.pm2_5 : 'Unavailable'}</p>
      <p>PM10: {airQuality ? airQuality.current.pm10 : 'Unavailable'}</p>
      <p>Ozone: {airQuality ? airQuality.current.ozone : 'Unavailable'}</p>
      <p>Carbon Monoxide: {airQuality ? airQuality.current.carbon_monoxide : 'Unavailable'}</p>

      <h3>Currency</h3>
      <p>1 USD = {currency ? currency.rates[country?.currencies?.[0]?.code] : 'Unavailable'} {country?.currencies?.[0]?.code}</p>
      <p>1 USD = {currency ? currency.rates.EUR : 'Unavailable'} EUR</p>
      <p>1 USD = {currency ? currency.rates.GBP : 'Unavailable'} GBP</p>

      <h3>Country Info</h3>
      <p>Capital: {country ? country.capital : 'Unavailable'}</p>
      <p>Region: {country ? country.region : 'Unavailable'}</p>
      <p>Population: {country ? country.population?.toLocaleString() : 'Unavailable'}</p>
      <p>Area: {country ? `${country.area?.toLocaleString()} km²` : 'Unavailable'}</p>
      <p>Languages: {country ? JSON.stringify(country.languages) : 'Unavailable'}</p>
      <p>Calling Code: {country ? country.callingCodes?.[0] : 'Unavailable'}</p>
      <p>Flag: {country ? country.flag : 'Unavailable'}</p>
      <p>Time Zone: {weather ? weather.timezone : 'Unavailable'}</p>
      <p>Subregion: {country ? country.subregion : 'Unavailable'}</p>
      <p>Neighboring Countries: {country ? country.borders?.join(', ') : 'Unavailable'}</p>
      <p>Currency Symbol: {country ? country.currencies?.[0]?.symbol : 'Unavailable'}</p>
      <p>Demonym: {country ? country.demonym : 'Unavailable'}</p>

      <h3>Emergency Numbers</h3>
      <p>Police: {emergency ? emergency.data.police.all[0] : 'Unavailable'}</p>
      <p>Ambulance: {emergency ? emergency.data.ambulance.all[0] : 'Unavailable'}</p>
      <p>Fire: {emergency ? emergency.data.fire.all[0] : 'Unavailable'}</p>

      <h3>Nearby Points of Interest</h3>
      <ul>
        {attractions?.query?.geosearch?.map((place) => (
          <li key={place.pageid}>{place.title}</li>
        ))}
      </ul>
    </div>
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

  const currency = await safeFetch(
    'https://open.er-api.com/v6/latest/USD'
  );

  const airQuality = await safeFetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${cityInfo.latitude}&longitude=${cityInfo.longitude}&current=pm2_5,pm10,ozone,carbon_monoxide`
  );

  const country = await safeFetch(
    `https://countries.dev/alpha/${cityInfo.countryCode}`
  );

  const attractions = await safeFetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${cityInfo.latitude}|${cityInfo.longitude}&gsradius=10000&gslimit=5&format=json&origin=*`
  );

  const emergency = await safeFetch(
    `https://emergencynumberapi.com/api/country/${cityInfo.countryCode}`
  );

  return {
    props: { cityInfo, weather, currency, airQuality, country, attractions, emergency },
    revalidate: 43200,
  };
}