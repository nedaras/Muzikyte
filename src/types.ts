import type { Message as DiscordMessage, VoiceChannel } from 'discord.js';
export interface Songs {
    play: (channel: VoiceChannel, title: string, id: string) => void
    skip: (id: string) => void
    clear: (id: string) => void
    stop: (id: string) => void

}

export type Command = (args: string[], message: DiscordMessage, songs: Songs) => void