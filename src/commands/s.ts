import { Command } from "../types";

const command:Command = async function (_, message, songs) {
    songs.skip()

}

export default command