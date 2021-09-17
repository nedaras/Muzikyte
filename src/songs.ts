import type { Songs } from './types'
import type { VoiceConnection, VoiceChannel } from 'discord.js'
import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'

let songs: string[] = []
let connection: VoiceConnection | null = null

// TODO: make it multi server
const _songs: Songs = {
    play: async (channel, title, onError) => {

        try {

            if (isValidURL(title) && !ytdl.validateURL(title)) { onError('NOTSUPPORTED'); return }

            isValidURL(title) && await ytdl.getInfo(title)
    
            !songs.length && playSong(channel, title)
            songs.push(title)

        } catch {
            onError('NOTFOUND')

        }

    },
    skip: (channel) => {

        songs.shift()
        playSong(channel, songs[0])

    },
    clear: () => {

        songs = []
        connection = null
        
    }

}

async function playSong(channel: VoiceChannel, url?: string) {
    if (!url) { 
        channel.leave()
        connection = null
        return 
    
    }

    async function play(url: string) {
        
        !connection && (connection = await channel.join())
        const stream = ytdl(url, { filter: 'audioonly' } )

        connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
    
            songs.shift()
            playSong(channel, songs[0])
    
        })

    }

    if (isValidURL(url)) {
        play(url)
        return

    }

    const video = await getVideo(url)
    video && play(video.url)

}

function isValidURL(url: string) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(url)

}

async function getVideo(query: string) {
    const video = await ytSearch(query)
    return video.videos.length > 1 ? video.videos[0] : null
    
}

export default _songs