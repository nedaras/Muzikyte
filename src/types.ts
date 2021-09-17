import type { Message as DiscordMessage, VoiceChannel } from 'discord.js';

type errors = 'NOTFOUND' | 'NOTSUPPORTED'
export interface Songs {
    play: (channel: VoiceChannel, title: string, onError: (type: errors) => void) => void
    skip: (channel: VoiceChannel) => void
    clear: () => void

}

export type Command = (args: string[], message: DiscordMessage, songs: Songs) => void