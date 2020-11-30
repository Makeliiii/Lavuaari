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
                    id: 'name',
                    type: 'string',
                    match: 'content'
                }
            ]
        })
    }

    public async exec(message: Message, { name }: { name: string }) {
        const attachment = message.attachments.first()
        const extension = attachment!.name!.split('.').pop()
        const acceptExt = /\.(webm|mp4)$/i

        if (!attachment) return message.channel.send('Please provide an attachment!')
        if (!acceptExt.test(attachment.name!)) return message.channel.send('Only webm and mp4 allowed.')
        if (!name) name = attachment.name!.split('.')[0]!

        await download(attachment.url, join(__dirname, '..', '..', '..', 'uploads', `${name.split(' ').join('_')}.${extension}`))
            .then(() => message.channel.send('Upload success!'))
            .catch(err => {
                return console.log(err)
            })

        return console.log(name, message.attachments.first())
    }
}