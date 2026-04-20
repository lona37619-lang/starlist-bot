const TelegramBot = require('node-telegram-bot-api');

const token = '8753362108:AAHWITBhujliEqy85IMb8rBqiGIvQUj0cEk';

const bot = new TelegramBot(token, { polling: true });

const botsList = [
  {
    name: 'DuckEarnBot',
    description: 'Бот с заданиями',
    url: 'https://t.me/duckearnbot?start=ref_7837011810'
  },
  {
    name: 'Skewkdkd',
    description: 'Бот со звёздами',
    url: 'https://t.me/skewkdkd?start=ref_7837011810'
  }
];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Привет! Я каталог ботов.\nНажми /bots чтобы открыть список.'
  );
});

bot.onText(/\/bots/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Список ботов:', {
    reply_markup: {
      inline_keyboard: botsList.map(botItem => [
        { text: botItem.name, url: botItem.url }
      ])
    }
  });
});

console.log('Бот запущен');
