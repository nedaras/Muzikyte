import type { Command } from '../types'

const command:Command = async function(_, message, songs) {
    message.guild?.id && songs.loop(message.guild.id)
    

}

export default command