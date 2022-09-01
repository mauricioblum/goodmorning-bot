import { TextChannel } from 'discord.js';
import { CommandContext } from '../models/command_context';
import { getGoodMorning } from '../services/getGoodMorning';
import { Command } from './command';

export class GoodMorningCommand implements Command {
  commandNames = ['goodmorning', 'bonjour', 'moien'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}goodmorning to get a good morning.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    const goodMorning = await getGoodMorning();
    if (goodMorning) {
      const { guild } = parsedUserCommand.originalMessage;
      const messageChannel = parsedUserCommand.originalMessage
        .channel as TextChannel;
      const channels = guild?.channels.cache;
      if (channels) {
        const textChannel = channels.find(
          (channel) =>
            channel.type === 'text' && channel.name === messageChannel.name,
        ) as TextChannel;
        await textChannel?.send(`${goodMorning.flag} - ${goodMorning.phrase}`);
      }
    }
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
