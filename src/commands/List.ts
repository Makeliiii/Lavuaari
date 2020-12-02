import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { join } from 'path'
import fs from 'fs'

export default class ListCommand extends Command {
    public constructor() {
        super('list', {
            aliases: ['list', 'l'],
            description: 'List all the memes the bot has downloaded',
            category: 'Memes',
            ratelimit: 1
        })
    }

    public exec(message: Message) {
        const folder = join(__dirname, '..', '..', 'downloads')
        const files = fs.readdirSync(folder)

        if (!files.length) return message.channel.send('No files found!')

        const embed = new MessageEmbed()
            .setTitle('File(s)')
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