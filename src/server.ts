import Discord, { Message } from 'discord.js';
import 'dotenv/config';
import { CommandHandler } from './command_handler';
import { BotConfig, config } from './config/config';
import { keepAlive } from './keepAlive';

/** Pre-startup validation of the bot config. */
function validateConfig(botConf: BotConfig) {
  if (!botConf.token) {
    throw new Error('You need to specify your Discord bot token!');
  }
}

try {
  validateConfig(config);

  const commandHandler = new CommandHandler(config.prefix);

  const client = new Discord.Client();

  client.on('ready', () => {
    console.log('Bot has started');
    keepAlive();
  });

  client.on('message', (message: Message) => {
    console.log('🚀 > Someone sent a message!');
    commandHandler.handleMessage(message);
  });

  client.on('error', (e) => {
    console.error('Discord client error!', e);
  });

  client.login(config.token);
} catch (err) {
  console.error(err);
}
