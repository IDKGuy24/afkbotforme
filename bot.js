const mineflayer = require('mineflayer');
const config = require('./config.json');

function startBot() {
  const bot = mineflayer.createBot({
    host: config.serverHost,
    port: config.serverPort,
    username: config.botUsername,
    auth: 'offline',
    version: false // allow auto-detect (needed for 1.21.10)
  });

  bot.once('spawn', () => {
    console.log(`✅ ${config.botUsername} joined the server!`);
    
    bot.setControlState('sneak', true);
    bot.setControlState('forward', true);

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 5000);
  });

  bot.on('end', () => {
    console.log("❌ Bot disconnected. Reconnecting in 5 seconds...");
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.log("⚠️ Error:", err);
  });
}

startBot();
