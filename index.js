const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const token = process.env.BOT_TOKEN;
const app = express();

const port = process.env.PORT || 3000;
const url = process.env.RENDER_EXTERNAL_URL;

const bot = new TelegramBot(token);
bot.setWebHook(`${url}/bot${token}`);

app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const botsList = [
  {
    name: '⭐ Первый бот',
    description: 'Бот с заданиями',
    url: 'https://t.me/duckearnbot?start=ref_7837011810'
  },
  {
    name: '⭐ Другий бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/petiti_bot?start=ref_7837011810'
  },
  {
    name: '⭐ Третий бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/Sigma_robot?start=7837011810'
  },
  {
    name: '⭐ Четвертый бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/WexGiftRobot?start=7837011810'
  },
  {
    name: '⭐ Пятый бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/LovStarsrobot?start=7837011810'
  },
  {
    name: '⭐ Шестой бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/Starpluss_bot?start=407510'
  },
  {
    name: '⭐ Седьмой бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/starsagift_bot?start=rQ8OqvZs7Dxwhz'
  }
];

async function sendProofs(chatId) {
  await bot.sendMessage(chatId, '📸 Пруфы вывода:');

  await bot.sendPhoto(chatId, path.join(__dirname, 'IMG_3967.png'), {
    caption: 'Пруф 1'
  });

  await bot.sendPhoto(chatId, path.join(__dirname, 'IMG_3966.png'), {
    caption: 'Пруф 2'
  });

  await bot.sendPhoto(chatId, path.join(__dirname, 'IMG_3965.png'), {
    caption: 'Пруф 3'
  });
}

bot.onText(/\/start/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    'Привет! Я каталог ботов.\n\nНажми нужную кнопку ниже:',
    {
      reply_markup: {
        keyboard: [
          ['📋 Список ботов'],
          ['📸 Пруфы']
        ],
        resize_keyboard: true
      }
    }
  );
});

bot.onText(/\/bots/, async (msg) => {
  await bot.sendMessage(msg.chat.id, 'Список ботов:', {
    reply_markup: {
      inline_keyboard: botsList.map((item) => [
        { text: item.name, url: item.url }
      ])
    }
  });
});

bot.onText(/\/proofs/, async (msg) => {
  await sendProofs(msg.chat.id);
});

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (!text) return;
  if (text.startsWith('/')) return;

  if (text === '📋 Список ботов') {
    await bot.sendMessage(chatId, 'Список ботов:', {
      reply_markup: {
        inline_keyboard: botsList.map((item) => [
          { text: item.name, url: item.url }
        ])
      }
    });
    return;
  }

  if (text === '📸 Пруфы') {
    await sendProofs(chatId);
    return;
  }
});

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
