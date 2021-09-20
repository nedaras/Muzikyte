import type { Command } from '../types'
import ytdl from 'ytdl-core'

const command:Command = async function(args, message, songs) {
    
    if (args.length) {

        const channel = message.member?.voice.channel
        
        if (channel){

            if (isValidURL(args[0])) { 

                if (ytdl.validateURL(args[0])) { 

                    try {
                        
                        await ytdl.getInfo(args[0])
                        return message.guild?.id && songs.play(channel, args[0], message.guild?.id)

                    } catch {
                        return message.channel.send('Nerastas vidosas')

                    }

                }
                return message.channel.send('Per cia nemoku muzikos paleisti')

            }
            return message.channel.send('Dabar tik URLs prijamam')

        }
        message.channel.send('Turi buti kanale')

    }

}

function isValidURL(url: string) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(url)

}

export default command