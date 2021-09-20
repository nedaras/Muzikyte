import { Command } from "../types";

const command:Command = async function (_, message, songs) {
    message.guild?.id && songs.skip(message.guild.id)

}

export default command