import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { join } from 'path'
import fs from 'fs'

export default class PostCommand extends Command {
    public constructor() {
        super('post', {
            aliases: ['post', 'p'],
            description: 'Get the bot to post a file for you.',
            category: 'Memes',
            ratelimit: 1,
            args: [
                {
                    id: 'name',
                    match: 'content'
                }
            ]
        })
    }

    public exec(message: Message, { name }: { name: string }) {
        if (!name) return message.channel.send('How about you provide a parameter so I can search for the file?!?!')

        const folder = join(__dirname, '..', '..', 'downloads')
        const filter = name.split(' ').join('_')
        const file = fs.readdirSync(folder).filter(file => file.includes(filter))

        if (!file.length) return message.channel.send('No files found!')

        const filePath = join(__dirname, '..', '..', 'downloads', file[0])

        return message.channel.send(`Searched with param ${name}`, {
            files: [
                filePath
            ]
        })
    }
}