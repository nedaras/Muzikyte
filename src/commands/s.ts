import { Command } from "../types";

const command:Command = async function (_, message, songs) {

    const channel = message.member?.voice.channel

    channel && songs.skip(channel)

}

export default command