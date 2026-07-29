async function callGemini(prompt) {
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
    throw new Error(`Gemini failed: ${response.status} ${errorBody}`);
  }

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

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq failed: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq returned no text');
  return text;
}

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
    const text = await callGemini(prompt);
    return res.status(200).json({ answer: text, provider: 'gemini' });
  } catch (geminiErr) {
    console.error('Gemini failed, trying Groq:', geminiErr.message);
    try {
      const text = await callGroq(prompt);
      return res.status(200).json({ answer: text, provider: 'groq' });
    } catch (groqErr) {
      console.error('Groq also failed:', groqErr.message);
      return res.status(502).json({ error: 'Both providers failed' });
    }
  }
}