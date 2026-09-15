import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rate limiting (simple in-memory)
const rateLimit = {};
function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimit[ip]) { rateLimit[ip] = []; }
  rateLimit[ip] = rateLimit[ip].filter(t => now - t < 60000);
  if (rateLimit[ip].length >= 5) return false;
  rateLimit[ip].push(now);
  return true;
}

// Sanitize input
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, 1000);
}

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const telegramMessage = `━━━━━━━━━━━━━━━━━━━━
📩 NEW PORTFOLIO MESSAGE
━━━━━━━━━━━━━━━━━━━━

👤 Name: ${sanitize(name)}
📧 Email: ${sanitize(email)}
📱 Phone: ${sanitize(phone || 'Not provided')}
📌 Subject: ${sanitize(subject)}
💬 Message: ${sanitize(message)}
🌐 Source: Portfolio Website

━━━━━━━━━━━━━━━━━━━━`;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
      }
    );

    if (!response.ok) {
      throw new Error('Telegram API error');
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
