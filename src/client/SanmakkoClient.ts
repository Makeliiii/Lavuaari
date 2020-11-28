import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { join } from 'path'

interface SanmakkoOptions {
    ownerID?: string
    token?: string
}

export default class SanmakkoClient extends AkairoClient {
    public constructor(config: SanmakkoOptions) {
        super({ ownerID: config.ownerID })
        this.token = config.token!
    }

    public commandHandler = new CommandHandler(this, {
        prefix: ['!!'],
        directory: join(__dirname, '..', 'commands'),
        defaultCooldown: 1000 
    })

    public listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'listeners') })

    private _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
    }

    public start() {
        this._init()
        return this.login(this.token!)
    }
}