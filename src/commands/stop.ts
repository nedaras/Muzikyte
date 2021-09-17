import { Command } from "../types";

const command:Command = async function (_, message, songs) {

    const channel = message.member?.voice.channel

    if (channel) {
        channel.leave()
        return

    }
    message.channel.send('Turi buti kanale')
    
}

export default command