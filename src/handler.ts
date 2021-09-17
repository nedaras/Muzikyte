import type { Message } from 'discord.js'
import type { Command, Songs } from './types'
import type { VoiceConnection, VoiceChannel, VoiceState } from 'discord.js'
import fs from 'fs'
import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'

interface Commands {
    [key: string]: Command

}

const commands: Commands = {}
fs.readdirSync(__dirname + '/commands').forEach(async (file) => commands[file.replace(/\.../, '')] = require('./commands/' + file).default)

let songs: string[] = []
let connection: VoiceConnection | null = null

// TODO: make it multi server
const _songs: Songs = {
    play: (channel, title) => {

        !songs.length && playSong(channel, title)
        songs.push(title)

    },
    skip: (channel) => {

        songs.shift()
        playSong(channel, songs[0])

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


export function commandHandler(message: Message) {

    if (!message.author.bot) {

        let args = message.content.split(' ')
        let command = args[0].toLocaleLowerCase()

        args.shift()

        if (command[0] == '!') {
            command = command.substring(1)
    
            if (commands[command.toLowerCase()]) {

                try {

                    commands[command.toLowerCase()](args, message, _songs)

                } catch {
                    message.channel.send('Kazkas sprogo programoje!')
            
                }

            }

        }


    }

}

export function channelHandler(user: VoiceState) {

    if (user.id === '888066132014149693' && user.channel === null) {
        songs = []
        connection = null
        

    }

}

function isValidURL(url: string) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(url)

}

async function getVideo(query: string) {
    const video = await ytSearch(query)
    return video.videos.length > 1 ? video.videos[0] : null
    
}