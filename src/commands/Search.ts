import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { join } from 'path'
import fs from 'fs'

export default class SearchCommand extends Command {
    public constructor() {
        super('search', {
            aliases: ['search', 's'],
            description: 'Search files by filter.',
            category: 'Memes',
            ratelimit: 1,
            args: [
                {
                    id: 'filter',
                    match: 'content'
                }
            ]
        })
    }

    public exec(message: Message, { filter }: { filter: string }) {
        const folder = join(__dirname, '..', '..', 'downloads')
        const files = fs.readdirSync(folder).filter(file => file.includes(filter))

        if (!filter) return message.channel.send('Please include a search parameter.')
        if (!files.length) return message.channel.send('No files found!')

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