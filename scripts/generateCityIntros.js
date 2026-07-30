require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const cities = require('../data/cities.js').default || require('../data/cities.js');
const countryData = require('../data/countryData.js').default || require('../data/countryData.js');

async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  if (!response.ok) throw new Error(`Gemini failed: ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned no text');
  return text;
}

async function callGroq(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(`Groq failed: ${response.status}`);
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq returned no text');
  return text;
}

async function generateIntro(prompt) {
  try {
    return await callGemini(prompt);
  } catch (err) {
    console.log('  Gemini failed, trying Groq:', err.message);
    return await callGroq(prompt);
  }
}

function buildPrompt(city) {
  const countryName = countryData[city.countryCode]?.name || '';
  const openings = [
    'Start by describing the setting or geography.',
    'Start with what the city is best known for.',
    'Start with a specific scene or sensory detail that captures the city.',
    'Start with a bit of the city\'s history or how it developed.',
    'Start with what makes the city feel different from other places nearby.',
  ];
  const randomOpening = openings[Math.floor(Math.random() * openings.length)];

  return `Write 2-3 short paragraphs (180-220 words total) introducing ${city.name} to a traveler or curious reader.

${randomOpening}

Cover what the city is known for, its character and atmosphere, and one or two practical or interesting facts a visitor would find useful.

Naturally mention the name of the country ${city.name} is in at least once, written exactly as "${countryName}". Also naturally include a few terms someone might actually search for related to visiting or learning about the city, worked into normal sentences rather than forced.

Writing rules:
- Write like a knowledgeable person explaining this to a friend, not like marketing copy.
- Do not use em dashes or en dashes (no — or –). Use commas or separate sentences instead.
- Avoid buzzwords and cliches such as "nestled", "vibrant", "bustling", "hidden gem", "melting pot", "rich history", "must visit", "breathtaking", "striking contrasts", "whirlwind", "assault and delight", "no shortage of".
- Avoid generic AI-sounding phrasing like "boasts", "offers a unique blend", "stands as a testament to", "in conclusion", "whether you're...or...".
- IMPORTANT: Do not use these exact recurring phrases: "If you are planning on visiting", "things to know about", "travel guide", "when planning a trip". Vary your sentence structure and transitions naturally instead of relying on template phrases.
- Use plain, specific, concrete language. Prefer real details over vague praise.
- Do not use markdown formatting, headers, or bullet points. Just flowing paragraphs separated by a blank line.`;
}

async function main() {
  const outputPath = path.join(__dirname, '../data/cityIntros.json');
  const existing = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf-8')) : {};

  for (const city of cities) {
    if (existing[city.slug]) {
      console.log(`Skipping ${city.name} (already generated)`);
      continue;
    }

    console.log(`Generating intro for ${city.name}...`);
    try {
      const text = await generateIntro(buildPrompt(city));
      existing[city.slug] = text.trim();
      fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2));
      console.log('  Done.');
    } catch (err) {
      console.error(`  Failed for ${city.name}:`, err.message);
    }

    await new Promise((r) => setTimeout(r, 4000));
  }

  console.log('All done!');
}

main();