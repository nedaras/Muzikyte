import type { Songs } from './types'
import type { VoiceConnection, VoiceChannel } from 'discord.js'
import ytdl from 'ytdl-core'

let songs: string[] = []
let connection: VoiceConnection | null = null
let channel: VoiceChannel | null = null

// TODO: make it multi server // do it nexti, mean when u read it, i mean now, just fucking do it u shit bag
const _songs: Songs = {
    play: async (_channel, title, onError) => {

        try {

            if (isValidURL(title)) {

                if (!ytdl.validateURL(title)) { onError('NOTSUPPORTED'); return }

                await ytdl.getInfo(title)
                
                channel = _channel
                !songs.length && playSong(title)
                songs.push(title)
                return

            }
            onError('NOTURL')

        } catch {
            onError('NOTFOUND')

        }

    },
    skip: () => {

        songs.shift()
        playSong(songs[0])

    },
    clear: () => {

        songs = []
        connection = null
        
    },
    stop: () => {
        channel && channel.leave()


    }

}

async function playSong(url?: string) {
    if (!url) { channel!.leave(); return }

    async function play(url: string) {
        
        !connection && (connection = await channel!.join())
        const stream = ytdl(url, { filter: 'audioonly' } )

        connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
    
            songs.shift()
            playSong(songs[0])
    
        })

    }

    play(url)


}

function isValidURL(url: string) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(url)

}

export default _songs