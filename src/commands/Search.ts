import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { join } from 'path'
import fs from 'fs'

export default class SearchCommand extends Command {
    public constructor() {
        super('search', {
            aliases: ['search', 's'],
            description: 'Search files by filter or provide the flag --all to list all files.',
            category: 'Memes',
            ratelimit: 1,
            args: [
                {
                    id: 'all',
                    match: 'flag',
                    flag: ['--all', '-a']
                },
                {
                    id: 'filter',
                    match: 'content'
                }
            ]
        })
    }

    public exec(message: Message, { all, filter }: { all: boolean, filter: string }) {
        // get folder and initialize an embed
        const folder = join(__dirname, '..', '..', 'downloads')
        const embed = new MessageEmbed()

        // if all parameter is falsy
        if (!all) {
            // get files by filter
            filter = filter.split(' ').join('_')
            const files = fs.readdirSync(folder).filter(file => file.includes(filter))

            // return an error if no filter or files are found
            if (!filter) return message.channel.send('Please include a search parameter.')
            if (!files.length) return message.channel.send('No files found!')
            
            // add data to embed
            embed
                .setTitle('File(s)')
                .addField(
                    '\u200B',
                    files.map(file => {
                        const noExtFile = file.split('.')[0]
                        return noExtFile
                    })
                )
    
            return message.channel.send(embed)
        } else {
            // get all files in the folder
            const files = fs.readdirSync(folder)

            // in case no files are found
            if (!files.length) return message.channel.send('No files found!')
    
            // create embed
            embed
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
}