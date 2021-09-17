import { Client } from 'discord.js'
import { token } from './token.json'
import { commandHandler, channelHandler } from './handler'
// TODO: padaryti kad butu local kanalas
// TODO: multi server support
const bot = new Client()

bot.on('ready', () => bot.user?.setActivity('Muzika kala kaip tavo mama!', { type: 'LISTENING' }))
bot.on('message', commandHandler)
bot.on('voiceStateUpdate', (_, user) => channelHandler(user))

bot.login(token)