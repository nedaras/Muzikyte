import { Command } from "../types";

const command:Command = async function (_, message, songs) {
    message.guild?.id && songs.stop(message.guild.id)
    
}

export default command