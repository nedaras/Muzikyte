import type { Command } from '../types'
import ytdl from 'ytdl-core'
import yts from 'yt-search'
const fetch = require('node-fetch')
import cheerio from 'cheerio'

// ! it kinda stops music when yt-searching a new song!
const command:Command = async function(args, message, songs) {
    
    if (args.length && message.guild?.id) {

        const channel = message.member?.voice.channel

        if (channel) {

            if (isValidURL(args[0])) {

                if (ytdl.validateURL(args[0])) { 

                    try {
                        
                        await ytdl.getInfo(args[0])
                        songs.play(channel, args[0], message.guild.id)

                    } catch {
                        message.channel.send('Nerastas vidosas')

                    }
                    return

                }

                const video = await getVideo(args[0])

                if (video) return songs.play(channel, video.url, message.guild.id)
                return message.channel.send('Per cia nemoku muzikos paleisti')

            }
            
            const video = (await yts(args.join(' '))).all[0]
            if (video) return songs.play(channel, video.url, message.guild.id)
            return message.channel.send('Nerastas vidosas')

        }
        message.channel.send('Turi buti kanale')

    }

}

async function getVideo(url: string) {

    if (url.includes('spotify')) {

        try {

            const request = await fetch(url)
            const html = await request.text()
    
            const $ = cheerio.load(html)
            const title = $('meta[property="og:title"]').attr('content')

            if (title) {

                const video = (await yts(title)).all[0]
                if (video) return video

            }

        } catch {}

    }
    return null

}

function isValidURL(url: string) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(url)

}

export default command