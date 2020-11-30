import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { join } from 'path'
import { download } from '../../util/download'

export default class UploadCommand extends Command {
    public constructor() {
        super('upload', {
            aliases: ['upload', 'ul', 'uploadattachment', 'ulattachment'],
            description: 'Upload an attachment to the bot.',
            category: 'Memes',
            ratelimit: 1,
            args: [
                {
                    id: 'link',
                    match: 'flag',
                    flag: ['--link', '-l']
                },
                {
                    id: 'name',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }

    public async exec(message: Message, { link, name }: { link: boolean, name: string }) {
        if (!link) {
            const attachment = message.attachments.first()
            if (!attachment) return message.channel.send('Please provide an attachment!')

            const acceptExt = /\.(webm|mp4)$/i

            if (!acceptExt.test(attachment.name!)) return message.channel.send('Only webm and mp4 allowed.')
            if (!name) name = attachment.name!.split('.')[0]!

            const extension = attachment!.name!.split('.').pop()
    
            await download(attachment.url, join(__dirname, '..', '..', '..', 'uploads', `${name.split(' ').join('_')}.${extension}`))
                .then(() => message.channel.send('Upload success!'))
                .catch(err => {
                    return console.log(err)
                })
            console.log(name, attachment)
        }

        if (!name) return message.channel.send('Please provide a link to the content you want uploaded!')

        return console.log(name)
    }
}