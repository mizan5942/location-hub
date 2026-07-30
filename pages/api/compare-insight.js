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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cityA, cityB } = req.body;
  if (!cityA || !cityB) {
    return res.status(400).json({ error: 'Missing cityA or cityB' });
  }

  const prompt = `Write a short, useful 60-90 word comparison of ${cityA} and ${cityB} for someone deciding between them or just curious. Focus on genuine differences in atmosphere, cost of living, climate, or daily life, not generic praise. Do not use em dashes or en dashes. Avoid buzzwords like "vibrant" or "bustling". Plain, specific, human sounding sentences. No markdown formatting.`;

  try {
    const text = await callGemini(prompt);
    return res.status(200).json({ insight: text, provider: 'gemini' });
  } catch (geminiErr) {
    try {
      const text = await callGroq(prompt);
      return res.status(200).json({ insight: text, provider: 'groq' });
    } catch (groqErr) {
      return res.status(502).json({ error: 'Both providers failed' });
    }
  }
}