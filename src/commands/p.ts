import type { Command } from '../types'
import ytdl from 'ytdl-core'
import yts from 'yt-search'

const command:Command = async function(args, message, songs) {
    
    if (args.length && message.guild?.id) {

        const channel = message.member?.voice.channel

        if (channel) {

            if (isValidURL(args[0])) {

                if (ytdl.validateURL(args[0])) { 

                    try {
                        
                        await ytdl.getInfo(args[0])
                        songs.play(channel, args[0], message.guild.id)

                    } catch {
                        message.channel.send('Nerastas vidosas')

                    }
                    return

                }
                return message.channel.send('Per cia nemoku muzikos paleisti')

            }
            
            const video = (await yts(args.join(' '))).all[0]
            if (video) return songs.play(channel, video.url, message.guild.id)
            return message.channel.send('Nerastas vidosas')

        }
        message.channel.send('Turi buti kanale')

    }

}

function isValidURL(url: string) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(url)

}

export default command