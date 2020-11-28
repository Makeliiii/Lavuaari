import LavuaariClient from './client/LavuaariClient'
import { config } from 'dotenv'

config()
const client = new LavuaariClient({ ownerID: process.env.ownerID, token: process.env.TOKEN })
client.start()