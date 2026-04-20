const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

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
    name: '⭐ Другой бот',
    description: 'Бот со звёздами',
    url: 'https://t.me/petiti_bot?start=ref_7837011810'
  },
  {
    name: '⭐ Третий бот',
    description: 'Сюда потом вставишь своё',
    url: 'https://t.me/your_bot_here'
  }
];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Привет! Я каталог ботов. Нажми /bots чтобы открыть список.'
  );
});

bot.onText(/\/bots/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Список ботов:', {
    reply_markup: {
      inline_keyboard: botsList.map((item) => [
        { text: item.name, url: item.url }
      ])
    }
  });
});

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
