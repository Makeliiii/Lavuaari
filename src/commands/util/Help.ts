import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class HelpCommand extends Command {
    public constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: 'The infamous hel command',
            category: 'Util',
            ratelimit: 1,
            args: [
                {
                    id: 'command',
                    match: 'content'
                }
            ]
        })
    }

    public async exec(message: Message, { command }: { command: Command }) {
        if (!command) {
            const categories = this.handler.categories
            for (const category of categories.values()) {
                console.log(category)
            }
        }
    }
}