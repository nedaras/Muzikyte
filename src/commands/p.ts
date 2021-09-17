import type { Command } from '../types'

const command:Command = async function(args, message, songs) {
    
    if (args.length) {

        const channel = message.member?.voice.channel

        if (channel) {
                
            songs.play(channel, args.join(''))
            return
    
        }
        message.channel.send('Turi buti kanale')

    }

}

export default command