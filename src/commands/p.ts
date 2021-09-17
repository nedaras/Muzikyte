import type { Command } from '../types'

const command:Command = async function(args, message, songs) {
    
    if (args.length) {

        const channel = message.member?.voice.channel

        if (channel) {
                
            songs.play(channel, args.join(''), (error) => message.channel.send(error === 'NOTFOUND' ? 'Pyzda seniuk tokios dainos nera' : 'Nu zinok per cia nemoku muzikos paleisti'))
            return
    
        }
        message.channel.send('Turi buti kanale')

    }

}

export default command