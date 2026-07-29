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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=20`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

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
  const entries = Object.entries(INDICATORS);
  const values = await Promise.all(
    entries.map(([key, code]) => fetchIndicator(countryCode, code))
  );

  const results = {};
  entries.forEach(([key], i) => {
    results[key] = values[i];
  });
  return results;
}