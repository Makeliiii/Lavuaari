import { Listener } from 'discord-akairo'

export default class ReadyListener extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    public exec() {
        console.log(`I'm ready!!`)
    }
}