import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

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
        if (!attachment) return message.channel.send('Please provide an attachment!')
        if (attachment.name !== `webm`) return message.channel.send('Only asd allowed.')

        return console.log(name.split(' ').join('_'), message.attachments.first())
    }
}