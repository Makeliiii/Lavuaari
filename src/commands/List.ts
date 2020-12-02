import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { join } from 'path'
import fs from 'fs'

export default class ListCommand extends Command {
    public constructor() {
        super('list', {
            aliases: ['list'],
            description: 'List all the memes the bot has downloaded',
            category: 'Memes',
            ratelimit: 1
        })
    }

    public exec(message: Message) {
        const folder = join(__dirname, '..', '..', 'downloads')
        const files = fs.readdirSync(folder)
        const embed = new MessageEmbed()
            .setTitle('Files')
            .addField(
                '\u200B',
                files.map(file => {
                    const noExtFile = file.split('.')[0]
                    return noExtFile
                })
            )

        return message.channel.send(embed)
    }
}