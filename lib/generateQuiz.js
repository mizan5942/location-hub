import cities from '../data/cities';
import countryExtras from '../data/countryExtras';
import countryData from '../data/countryData';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandom(array, count, exclude) {
  const pool = array.filter((item) => item !== exclude);
  return shuffle(pool).slice(0, count);
}

function buildOptions(correctAnswer, wrongPool) {
  const wrongAnswers = pickRandom(wrongPool, 3, correctAnswer);
  return shuffle([correctAnswer, ...wrongAnswers]);
}

const questionTypes = [
  {
    build: (city, allCities) => {
      const country = countryData[city.countryCode];
      if (!country) return null;
      const wrongPool = allCities
        .map((c) => countryData[c.countryCode]?.name)
        .filter(Boolean);
      return {
        question: `Which country is ${city.name} in?`,
        options: buildOptions(country.name, wrongPool),
        correctAnswer: country.name,
      };
    },
  },
  {
    build: (city, allCities) => {
      const extras = countryExtras[city.countryCode];
      if (!extras?.airport) return null;
      const wrongPool = allCities
        .map((c) => countryExtras[c.countryCode]?.airport)
        .filter(Boolean);
      return {
        question: `What's the nearest major airport to ${city.name}?`,
        options: buildOptions(extras.airport, wrongPool),
        correctAnswer: extras.airport,
      };
    },
  },
  {
    build: (city, allCities) => {
      const country = countryData[city.countryCode];
      if (!country?.capital) return null;
      const wrongPool = allCities
        .map((c) => countryData[c.countryCode]?.capital)
        .filter(Boolean);
      return {
        question: `What is the capital of the country ${city.name} is in?`,
        options: buildOptions(country.capital, wrongPool),
        correctAnswer: country.capital,
      };
    },
  },
  {
    build: (city, allCities) => {
      const country = countryData[city.countryCode];
      if (!country?.currency) return null;
      const wrongPool = allCities
        .map((c) => countryData[c.countryCode]?.currency)
        .filter(Boolean);
      return {
        question: `What currency is used in ${city.name}'s country?`,
        options: buildOptions(country.currency, wrongPool),
        correctAnswer: country.currency,
      };
    },
  },
];

export function generateQuiz(mode, value, count = 10) {
  let candidateCities;

  if (mode === 'continent') {
    candidateCities = cities.filter((c) => c.continent === value);
  } else {
    candidateCities = cities.filter((c) => c.countryCode === value);
  }

  const wrongAnswerPool = mode === 'continent' ? candidateCities : cities;

  if (mode === 'country') {
    const city = candidateCities[0];
    if (!city) return [];
    const questions = questionTypes
      .map((type) => type.build(city, wrongAnswerPool))
      .filter(Boolean);
    return shuffle(questions);
  }

  const selectedCities = shuffle(candidateCities).slice(0, count);
  const questions = selectedCities
    .map((city) => {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      return type.build(city, wrongAnswerPool);
    })
    .filter(Boolean);

  return questions;
}