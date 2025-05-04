const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://www.archalize.com', // allow frontend hosted on Vercel
  methods: ['POST'],
  credentials: true,
}));

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
