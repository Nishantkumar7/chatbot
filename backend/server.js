import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { Message } from './models/message.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAIResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return "Failed to connect. Try again later.";
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    await Message.create({
      text: message,
      sender: 'user',
    });

    const botResponse = await generateAIResponse(message);

    await Message.create({
      text: botResponse,
      sender: 'bot',
    });

    res.json({ response: botResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});