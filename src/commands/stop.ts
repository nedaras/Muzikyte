import { Command } from "../types";

const command:Command = async function (_, message, songs) {
    songs.stop()
    
}

export default command