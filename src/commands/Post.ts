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
        // check for a name parameter
        if (!name) return message.channel.send('How about you provide a parameter so I can search for the file?!?!')

        // folder, filter for files, and the actual files. Also declare the file path
        const folder = join(__dirname, '..', '..', 'downloads')
        const filter = name.split(' ').join('_')
        const files = fs.readdirSync(folder).filter(file => file.includes(filter))
        let filePath

        // check if there are any files
        if (!files.length) return message.channel.send('No files found!')

        // if there are more than one file(s)
        if (files.length > 1) {
            // perform a map function on the files to post in chat. Also declare the fileNumbers array to help with the filter function
            const fileMap = files.map((file, index) => `**${index + 1}.** ${file.split('_').join(' ')}\n`).join('')
            let fileNumbers: number[] = []

            // populate fileNumbers
            for (const file of files) {
                const num = files.indexOf(file)
                fileNumbers.push(num + 1)
            }

            // filter function for .awaitMessages
            const filter = (response: any) => {
                return fileNumbers.some(number => number.toString() === response.content.toString())
            }

            // send reponse and await for user reply
            message.channel.send(`Found these files with given parameters:\n\n${fileMap}\n**Respond back with the corresponding number plox**`).then(async () => {
                    await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                        .then(collected => {
                            // get the user response as index and initialize a file variable. Also give filePath a value
                            const index = parseInt(collected.first()!.content) - 1
                            const file = files[index]
                            filePath = join(__dirname, '..', '..', 'downloads', file)
                            message.channel.send(`Posting ${file}`, { files: [filePath] })
                        })
                        .catch(collected => {
                            message.channel.send('Yea ok nevermind then...')
                        })
                })
        } else {
            // give filePath a value
            filePath = join(__dirname, '..', '..', 'downloads', files[0])
            return message.channel.send(`Found ${name}:`, { files: [filePath] })
        }
    }
}