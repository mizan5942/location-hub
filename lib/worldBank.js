const INDICATORS = {
  population: 'SP.POP.TOTL',
  populationDensity: 'EN.POP.DNST',
  lifeExpectancy: 'SP.DYN.LE00.IN',
  birthRate: 'SP.DYN.CBRT.IN',
  deathRate: 'SP.DYN.CDRT.IN',
  agriculturalLand: 'AG.LND.AGRI.ZS',
  forestLand: 'AG.LND.FRST.ZS',
};

async function fetchIndicator(countryCode, indicatorCode) {
  try {
    const res = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=20`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const entries = json?.[1];
    if (!entries) return null;

    const latestValid = entries.find((entry) => entry.value !== null);
    return latestValid ? { value: latestValid.value, year: latestValid.date } : null;
  } catch (err) {
    return null;
  }
}

export async function fetchWorldBankData(countryCode) {
  const results = {};
  for (const [key, code] of Object.entries(INDICATORS)) {
    results[key] = await fetchIndicator(countryCode, code);
  }
  return results;
}