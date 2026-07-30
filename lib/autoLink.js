import countryData from '../data/countryData';
import cities from '../data/cities';

export function autoLinkText(text, options = {}) {
  const { excludeCityCode, excludeCountryCode } = options;

  let segments = [{ text, linked: false }];

  const countryEntries = Object.entries(countryData)
    .filter(([code]) => code !== excludeCountryCode)
    .map(([code, data]) => ({ name: data.name, href: `/country/${code}` }));

  const cityEntries = cities
    .filter((c) => c.slug !== excludeCityCode)
    .map((c) => ({ name: c.name, href: `/location/${c.slug}` }));

  const allTerms = [...countryEntries, ...cityEntries]
    .filter((t) => t.name && t.name.length > 2)
    .sort((a, b) => b.name.length - a.name.length);

  for (const term of allTerms) {
    const newSegments = [];
    for (const segment of segments) {
      if (segment.linked) {
        newSegments.push(segment);
        continue;
      }
      const parts = segment.text.split(new RegExp(`\\b(${term.name})\\b`, 'g'));
      if (parts.length === 1) {
        newSegments.push(segment);
        continue;
      }
      parts.forEach((part) => {
        if (part === term.name) {
          newSegments.push({ text: part, linked: true, href: term.href });
        } else if (part) {
          newSegments.push({ text: part, linked: false });
        }
      });
    }
    segments = newSegments;
  }

  return segments;
}