const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Bot access token
const TOKEN = "7747269901:AAGIXpydT9wMd8zCcPpxpBUSWG8LiubRd3Y";

const bot = new TelegramBot(TOKEN, { polling: true });

const webAppUrl = "https://red-tma.vercel.app/";
const telegramUrl = "https://t.me/redbirdsolana";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play Game 🎮🚀", // Web app button
            web_app: { url: webAppUrl },
          },
        ],

        [
          {
            text: "Join Community 🌐", // Telegram button
            url: telegramUrl,
          },
        ],
      ],
    },
  };

  // Send the message with the button to open the web app
  bot.sendMessage(
    chatId,
    `Hello ${
      msg.from.first_name || "mate"
    },\n\n🐤 Start collecting #REDBIRD and stack them up for epic airdrops and rewards✨`,
    opts
  );
});

// Handle all other messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // If the user sends a message other than /start
  if (msg.text !== "/start") {
    bot.sendMessage(chatId, "Send /start to interact.");
  }
});
