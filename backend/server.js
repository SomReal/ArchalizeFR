console.log("Archalize BACKEND STARTED, FILE ACTIVE")
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://www.archalize.com', 'http://localhost:3000'],
  methods: ['POST'],
  credentials: true,
}));

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Image critique route
app.post('/api/critique', upload.single('image'), async (req, res) => {
  try {
    const base64Image = req.file.buffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Critique this building in terms of architectural style, sustainability, and improvements.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ],
        },
      ],
      max_tokens: 1000,
    });

    res.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: null });
  }
});

// Follow-up chat route
app.post('/api/followup', async (req, res) => {
  try {
    const { critique, question } = req.body;

    if (!critique || !question) {
      return res.status(400).json({ error: 'Missing critique or question' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert architecture AI assistant. Be concise, clear, and helpful.' },
        { role: 'user', content: `Here was the original critique:\n${critique}` },
        { role: 'user', content: `Follow-up question: ${question}` }
      ],
      max_tokens: 500,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Follow-up error:', error);
    res.status(500).json({ reply: 'Error generating follow-up response.' });
  }
  console.log("✅ /api/followup was hit");

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
