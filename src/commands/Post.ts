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

    public async exec(message: Message, { name }: { name: string }) {
        if (!name) return message.channel.send('How about you provide a parameter so I can search for the file?!?!')

        const folder = join(__dirname, '..', '..', 'downloads')
        const filter = name.split(' ').join('_')
        const files = fs.readdirSync(folder).filter(file => file.includes(filter))
        let filePath

        if (!files.length) return message.channel.send('No files found!')
        if (files.length > 1) {
            const fileMap = files.map((file, index) => `**${index + 1}.** ${file.split('_').join(' ')}\n`).join('')
            let fileNumbers: number[] = []

            for (const file of files) {
                const num = files.indexOf(file)
                fileNumbers.push(num + 1)
            }

            const filter = (response: any) => {
                return fileNumbers.some(number => number.toString() === response.content.toString())
            }

            message.channel.send(`Found these files with given parameters:\n\n${fileMap}\n**Respond back with the corresponding number plox**`).then(async () => {
                    await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                        .then(collected => {
                            const index = parseInt(collected.first()!.content) - 1
                            const file = files[index]
                            console.log(files[index])
                            filePath = join(__dirname, '..', '..', 'downloads', file)
                            message.channel.send(`Posting ${file}`, { files: [filePath] })
                        })
                        .catch(collected => {
                            message.channel.send('Yea ok nevermind then...')
                        })
                })
        } else {
            filePath = join(__dirname, '..', '..', 'downloads', files[0])
            return message.channel.send(`Found ${name}:`, { files: [filePath] })
        }
    }
}