import type { Message } from 'discord.js'
import type { Command } from './types'
import type { VoiceState } from 'discord.js'
import fs from 'fs'
import songs from './songs'

interface Commands {
    [key: string]: Command

}

const commands: Commands = {}
fs.readdirSync(__dirname + '/commands').forEach(async (file) => commands[file.replace(/\.../, '')] = require('./commands/' + file).default)

export function commandHandler(message: Message) {
    
    if (!message.author.bot) {    

        let args = message.content.split(' ')
        let command = args[0].toLocaleLowerCase()

        args.shift()

        if (command[0] == '-') {
            command = command.substring(1)
    
            if (commands[command.toLowerCase()]) {

                try {

                    commands[command.toLowerCase()](args, message, songs)

                } catch {
                    message.channel.send('Kazkas sprogo programoje!')
            
                }

            }

        }


    }

}
// 888066132014149693
export function channelHandler(user: VoiceState) {
    user.id === '888479235663077416' && user.channel === null && songs.clear(user.guild.id)

}
