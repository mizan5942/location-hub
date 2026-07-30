require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

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

function buildPrompt(code, info) {
  const openings = [
    'Start by describing the geography or landscape.',
    'Start with what the country is best known for globally.',
    'Start with a bit of its history or how it came to be as it is today.',
    'Start with something about its culture, people, or daily life.',
    'Start with what makes the country distinct from its neighbors.',
  ];
  const randomOpening = openings[Math.floor(Math.random() * openings.length)];

  return `Write 2-3 short paragraphs (180-220 words total) introducing ${info.name} to someone curious about the country.

${randomOpening}

Cover what the country is known for, a sense of its people or culture, and one or two genuinely interesting or useful facts.

The capital is ${info.capital}. Mention the capital naturally somewhere in the text.

Writing rules:
- Write like a knowledgeable person explaining this to a friend, not like marketing copy.
- Do not use em dashes or en dashes (no — or –). Use commas or separate sentences instead.
- Avoid buzzwords and cliches such as "nestled", "vibrant", "bustling", "hidden gem", "melting pot", "rich history", "must visit", "breathtaking", "striking contrasts", "whirlwind", "no shortage of", "boasts", "offers a unique blend", "stands as a testament to".
- Do not use these exact recurring phrases: "If you are planning on visiting", "things to know about", "travel guide", "when planning a trip". Vary your sentence structure and transitions naturally.
- Use plain, specific, concrete language. Prefer real details over vague praise.
- Do not use markdown formatting, headers, or bullet points. Just flowing paragraphs separated by a blank line.`;
}

async function main() {
  const outputPath = path.join(__dirname, '../data/countryIntros.json');
  const existing = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf-8')) : {};

  for (const [code, info] of Object.entries(countryData)) {
    if (existing[code]) {
      console.log(`Skipping ${info.name} (already generated)`);
      continue;
    }

    console.log(`Generating intro for ${info.name}...`);
    try {
      const text = await generateIntro(buildPrompt(code, info));
      existing[code] = text.trim();
      fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2));
      console.log('  Done.');
    } catch (err) {
      console.error(`  Failed for ${info.name}:`, err.message);
    }

    await new Promise((r) => setTimeout(r, 4000));
  }

  console.log('All done!');
}

main();