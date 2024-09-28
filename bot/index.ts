const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

//Bot access token
const TOKEN = "7753299281:AAHf_0JWrCpPzwaZ6dRgFxzFBoXp3rNxiNI";

const bot = new TelegramBot(TOKEN, { polling: true });

const webAppUrl = "https://www.devbasit.xyz/";
const twitterUrl = "https://x.com/Basit_js";
const telegramUrl = "https://t.me/CodeBender";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Visit Portfolio Website", // Web app button
            web_app: { url: webAppUrl },
          },
        ],
        [
          {
            text: "🐦 Twitter Profile", // Twitter button
            url: twitterUrl,
          },
        ],
        [
          {
            text: "🌐 Telegram Profile", // Telegram button
            url: telegramUrl,
          },
        ],
      ],
    },
  };

  // Send the message with the button to open the web app
  bot.sendMessage(
    chatId,
    `Hi ${msg.from.first_name || "mate"}👋, Click the buttons below to visit:`,
    opts
  );
});

// Handle all other messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // If the user sends a message other than /start
  if (msg.text !== "/start") {
    bot.sendMessage(chatId, "Send /start to see the web app button.");
  }
});
