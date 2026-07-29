export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city, topic } = req.body;

  if (!city || !topic) {
    return res.status(400).json({ error: 'Missing city or topic' });
  }

  const prompt = `Write a short, engaging 100-150 word answer about "${topic}" in ${city}. Be specific and factual. Do not use markdown formatting, just plain text paragraphs.`;

  try {
    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  }
);

    if (!response.ok) {
  const errorBody = await response.text();
  console.error('Gemini API error:', response.status, errorBody);
  return res.status(502).json({ error: 'Gemini request failed', details: errorBody });
}
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(502).json({ error: 'No response from Gemini' });
    }

    return res.status(200).json({ answer: text });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}