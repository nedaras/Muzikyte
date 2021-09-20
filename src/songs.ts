import type { Songs } from './types'
import type { VoiceConnection, VoiceChannel } from 'discord.js'
import ytdl from 'ytdl-core'

const servers = new Map<string, Server>()

class Server {

    public songs: string[]
    private connection: VoiceConnection | null = null

    constructor(url: string, private channel: VoiceChannel) {
        this.songs = [ url ]
        this.play()

    }

    play = async () => {

        if (!this.songs[0]) return this.channel.leave()

        const stream = ytdl(this.songs[0], { filter: 'audioonly' } )

        !this.connection && (this.connection = await this.channel.join())

        this.connection.play(stream, { seek: 0, volume: 1 }).on('finish', this.skip)

    }

    skip = () => {
        
        this.songs.shift()
        this.play()

    }

    stop = () => this.channel.leave()

}

const songs: Songs = {

    play: (channel, url, id) => {

        const server = servers.get(id)
        server ? server.songs.push(url) : servers.set(id, new Server(url, channel))

        console.log(servers);
        

    },

    skip: (id: string) => {

        const server = servers.get(id)
        server && server.skip()

    },

    stop: (id: string) => {

        const server = servers.get(id)
        server && server.stop()

    },

    clear: (id: string) => servers.delete(id)

}

export default songs