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
        const acceptExt = /\.(webm|mp4)$/i

        if (!link) {
            const attachment = message.attachments.first()

            if (!attachment) return message.channel.send('Please provide an attachment!')
            if (!acceptExt.test(attachment.name!)) return message.channel.send('Only webm and mp4 allowed.')
            if (!name) name = attachment.name!.split('.')[0]!

            const extension = attachment!.name!.split('.').pop()
    
            await download(attachment.url, join(__dirname, '..', '..', '..', 'downloads', `${name.split(' ').join('_')}.${extension}`))
                .then(() => message.channel.send('Download success!'))
                .catch(err => {
                    console.log(err)
                    return message.channel.send(`Ei onnistu: ${err}`)
                })
        }

        if (!isURL(link)) return message.channel.send('Flag --link was used...\nSo provide a link mate!')
        if (!acceptExt.test(link)) return message.channel.send('Only webm and mp4 allowed.')
        if (!name) return message.channel.send('Please give a name for links mate!')

        const extension = link.split('.').filter(string => string === 'mp4' || string === 'webm')

        console.log(`Link: ${link},\nName: ${name}\nTest: ${acceptExt.test(link)},\nFile Extension: ${extension}`)

        await download(link, join(__dirname, '..', '..', '..', 'downloads', `${name}.${extension}`))
            .then(() => message.channel.send('Download success!'))
            .catch(err => {
                console.log(err)
                return message.channel.send(`Ei onnistu: ${err}`)
            })
    }
}