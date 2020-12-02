import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { join } from 'path'
import { download } from '../../util/download'
import isURL from 'is-url'

export default class DownloadCommand extends Command {
    public constructor() {
        super('download', {
            aliases: ['download', 'dl', 'downloadattachment', 'dlattachment', 'downloadlink', 'dllink'],
            description: 'Upload an attachment to the bot.',
            category: 'Memes',
            ratelimit: 1,
            args: [
                {
                    id: 'link',
                    match: 'option',
                    flag: ['--link', '-l']
                },
                {
                    id: 'name',
                    match: 'rest'
                }
            ]
        })
    }

    public async exec(message: Message, { link, name }: { link: string, name: string }) {
        // accept only these extensions... perhaps more in the future
        const acceptExt = /\.(webm|mp4)$/i

        // if link argument is falsy; not provided
        if (!link) {
            const attachment = message.attachments.first()

            // check for some input errors and mutate name
            // dunno if mutating name is a good idea lul
            if (!attachment) return message.channel.send('Please provide an attachment!')
            if (!acceptExt.test(attachment.name!)) return message.channel.send('Only webm and mp4 allowed.')
            if (!name) name = attachment.name!.split('.')[0]!

            // get the file extension
            const extension = attachment!.name!.split('.').pop()
    
            // download file from the attachment url
            await download(attachment.url, join(__dirname, '..', '..', '..', 'downloads', `${name.split(' ').join('_')}.${extension}`))
                .then(() => message.channel.send('Download success!'))
                .catch(err => {
                    console.log(err)
                    return message.channel.send(`Ei onnistu: ${err}`)
                })
        }

        // again check for some input errors and mutate name
        if (!isURL(link)) return message.channel.send('Flag --link was used...\nSo provide a link mate!')
        if (!acceptExt.test(link)) return message.channel.send('Only webm and mp4 allowed.')
        if (!name) return message.channel.send('Please give a name for links mate!')

        // get the file extension
        const extension = link.split('.').filter(string => string === 'mp4' || string === 'webm')

        console.log(`Link: ${link},\nName: ${name}\nTest: ${acceptExt.test(link)},\nFile Extension: ${extension}`)

        // download file from link
        await download(link, join(__dirname, '..', '..', '..', 'downloads', `${name}.${extension}`))
            .then(() => message.channel.send('Download success!'))
            .catch(err => {
                console.log(err)
                return message.channel.send(`Ei onnistu: ${err}`)
            })
    }
}